import YAML from "yaml";
import { toTitleCase } from "./util";
import { versions } from "../data/versions";
import { enchantment_targets } from "../data/targets";
import { enchantment_tags } from "../data/tags";
import { triggers } from "../data/triggers";
import {
  loadTrigger,
  loadValues,
} from "../data/trigger_conditions/loadTrigger";
import { enchanted_item_custom_locations } from "../data/enchanted_item_custom_locations";

export const defaultFormState = {
  minecraft_version: versions[0],
  enchantment_name: "",
  needs_permission: false,
  depends: [],
  supported: [],
  primary: [],
  tags: [],
  conflicts_with: [],
  anvil_cost: 10,
  in_enchanting_table: true,
  weight: 10,
  min_cost_base: 2,
  min_cost_incr: 10,
  max_cost_base: 8,
  max_cost_incr: 15,
  default_enchantment_location: true,
  custom_enchantment_locations: [],
  destroy_item_chance: 0,
  remove_enchantment_chance: 0,
  triggers: [],
};

export const defaultLevel = {
  cooldown: 5,
  chance: 100,
  cancel_event: false,
  cooldown_message: "",
  cleanup_commands: [],
  instructions: [],
};

export const jsonToYaml = (formState) => {
  const enchantment_name = formState.enchantment_name
    .toLowerCase()
    .replaceAll(" ", "_");
  const jsonEnchantment = {
    [enchantment_name]: {
      version: formState.minecraft_version,
      enabled: true,
      depends: formState.depends.map((value) => value.name),
      definition: {
        needs_permission: formState.needs_permission,
        max_level: Math.max(
          ...formState.triggers.map((trigger) => {
            return trigger.levels.length;
          })
        ),
        anvil_cost: formState.anvil_cost,
        conflicts_with: formState.conflicts_with.map(
          (enchantment) => enchantment.name
        ),
        supported: formState.supported.map((item) => item.name),
        primary: formState.primary.map((item) => item.name),
        tags: Object.assign(
          {},
          ...formState.tags.map((tag) => ({ [tag.name.toLowerCase()]: true }))
        ),
        destroy_item_chance: parseFloat(formState.destroy_item_chance) || 0,
        remove_enchantment_chance:
          parseFloat(formState.remove_enchantment_chance) || 0,
      },
      custom_locations:
        formState.default_enchantment_location ||
        formState.custom_enchantment_locations.length === 0
          ? []
          : formState.custom_enchantment_locations.map((loc) => loc.name),
      triggers: Object.assign(
        {},
        ...formState.triggers.map((trigger) => ({
          [trigger.name]: {
            conditions: trigger.selected_trigger_conditions.map((condition) => {
              return {
                group: condition.group,
                prefix: condition.prefix,
                suffix: condition.suffix,
                values: condition.fields.map((field) => ({
                  operator: field.subValue ?? "equals", // fallback if not set
                  value: field.name,
                })),
              };
            }),
            custom_conditions: trigger.custom_trigger_conditions,
            levels: Object.assign(
              {},
              ...trigger.levels.map((level, index) => ({
                [index + 1]: {
                  cancel_event: level.cancel_event,
                  cooldown: level.cooldown,
                  cooldown_message: level.cooldown_message.trim(),
                  chance: level.chance,
                  cleanup_commands: level.cleanup_commands,
                  instructions: formatInstructions(level.instructions),
                },
              }))
            ),
          },
        }))
      ),
    },
  };

  if (formState.in_enchanting_table) {
    jsonEnchantment[enchantment_name].definition.tags[
      "in_enchanting_table"
    ] = true;
    jsonEnchantment[enchantment_name].definition["enchanting_table"] = {
      weight: formState.weight,
      min_cost_base: formState.min_cost_base,
      min_cost_incr: formState.min_cost_incr,
      max_cost_base: formState.max_cost_base,
      max_cost_incr: formState.max_cost_incr,
    };
  }

  const doc = new YAML.Document();
  doc.contents = jsonEnchantment;

  return doc.toString().replace(/"(\d+)"/g, "$1");
};

export const yamlToJson = async (yaml) => {
  const jsonEnchantment = YAML.parse(yaml);
  const enchantmentName = Object.keys(jsonEnchantment)[0];
  const enchantmentData = jsonEnchantment[enchantmentName];
  const definition = enchantmentData.definition ?? {};
  const filteredTags = Object.keys(definition.tags ?? {}).filter(
    (key) => definition.tags[key]
  );

  for (const trigger of Object.keys(enchantmentData.triggers)) {
    console.log(trigger);

    console.log(enchantmentData.triggers[trigger].levels);
  }

  const formState = JSON.parse(JSON.stringify(defaultFormState));

  formState.enchantment_name = toTitleCase(enchantmentName);
  formState.minecraft_version = versions.includes(enchantmentData.version)
    ? enchantmentData.version
    : formState.minecraft_version;
  formState.depends = (enchantmentData.depends ?? []).map((value) => ({
    name: value,
    label: value,
    overrides: [],
  }));

  formState.needs_permission = definition.needs_permission ?? false;
  formState.anvil_cost = definition.anvil_cost ?? formState.anvil_cost;
  formState.conflicts_with = (definition.conflicts_with ?? []).map((name) => ({
    name: name,
    label: toTitleCase(name),
  }));
  formState.supported = [
    ...enchantment_targets,
    ...(await loadValues("item", formState.minecraft_version)),
  ].filter((target) => (definition.supported ?? []).includes(target.name));
  formState.primary = [
    ...enchantment_targets,
    ...(await loadValues("item", formState.minecraft_version)),
  ].filter((target) => (definition.primary ?? []).includes(target.name));
  formState.tags = enchantment_tags.filter((tag) =>
    filteredTags.includes(tag.name.toLowerCase())
  );

  if (
    Array.isArray(enchantmentData.custom_locations) &&
    enchantmentData.custom_locations.length > 0
  ) {
    formState.default_enchantment_location = false;
    formState.custom_enchantment_locations =
      enchanted_item_custom_locations.filter((item) =>
        enchantmentData.custom_locations.includes(item.name)
      );
  } else {
    formState.default_enchantment_location = true;
    formState.custom_enchantment_locations = [];
  }

  definition.destroy_item_chance = parseFloat(
    enchantmentData.destroy_item_chance ?? 0
  );
  definition.remove_enchantment_chance = parseFloat(
    enchantmentData.remove_enchantment_chance ?? 0
  );
  formState.in_enchanting_table =
    (definition.tags ?? {}).in_enchanting_table ??
    formState.in_enchanting_table;

  if (formState.in_enchanting_table) {
    formState.weight = definition.enchanting_table?.weight ?? formState.weight;
    formState.min_cost_base =
      definition.enchanting_table?.min_cost_base ?? formState.min_cost_base;
    formState.min_cost_incr =
      definition.enchanting_table?.min_cost_incr ?? formState.min_cost_incr;
    formState.max_cost_base =
      definition.enchanting_table?.max_cost_base ?? formState.max_cost_base;
    formState.max_cost_incr =
      definition.enchanting_table?.max_cost_incr ?? formState.max_cost_incr;
  }

  const tempTriggers = triggers.filter((trigger) =>
    (Object.keys(enchantmentData.triggers) ?? []).includes(trigger.name)
  );
  formState.triggers = await Promise.all(
    tempTriggers.map(async (trigger) => {
      const loadedTrigger = await loadTrigger(
        trigger,
        formState.minecraft_version
      );

      return {
        ...loadedTrigger,
        selected_trigger_conditions: Object.entries(
          enchantmentData.triggers[trigger.name].conditions ?? {}
        )
          .map(([ignored, condition]) => {
            const match = loadedTrigger.possible_trigger_conditions.find(
              (c) =>
                c.group === condition.group &&
                c.prefix === (condition.prefix ?? "") &&
                c.suffix === (condition.suffix ?? "")
            );

            if (!match) return null;

            return {
              ...match,
              fields: condition.values.map((triggerConditionValue) => {
                const matched = match.possible_values.find(
                  (value) =>
                    value.name ===
                    triggerConditionValue.value.toString().toLowerCase()
                );

                if (matched)
                  return {
                    ...matched,
                    subValue: triggerConditionValue.operator,
                  };

                return {
                  name: triggerConditionValue.value.toString().toLowerCase(),
                  label: toTitleCase(
                    triggerConditionValue.value.toString().toLowerCase()
                  ),
                  subValue: triggerConditionValue.operator,
                };
              }),
            };
          })
          .filter(Boolean),
        custom_trigger_conditions:
          enchantmentData.triggers[trigger.name].custom_conditions ?? [],
        levels: Object.values(
          enchantmentData.triggers[trigger.name].levels ?? {}
        ).map((level) => ({
          cooldown: level.cooldown,
          cooldown_message: level.cooldown_message ?? "",
          chance: level.chance,
          cancel_event: level.cancel_event,
          cleanup_commands: level.cleanup_commands ?? [],
          instructions: parseYamlInstructions(level.instructions),
        })),
      };
    })
  );

  return formState;
};

function formatInstructions(instructions) {
  const formattedInstructions = [];

  for (const instruction of instructions) {
    const formatted = {};
    let result = {};

    if (typeof instruction.value === "object" && instruction.value !== null)
      for (const [key, val] of Object.entries(instruction.value))
        result[key] = Array.isArray(val) ? formatInstructions(val) : val;
    else result = instruction.value;

    formatted[instruction.type] = result;
    formattedInstructions.push(formatted);
  }

  return formattedInstructions;
}

function parseYamlInstructions(instructions) {
  return instructions.map((instruction) => {
    if (typeof instruction === "object" && instruction !== null) {
      // Handle Command Instruction
      if (instruction.command !== undefined) {
        return {
          type: "command",
          value: instruction.command,
        };
      }

      // Handle Delay Instruction
      if (instruction.delay !== undefined) {
        return {
          type: "delay",
          value: instruction.delay,
        };
      }

      // Handle Save Instruction
      if (instruction.save !== undefined) {
        return {
          type: "save",
          value: instruction.save,
        };
      }

      // Handle Load Instruction
      if (instruction.load !== undefined) {
        return {
          type: "load",
          value: instruction.load,
        };
      }

      // Handle Repeat Instruction
      if (instruction.repeat !== undefined) {
        return {
          type: "repeat",
          value: {
            amount: instruction.repeat.amount,
            loop_parameter: instruction.repeat.loop_parameter,
            instructions: parseYamlInstructions(
              instruction.repeat.instructions
            ),
          },
        };
      }

      if (instruction.while !== undefined) {
        return {
          type: "while",
          value: {
            condition: instruction.while.condition,
            loop_parameter: instruction.while.loop_parameter,
            instructions: parseYamlInstructions(instruction.while.instructions),
          },
        };
      }

      if (instruction.conditional !== undefined) {
        return {
          type: "conditional",
          value: {
            condition: instruction.conditional.condition,
            if: parseYamlInstructions(instruction.conditional.if),
            else: parseYamlInstructions(instruction.conditional.else),
          },
        };
      }

      if (instruction.cancel !== undefined) {
        return {
          type: "cancel",
          value: instruction.cancel,
        };
      }
    }

    // If the instruction does not match any expected type
    throw new Error(
      "Unknown instruction format: " + JSON.stringify(instruction)
    );
  });
}

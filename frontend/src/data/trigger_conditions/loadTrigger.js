import { dimensions } from "./values/dimensions";
import { prime_causes } from "./values/causes/primeCauses";
import { ignite_causes } from "./values/causes/igniteCauses";
import { damage_causes } from "./values/causes/damageCauses";
import { inventory_types } from "./values/inventory_type";
import { regain_health_causes } from "./values/causes/regainHealthCauses";

import { versions } from "../versions";
import { defaultLevel } from "../../util/yamlParser";
import { globalTriggerConditions } from "./globalTriggerConditions";
import { triggerConditionGroups } from "./triggerConditionGroups";
import { combineStrings, localStore, toTitleCase } from "../../util/util";

export const loadTrigger = async (trigger, version) => {
  const triggerConditionParents = [...(trigger.trigger_conditions ?? [])];
  triggerConditionParents.push(...globalTriggerConditions);

  const triggerConditions = [];
  for (const triggerConditionParent of triggerConditionParents) {
    const triggerConditionGroup =
      triggerConditionGroups[triggerConditionParent.group];
    if (triggerConditionGroup === undefined) {
      console.error(
        "Trigger condition group: " +
          triggerConditionParent.group +
          " was not found"
      );
      continue;
    }

    for (const triggerCondition of triggerConditionGroup.values) {
      const name = combineStrings(
        "_",
        triggerConditionParent.prefix,
        triggerConditionParent.group,
        triggerCondition.suffix
      );
      const label = toTitleCase(name);
      const description =
        triggerCondition.description + triggerConditionParent.description;
      const value_type =
        triggerCondition.value_type === "parent"
          ? triggerConditionParent.value_type
          : triggerCondition.value_type;
      const values = await loadValues(value_type, version);

      triggerConditions.push({
        group: triggerConditionParent.group,
        prefix: triggerConditionParent.prefix,
        suffix: triggerCondition.suffix,
        name: name,
        label: label,
        description: description,
        value_type: value_type,
        possible_values: values,
        fields: [],
      });
    }
  }

  return {
    name: trigger.name,
    label: trigger.label,
    category: trigger.category,
    description: trigger.description,
    possible_trigger_conditions: triggerConditions,
    selected_trigger_conditions: [],
    custom_trigger_conditions: [],
    levels: [defaultLevel],
  };
};

export const loadValues = async (value_type, version) => {
  const cacheKey = `${version}:${value_type}`;
  const localData = localStorage.getItem(`valueCache:${cacheKey}`);
  if (localData) {
    return JSON.parse(localData);
  }

  const triggerCondition = triggerConditionMap[value_type];
  let possibleValues;
  if (triggerCondition.content) {
    possibleValues = triggerCondition.content;
  } else {
    let versionIndex = versions.indexOf(version);
    while (possibleValues === undefined) {
      const path = `/minecraft_data/${versions[versionIndex]}/${triggerCondition.file}`;
      const response = await fetch(path);
      try {
        const jsonData = await response.json();
        possibleValues = jsonData
          .filter(triggerCondition.filter)
          .map((item) => ({
            name: item.name,
            label: item.displayName,
          }));
      } catch (err) {
        console.warn(`${path} does not exist!`);
        versionIndex = (versionIndex + 1) % versions.length;
        if (versionIndex === versions.indexOf(version)) {
          throw new Error(`${triggerCondition.file} does not exist!`);
        }
      }
    }
  }
  localStore(`valueCache:${cacheKey}`, JSON.stringify(possibleValues));
  return possibleValues;
};

const triggerConditionMap = {
  block: {
    file: "blocks.json",
    filter: (block) => block,
  },
  entity: {
    file: "entities.json",
    filter: (entity) => entity,
  },
  mob: {
    file: "entities.json",
    filter: (entity) => entity.type === "hostile" || entity.type === "mob",
  },
  animal: {
    file: "entities.json",
    filter: (entity) => entity.type === "animal",
  },
  projectile: {
    file: "entities.json",
    filter: (entity) => entity.type === "projectile",
  },
  item: {
    file: "items.json",
    filter: (item) => item,
  },
  armor: {
    file: "items.json",
    filter: (item) =>
      item.enchantCategories?.includes("wearable") ||
      item.enchantCategories?.includes("armor") ||
      item.enchantCategories?.includes("equippable"),
  },
  biome: {
    file: "biomes.json",
    filter: (item) => item,
  },
  prime_cause: {
    content: prime_causes,
  },
  damage_cause: {
    content: damage_causes,
  },
  ignite_cause: {
    content: ignite_causes,
  },
  regain_health_cause: {
    content: regain_health_causes,
  },
  health_change_cause: {
    content: [...damage_causes, ...regain_health_causes],
  },
  dimension: {
    content: dimensions,
  },
  inventory: {
    content: inventory_types,
  },
  empty: {
    content: [],
  },
};

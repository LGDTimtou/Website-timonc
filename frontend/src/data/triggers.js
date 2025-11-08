export const triggers_nested = {
  armor: [
    {
      name: "armor_de_equip",
      description: "Triggered when an armor piece is removed or replaced.",
      trigger_conditions: [
        {
          group: "item",
          prefix: "new_armor",
          description:
            "the armor piece that is equipped in place of the old one. This can be 'AIR' if no new armor is equipped",
          value_type: "armor",
        },
        {
          group: "item",
          prefix: "old_armor",
          description:
            "the armor piece that was previously equipped and is now removed",
          value_type: "armor",
        },
      ],
    },
    {
      name: "armor_equip",
      description:
        "Triggered whenever an armor piece is equipped, either replacing another piece or in an empty slot.",
      trigger_conditions: [
        {
          group: "item",
          prefix: "new_armor",
          description: "the armor piece that is being equipped",
          value_type: "armor",
        },
        {
          group: "item",
          prefix: "old_armor",
          description:
            "the armor piece that was replaced. Will be 'AIR' if the slot was previously empty",
          value_type: "armor",
        },
      ],
    },
  ],
  block: [
    {
      name: "block_damaged",
      description: "Triggered when the player damages a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "damaged",
          description: "the block that was damaged",
        },
      ],
    },
    {
      name: "block_fertilize",
      description: "Triggered when the player fertilizes a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "fertilized",
          description: "the block that was fertilized",
        },
      ],
    },
    {
      name: "block_ignite",
      description: "Triggered when the player ignites a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "ignited",
          description: "the block that was ignited",
        },
        {
          group: "cause",
          prefix: "ignite",
          description: "the ignition",
          value_type: "ignite_cause",
        },
      ],
    },
    {
      name: "block_place",
      description: "Triggered when a certain block is placed by the player",
      trigger_conditions: [
        {
          group: "block",
          prefix: "placed",
          description: "the block that was placed",
        },
        {
          group: "block",
          prefix: "against",
          label: "Placed Against Block",
          description: "the block it was placed against",
        },
      ],
    },
    {
      name: "block_break",
      description: "Triggered when a certain block is broken by the player",
      trigger_conditions: [
        {
          group: "block",
          prefix: "broken",
          description: "the block that was broken",
        },
      ],
    },
  ],
  block_other: [
    {
      name: "activate_sculk_sensor",
      description: "Triggered when a sculk sensor is activated",
      trigger_conditions: [],
    },
    {
      name: "bell_rung",
      description: "Triggered when a bell is rung",
      trigger_conditions: [],
    },
    {
      name: "change_sign",
      description: "Triggered when a sign is changed",
      trigger_conditions: [
        {
          group: "string",
          prefix: "lines",
          description: "the lines of the sign (regexes can be used)",
        },
      ],
    },
    {
      name: "prime_tnt",
      description: "Triggered when TNT is primed",
      trigger_conditions: [
        {
          group: "cause",
          prefix: "prime",
          description: "the prime",
          value_type: "prime_cause",
        },
      ],
    },
  ],
  click: [
    {
      name: "left_click",
      description: "Triggered when the player left-clicks",
      trigger_conditions: [],
    },
    {
      name: "left_click_air",
      description: "Triggered when the player left-clicks in the air",
      trigger_conditions: [],
    },
    {
      name: "left_click_block",
      description: "Triggered when the player left-clicks a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "clicked",
          description: "the block that was clicked",
        },
      ],
    },
    {
      name: "right_click",
      description: "Triggered when the player right-clicks",
      trigger_conditions: [],
    },
    {
      name: "right_click_air",
      description: "Triggered when the player right-clicks in the air",
      trigger_conditions: [],
    },
    {
      name: "right_click_block",
      description: "Triggered when the player right-clicks a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "clicked",
          description: "the block that was clicked",
        },
      ],
    },
    {
      name: "right_click_entity",
      description: "Triggered when the player right-clicks an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "clicked",
          description: "the entity that was clicked",
          value_type: "entity",
        },
      ],
    },
    {
      name: "shift_left_click",
      description: "Triggered when the player shift-left-clicks",
      trigger_conditions: [],
    },
    {
      name: "shift_left_click_air",
      description: "Triggered when the player shift-left-clicks in the air",
      trigger_conditions: [],
    },
    {
      name: "shift_left_click_block",
      description: "Triggered when the player shift-left-clicks a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "clicked",
          description: "the block that was clicked",
        },
      ],
    },
    {
      name: "shift_right_click",
      description: "Triggered when the player shift-right-clicks",
      trigger_conditions: [],
    },
    {
      name: "shift_right_click_air",
      description: "Triggered when the player shift-right-clicks in the air",
      trigger_conditions: [],
    },
    {
      name: "shift_right_click_block",
      description: "Triggered when the player shift-right-clicks a block",
      trigger_conditions: [
        {
          group: "block",
          prefix: "clicked",
          description: "the block that was clicked",
        },
      ],
    },
    {
      name: "shift_right_click_entity",
      description: "Triggered when the player shift-right-clicks an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "clicked",
          description: "the entity that was clicked",
          value_type: "entity",
        },
      ],
    },
  ],
  damage: [
    {
      name: "damage_animal",
      description: "Triggered when the player damages an animal",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "damaged",
          description: "the animal that was damaged",
          value_type: "animal",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage done to the animal",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage done to the animal",
        },
      ],
    },
    {
      name: "damage_entity",
      description: "Triggered when the player damages an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "damaged",
          description: "the entity that was damaged",
          value_type: "entity",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage done to the entity",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage done to the entity",
        },
      ],
    },
    {
      name: "damage_mob",
      description: "Triggered when the player damages a mob",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "damaged",
          description: "the mob that was damaged",
          value_type: "mob",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage done to the mob",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage done to the mob",
        },
      ],
    },
    {
      name: "damage_player",
      description: "Triggered when the player damages another player",
      trigger_conditions: [
        {
          group: "player",
          prefix: "damaged",
          description: "the player that was damaged",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage done to the player",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage done to the player",
        },
      ],
    },
  ],
  fishing_rod: [
    {
      name: "fishing_rod_caught",
      description: "Triggered when an item is caught using a fishing rod",
      example: "fishing_rod_caught",
      trigger_conditions: [
        {
          group: "item",
          prefix: "caught",
          description: "the item that was caught",
          value_type: "item",
        },
      ],
    },
    {
      name: "fishing_rod_hit_entity",
      description: "Triggered when a fishing rod hits an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "hit",
          description: "the entity that was hit",
          value_type: "entity",
        },
      ],
    },
    {
      name: "fishing_rod_hit_player",
      description: "Triggered when a fishing rod hits a player",
      trigger_conditions: [
        {
          group: "player",
          prefix: "hit",
          description: "the player that was hit",
        },
      ],
    },
  ],
  inventory: [
    {
      name: "inventory_open",
      description: "Triggered when the player opens an inventory",
      trigger_conditions: [
        {
          group: "inventory",
          prefix: "top",
          description: "the top inventory that was opened",
        },
        {
          group: "inventory",
          prefix: "bottom",
          description: "the bottom inventory that was opened",
        },
        {
          group: "string",
          prefix: "inventory_title",
          description:
            "the title of the inventory that was opened (regexes can be used)",
        },
      ],
    },
    {
      name: "inventory_close",
      description: "Triggered when the player closes an inventory",
      trigger_conditions: [
        {
          group: "inventory",
          prefix: "top",
          description: "the top inventory that was closed",
        },
        {
          group: "inventory",
          prefix: "bottom",
          description: "the bottom inventory that was closed",
        },
        {
          group: "string",
          prefix: "inventory_title",
          description:
            "the title of the inventory that was closed (regexes can be used)",
        },
      ],
    },
  ],
  death: [
    {
      name: "animal_death",
      description: "Triggered when an animal dies",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "dead",
          description: "the animal that died",
        },
        {
          group: "cause",
          prefix: "last_damage",
          description: "the last damage that killed the animal",
        },
      ],
    },
    {
      name: "entity_death",
      description: "Triggered when an entity dies",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "dead",
          description: "the entity that died",
        },
        {
          group: "cause",
          prefix: "last_damage",
          description: "the last damage that killed the entity",
        },
      ],
    },
    {
      name: "mob_death",
      description: "Triggered when a mob dies",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "dead",
          description: "the mob that died",
        },
        {
          group: "cause",
          prefix: "last_damage",
          description: "the last damage that killed the mob",
        },
      ],
    },
    {
      name: "player_death",
      description: "Triggered when an other player dies",
      trigger_conditions: [
        {
          group: "player",
          prefix: "dead",
          description: "the player that died",
        },
        {
          group: "cause",
          prefix: "last_damage",
          description: "the last damage that killed the player",
        },
      ],
    },
  ],
  kill: [
    {
      name: "kill_animal",
      description: "Triggered when the player kills an animal",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "killed",
          description: "the animal that was killed",
          value_type: "animal",
        },
      ],
    },
    {
      name: "kill_entity",
      description: "Triggered when the player kills an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "killed",
          description: "the entity that was killed",
          value_type: "entity",
        },
      ],
    },
    {
      name: "kill_mob",
      description: "Triggered when the player kills a mob",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "killed",
          description: "the mob that was killed",
          value_type: "mob",
        },
      ],
    },
    {
      name: "kill_player",
      description: "Triggered when the player kills another player",
      trigger_conditions: [
        {
          group: "player",
          prefix: "killed",
          description: "the player that was killed",
        },
      ],
    },
  ],
  movement: [
    {
      name: "player_idle",
      description: "Triggered when the player stands still",
      trigger_conditions: [
        {
          group: "number",
          prefix: "idle_time",
          description: "the idle time in seconds",
        },
      ],
    },
    {
      name: "player_move",
      description: "Triggered when the player moves",
      trigger_conditions: [
        {
          group: "number",
          prefix: "from_x",
          description: "the X coordinate the player moved from",
        },
        {
          group: "number",
          prefix: "from_y",
          description: "the Y coordinate the player moved from",
        },
        {
          group: "number",
          prefix: "from_z",
          description: "the Z coordinate the player moved from",
        },
      ],
    },
    {
      name: "player_swim",
      description: "Triggered when the player swims",
      trigger_conditions: [
        {
          group: "number",
          prefix: "from_x",
          description: "the X coordinate the player swam from",
        },
        {
          group: "number",
          prefix: "from_y",
          description: "the Y coordinate the player swam from",
        },
        {
          group: "number",
          prefix: "from_z",
          description: "the Z coordinate the player swam from",
        },
      ],
    },
    {
      name: "player_sneak_toggle",
      description: "Triggered when the player toggles sneak",
      trigger_conditions: [],
    },
    {
      name: "player_sneak_up",
      description: "Triggered when the player stops sneaking",
      trigger_conditions: [],
    },
    {
      name: "player_sneak_down",
      description: "Triggered when the player starts sneaking",
      trigger_conditions: [],
    },
    {
      name: "player_fly_toggle",
      description: "Triggered when the player toggles flight",
      trigger_conditions: [],
    },
    {
      name: "player_fly_start",
      description: "Triggered when the player starts flying",
      trigger_conditions: [],
    },
    {
      name: "player_fly_stop",
      description: "Triggered when the player stops flying",
      trigger_conditions: [],
    },
  ],
  projectiles: [
    {
      name: "projectile_hit_block",
      description:
        "Triggered when a projectile launched by the player hits a block",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "projectile",
          description: "the projectile that was launched",
          value_type: "projectile",
        },
        {
          group: "block",
          prefix: "hit",
          description: "the block that was hit",
        },
      ],
    },
    {
      name: "projectile_hit_entity",
      description:
        "Triggered when a projectile launched by the player hits an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "projectile",
          description: "the projectile that was launched",
          value_type: "projectile",
        },
        {
          group: "entity",
          prefix: "hit",
          description: "the entity that was hit",
          value_type: "entity",
        },
      ],
    },
    {
      name: "projectile_hit_player",
      description:
        "Triggered when a projectile launched by the player hits a player",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "projectile",
          description: "the projectile that was launched",
          value_type: "projectile",
        },
        {
          group: "player",
          prefix: "hit",
          description: "the player that was hit",
        },
      ],
    },
    {
      name: "projectile_land",
      description: "Triggered when a projectile launched by the player lands",
      example: "projectile_land",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "projectile",
          description: "the projectile that was launched",
          value_type: "projectile",
        },
      ],
    },
  ],
  health_change: [
    {
      name: "health_change",
      description: "Triggered when the player takes damage or regains health",
      trigger_conditions: [
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "number",
          prefix: "health_change",
          description: "the health change amount",
        },
        {
          group: "cause",
          prefix: "change",
          description: "the health change",
          value_type: "health_change_cause",
        },
      ],
    },
    {
      name: "regain_health",
      description: "Triggered when the player regains health",
      trigger_conditions: [
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "number",
          prefix: "health_regain",
          description: "the health regain amount",
        },
        {
          group: "cause",
          prefix: "regain",
          description: "the health regain",
          value_type: "health_regain_cause",
        },
      ],
    },
    {
      name: "take_damage_from_entity",
      description: "Triggered when the player takes damage from an entity",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "attacker",
          description: "the entity that damaged the player",
          value_type: "entity",
        },
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage taken",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage taken",
        },
      ],
    },
    {
      name: "take_damage_from_mob",
      description: "Triggered when the player takes damage from a mob",
      trigger_conditions: [
        {
          group: "entity",
          prefix: "attacker",
          description: "the mob that damaged the player",
          value_type: "mob",
        },
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage taken",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage taken",
        },
      ],
    },
    {
      name: "take_damage_from_player",
      description: "Triggered when the player takes damage from another player",
      trigger_conditions: [
        {
          group: "player",
          prefix: "attacker",
          description: "the player that damaged the player",
        },
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage taken",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage taken",
        },
      ],
    },
    {
      name: "take_damage_from_non_entity",
      description: "Triggered when the player takes damage from a non-entity",
      trigger_conditions: [
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage taken",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage taken",
        },
      ],
    },
    {
      name: "take_damage",
      description: "Triggered when the player takes damage",
      trigger_conditions: [
        {
          group: "number",
          prefix: "new_health",
          description: "the new health of the player",
        },
        {
          group: "number",
          prefix: "previous_health",
          description: "the previous health of the player",
        },
        {
          group: "cause",
          prefix: "damage",
          description: "the damage taken",
          value_type: "damage_cause",
        },
        {
          group: "number",
          prefix: "damage",
          description: "the damage taken",
        },
      ],
    },
  ],
  chat: [
    {
      name: "player_chat",
      description: "Triggered when the player sends a chat message",
      trigger_conditions: [
        {
          group: "string",
          prefix: "message",
          description: "the message that the player sent (regexes can be used)",
        },
        {
          group: "number",
          prefix: "length",
          description: "the message length",
        },
      ],
    },
    {
      name: "player_receive_chat",
      description: "Triggered when the player receives a chat message",
      trigger_conditions: [
        {
          group: "string",
          prefix: "message",
          description:
            "the message that the player received (regexes can be used)",
        },
        {
          group: "number",
          prefix: "length",
          description: "the message length",
        },
      ],
    },
  ],
};

function flattenAndAddLabels(triggersNested) {
  const titleCase = (str) =>
    str
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const flattenedList = [];
  Object.entries(triggersNested).forEach(([categoryName, categoryItems]) => {
    categoryItems.forEach((item) => {
      flattenedList.push({
        ...item,
        label: titleCase(item.name),
        category: categoryName,
      });
    });
  });
  return flattenedList;
}

export const triggers = flattenAndAddLabels(triggers_nested);

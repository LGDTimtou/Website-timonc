const enchantment_targets_nested = {
  name: "durability",
  label: "Has Durability",
  overrides: [
    {
      name: "mining_loot",
      label: "Tools",
      overrides: [
        {
          name: "pickaxes",
          label: "Pickaxes",
        },
        {
          name: "axes",
          label: "Axes",
        },
        {
          name: "shovels",
          label: "Shovels",
        },
        {
          name: "hoes",
          label: "Hoes",
        },
      ],
    },
    {
      name: "equippable",
      label: "Equippable",
      overrides: [
        {
          name: "armor",
          label: "Armor",
          overrides: [
            {
              name: "foot_armor",
              label: "Boots",
              overrides: [],
            },
            {
              name: "leg_armor",
              label: "Leggings",
              overrides: [],
            },
            {
              name: "chest_armor",
              label: "Chestplates",
              overrides: [],
            },
            {
              name: "head_armmor",
              label: "Helmets",
              overrides: [],
            },
          ],
        },
        {
          name: "skulls",
          label: "Skulls",
        },
      ],
    },
    {
      name: "melee_weapon",
      label: "Melee Weapon",
      overrides: [
        {
          name: "swords",
          label: "Swords",
          overrides: [],
        },
        {
          name: "spears",
          label: "Spears",
          overrides: [],
        },
      ],
    },
  ],
};

const flattenEnchantmentTargets = (target, parents = []) => {
  const { name, label, overrides } = target;

  parents.forEach((parent) => (parent.overrides = [...parent.overrides, name]));
  const newTarget = { name, label, overrides: [] };

  let flatTargets = [newTarget];

  if (overrides && overrides.length > 0) {
    overrides.forEach((child) => {
      flatTargets = flatTargets.concat(
        flattenEnchantmentTargets(child, [...parents, newTarget])
      );
    });
  }

  return flatTargets;
};

export const enchantment_targets = flattenEnchantmentTargets(
  enchantment_targets_nested
);

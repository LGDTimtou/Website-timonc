export const built_in_commands = [
  {
    name: "/ce add <enchantment> [level]",
    permission: "add",
    description:
      "Applies the <enchantment> to the item currently held by the player, with an optional [level].",
  },
  {
    name: "/ce remove <enchantment>",
    permission: "remove",
    description:
      "Remove the <enchantment> from the item currently held by the player.",
  },
  {
    name: "/ce create",
    permission: "create",
    description:
      "Design and configure a new custom enchantment using the web builder and load them back into the server with the click of a button.",
  },
  {
    name: "/ce edit <enchantment>",
    permission: "edit",
    description:
      "Edit the <enchantment> using the web builder and reload them back into the server with the click of a button.",
  },
  {
    name: "/ce info",
    permission: "info",
    description:
      "Get an overview of all available default and loaded custom enchantments.",
  },
  {
    name: "/ce reload",
    permission: "reload",
    description: "Reload the plugin's configuration files.",
  },
];

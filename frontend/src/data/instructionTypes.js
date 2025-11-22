export const instructionTypes = [
  {
    name: "command",
    label: "Command",
    description: "Runs the specified command from the server console.",
  },
  {
    name: "delay",
    label: "Delay",
    description:
      "Pauses the specified amount of time in seconds before executing the next instruction.",
  },
  {
    name: "repeat",
    label: "Repeat",
    description:
      "Runs the instructions the specified amount of times.\n\nThe Loop Parameter field sets the name of a placeholder (e.g., %k%) that tracks the current iteration number, starting at 0.",
  },
  {
    name: "save",
    label: "Save",
    description:
      "Writes the specified value to the specified identifier, allowing you to store data for later use.\n\nIf the persistent field is checked this data will be stored even after server shutdown.",
  },
  {
    name: "load",
    label: "Load Default",
    description:
      "Loads a default value to the specified identifier if there was no previous value stored.",
  },
  {
    name: "conditional",
    label: "Conditional",
    description:
      "Runs the 'if' instructions if the specified condition is true and the 'else' instructions otherwise.",
  },
  {
    name: "while",
    label: "While",
    description:
      "Runs the instructions while the specified condition remains true.\n\nThe Loop Parameter field sets the name of a placeholder (e.g., %k%) that tracks the current iteration number, starting at 0.\n",
  },
  {
    name: "cancel",
    label: "Cancel",
    description:
      "Cancels all running instructions of the specified trigger for this enchantment and player",
  },
];

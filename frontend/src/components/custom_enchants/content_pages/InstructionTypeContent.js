import "../../../styles/custom_enchants/CustomEnchants.css";
import CommandInstruction from "../custom_components/builder/instructions/CommandInstruction";
import CancelInstruction from "../custom_components/builder/instructions/CancelInstruction";
import ConditionalInstruction from "../custom_components/builder/instructions/ConditionalInstruction";
import DelayInstruction from "../custom_components/builder/instructions/DelayInstruction";
import RepeatInstruction from "../custom_components/builder/instructions/RepeatInstruction";
import SaveLoadInstruction from "../custom_components/builder/instructions/SaveLoadInstruction";
import WhileInstruction from "../custom_components/builder/instructions/WhileInstruction";
import { instructionTypes } from "../../../data/instructionTypes";
import TipBox from "../custom_components/TipBox";

const instructions = {
  command: {
    component: CommandInstruction,
    empty_value: "tp %player% 0 100 0",
  },
  cancel: {
    component: CancelInstruction,
    empty_value: {},
  },
  conditional: {
    component: ConditionalInstruction,
    empty_value: {
      condition: "%player_x% > -100 && %player_x% < 100",
      if: [{ type: "command", value: "say Nice!" }],
      else: [],
    },
  },
  delay: {
    component: DelayInstruction,
    empty_value: "10",
  },
  repeat: {
    component: RepeatInstruction,
    empty_value: {
      amount: "10",
      loop_parameter: "k",
      instructions: [
        { type: "command", value: "say We are at iteration %k%!" },
      ],
    },
  },
  save: {
    component: SaveLoadInstruction,
    empty_value: {
      identifier: "%player%_sum",
      value: "$[%player_x% + %player_y% + %player_z%]",
    },
  },
  load: {
    component: SaveLoadInstruction,
    empty_value: {
      identifier: "%player%_sum",
      default_value: "0",
    },
  },
  while: {
    component: WhileInstruction,
    empty_value: {
      loop_parameter: "k",
      condition: "%player_y% > 100",
      instructions: [
        { type: "command", value: "say We are at iteration %k%!" },
      ],
    },
  },
};

const InstructionTypeContent = () => {
  return (
    <div>
      <p className="content-intro">
        Available instruction types in the Custom Enchant Builder
      </p>
      {instructionTypes.map((instruction, index) => {
        const instructionData = instructions[instruction.name];
        const InstructionComponent = instructionData?.component;
        return (
          <div key={index} className="parameters-section">
            <p className="subsection-title offset">
              {instruction.label} Instruction
            </p>

            <TipBox>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {instruction.description}
              </p>
            </TipBox>

            <p className="subsubsection-title offset">Example</p>
            <div className="command-card" key={index}>
              <InstructionComponent
                instruction={{
                  type: instruction.name,
                  value: instructionData.empty_value,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InstructionTypeContent;

import CommandInstruction from "./instructions/CommandInstruction";
import DelayInstruction from "./instructions/DelayInstruction";
import RepeatInstruction from "./instructions/RepeatInstruction";
import SaveLoadInstruction from "./instructions/SaveLoadInstruction";
import WhileInstruction from "./instructions/WhileInstruction";
import ConditionalInstruction from "./instructions/ConditionalInstruction";
import { FaChevronUp, FaChevronDown, FaTimes } from "react-icons/fa";
import CancelInstruction from "./instructions/CancelInstruction";

const InstructionListField = ({
  title = "Instructions",
  targetKey = "instructions",
  parentIndices,
  instructions,
  parameters,
  onChangeInstructionType,
  onChangeInstructionValue,
  onRemoveInstruction,
  onAddInstruction,
  onMoveInstruction,
}) => {
  return (
    <div className="instruction-list-field">
      <h4 className="commands-title offset">{title}:</h4>
      {instructions.map((instruction, index) => (
        <div className="command-card" key={index}>
          {instruction.type === "command" && (
            <CommandInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
            />
          )}

          {instruction.type === "delay" && (
            <DelayInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
            />
          )}

          {(instruction.type === "save" || instruction.type === "load") && (
            <SaveLoadInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
            />
          )}

          {instruction.type === "repeat" && (
            <RepeatInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionType={onChangeInstructionType}
              onChangeInstructionValue={onChangeInstructionValue}
              onRemoveInstruction={onRemoveInstruction}
              onAddInstruction={onAddInstruction}
              onMoveInstruction={onMoveInstruction}
            />
          )}

          {instruction.type === "while" && (
            <WhileInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
              onRemoveInstruction={onRemoveInstruction}
              onAddInstruction={onAddInstruction}
              onMoveInstruction={onMoveInstruction}
            />
          )}

          {instruction.type === "conditional" && (
            <ConditionalInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              parameters={parameters}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
              onRemoveInstruction={onRemoveInstruction}
              onAddInstruction={onAddInstruction}
              onMoveInstruction={onMoveInstruction}
            />
          )}

          {instruction.type === "cancel" && (
            <CancelInstruction
              instruction={instruction}
              parentIndices={[...parentIndices, index]}
              onChangeInstructionValue={onChangeInstructionValue}
              onChangeInstructionType={onChangeInstructionType}
            />
          )}

          <div className="instruction-btns">
            <button
              className="instruction-btn"
              onClick={() =>
                onMoveInstruction([...parentIndices, index], -1, targetKey)
              }
              disabled={index === 0}
            >
              <FaChevronUp />
            </button>
            <button
              className="instruction-btn remove"
              onClick={() =>
                onRemoveInstruction([...parentIndices, index], targetKey)
              }
            >
              <FaTimes />
            </button>
            <button
              className="instruction-btn"
              onClick={() =>
                onMoveInstruction([...parentIndices, index], 1, targetKey)
              }
              disabled={index === instructions.length - 1}
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      ))}

      {/* Add Instruction Button */}
      <button
        className="add-btn-text"
        onClick={() => onAddInstruction(parentIndices, targetKey)}
      >
        + Add Instruction
      </button>
    </div>
  );
};

export default InstructionListField;

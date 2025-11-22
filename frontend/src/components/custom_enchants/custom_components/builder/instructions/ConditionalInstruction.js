import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";
import ResizableTextArea from "../../ResizableTextAreaField";
import InstructionListField from "../InstructionListField";

const ConditionalInstruction = ({
  instruction,
  parentIndices = [],
  parameters,
  onChangeInstructionValue = () => {},
  onChangeInstructionType = () => {},
  onAddInstruction = () => {},
  onRemoveInstruction = () => {},
  onMoveInstruction = () => {},
}) => {
  return (
    <div className="instruction-box-fields">
      <SelectField
        label="Type"
        description="The type of instruction you want to execute"
        options={instructionTypes}
        name="type"
        value={instruction.type}
        onChange={(e) =>
          onChangeInstructionType([...parentIndices], e.target.value)
        }
      />
      <ResizableTextArea
        label="Condition"
        description="Specify the condition that needs to check what set of instructions to execute"
        placeholder=""
        name="condition"
        value={instruction.value.condition}
        onChange={(e) =>
          onChangeInstructionValue([...parentIndices], {
            ...instruction.value,
            condition: e.target.value,
          })
        }
        autoCompleteOptions={parameters}
      />
      <InstructionListField
        title="If"
        targetKey="if"
        parentIndices={[
          ...parentIndices.slice(0, -1),
          [parentIndices.at(-1), "if"],
        ]}
        instructions={instruction.value.if}
        parameters={parameters}
        onChangeInstructionType={onChangeInstructionType}
        onChangeInstructionValue={onChangeInstructionValue}
        onRemoveInstruction={onRemoveInstruction}
        onAddInstruction={onAddInstruction}
        onMoveInstruction={onMoveInstruction}
      />
      <InstructionListField
        title="Else"
        targetKey="else"
        parentIndices={[
          ...parentIndices.slice(0, -1),
          [parentIndices.at(-1), "else"],
        ]}
        instructions={instruction.value.else}
        parameters={parameters}
        onChangeInstructionType={onChangeInstructionType}
        onChangeInstructionValue={onChangeInstructionValue}
        onRemoveInstruction={onRemoveInstruction}
        onAddInstruction={onAddInstruction}
        onMoveInstruction={onMoveInstruction}
      />
    </div>
  );
};

export default ConditionalInstruction;

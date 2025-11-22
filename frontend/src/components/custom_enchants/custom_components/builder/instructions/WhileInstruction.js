import InputField from "../../InputField";
import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";
import ResizableTextArea from "../../ResizableTextAreaField";
import InstructionListField from "../InstructionListField";

const WhileInstruction = ({
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
      <InputField
        label="Loop Parameter"
        description={`Specify the name of the parameter that tracks the current loop iteration. For example, in the second iteration, %${instruction.value.loop_parameter}% will equal 1 (0 based indexing)`}
        placeholder=""
        name="loop_parameter"
        value={instruction.value.loop_parameter}
        onChange={(e) =>
          onChangeInstructionValue([...parentIndices], {
            ...instruction.value,
            loop_parameter: e.target.value,
          })
        }
        maxWidth={20}
      />
      <ResizableTextArea
        label="Condition"
        description="Specify the condition that needs to hold before executing these instructions"
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
        parentIndices={[...parentIndices]}
        instructions={instruction.value.instructions}
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

export default WhileInstruction;

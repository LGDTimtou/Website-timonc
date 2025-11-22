import InputField from "../../InputField";
import InstructionListField from "../InstructionListField";
import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";

const RepeatInstruction = ({
  instruction,
  parentIndices = [],
  parameters,
  onChangeInstructionValue = () => {},
  onAddInstruction = () => {},
  onRemoveInstruction = () => {},
  onMoveInstruction = () => {},
  onChangeInstructionType = () => {},
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
        label="Amount"
        description="The amount of times these instructions should be executed (parameters and expressions are supported)"
        name="amount"
        value={instruction.value.amount}
        onChange={(e) =>
          onChangeInstructionValue([...parentIndices], {
            ...instruction.value,
            amount: e.target.value,
          })
        }
        autoCompleteOptions={parameters}
        maxWidth={100}
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
        maxWidth={15}
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

export default RepeatInstruction;

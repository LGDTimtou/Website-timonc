import InputField from "../../InputField";
import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";

const DelayInstruction = ({
  instruction,
  parentIndices = [],
  parameters,
  onChangeInstructionValue = () => {},
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
        label="Delay"
        description="A delay in seconds before the next command is executed (parameters and expressions are supported)"
        placeholder=""
        name="value"
        value={instruction.value}
        onChange={(e) =>
          onChangeInstructionValue([...parentIndices], e.target.value)
        }
        autoCompleteOptions={parameters}
      />
    </div>
  );
};

export default DelayInstruction;

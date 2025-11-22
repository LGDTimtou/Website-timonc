import ResizableTextAreaField from "../../ResizableTextAreaField";
import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";

const CommandInstruction = ({
  instruction,
  parentIndices = [],
  parameters,
  onChangeInstructionValue = (e) => {},
  onChangeInstructionType = (e) => {},
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
      <ResizableTextAreaField
        label="Command"
        description="The Minecraft command to be executed by the console (parameters and expressions are supported)"
        name="value"
        autoCompleteOptions={parameters}
        value={instruction.value}
        onChange={(e) =>
          onChangeInstructionValue(
            [...parentIndices],
            e.target.value.replace(/[\r\n]+/g, " ")
          )
        }
      />
    </div>
  );
};

export default CommandInstruction;

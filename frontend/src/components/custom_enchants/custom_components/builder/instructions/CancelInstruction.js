import SelectField from "../../SelectField";
import { instructionTypes } from "../../../../../data/instructionTypes";
import { triggers } from "../../../../../data/triggers";

const sorted_triggers = triggers
  .slice()
  .sort((a, b) => a.label.localeCompare(b.label));

const CancelInstruction = ({
  instruction,
  parentIndices,
  onChangeInstructionValue,
  onChangeInstructionType,
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
      <SelectField
        style={{ marginBottom: "15px" }}
        label="Trigger"
        description="The trigger of which all running instructions will be cancelled"
        options={sorted_triggers}
        name="value"
        value={instruction.value}
        onChange={(e) => {
          onChangeInstructionValue([...parentIndices], e.target.value);
        }}
      />
    </div>
  );
};

export default CancelInstruction;

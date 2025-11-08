import React from "react";
import LevelField from "./LevelField";

const LevelCreationField = React.memo(({ onChange, levels, parameters }) => {
  const handleAddLevelClick = () => {
    const lastLevel = levels[levels.length - 1];
    const newLevels = [...levels, { ...lastLevel }];
    onChange(newLevels);
  };

  const handleRemoveLevel = (idx) => {
    const newLevels = levels.filter((_, index) => index !== idx);
    onChange(newLevels);
  };

  const handleLevelChange = (idx, newLevel) => {
    const newLevels = levels.map((level, index) =>
      index === idx ? newLevel : level
    );
    onChange(newLevels);
  };

  return (
    <div>
      {levels.map((level, index) => (
        <LevelField
          key={index}
          id={index}
          level={level}
          parameters={parameters}
          onChange={handleLevelChange}
          onRemove={handleRemoveLevel}
        />
      ))}
      {levels.length < 256 && (
        <div className="add-trigger-section">
          <button className="add-btn-text" onClick={handleAddLevelClick}>
            + Add Level
          </button>
        </div>
      )}
    </div>
  );
});

export default LevelCreationField;

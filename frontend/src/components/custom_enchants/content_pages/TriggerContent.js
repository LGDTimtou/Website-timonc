import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { yamlToJson } from "../../../util/yamlParser";
import ExtraFunctionalityTipBox from "../custom_components/ExtraFunctionalityTipBox";
import { globalTriggerConditions } from "../../../data/trigger_conditions/globalTriggerConditions";
import { triggerConditionGroups } from "../../../data/trigger_conditions/triggerConditionGroups";
import { combineStrings, toTitleCase } from "../../../util/util";

const TriggerContent = ({ category, triggerName, trigger }) => {
  const navigate = useNavigate();

  const [copySucces, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const gifUrl = `/triggerExamples/${category}/${trigger.example}.gif`;
  const yamlUrl = `/triggerExamples/${category}/${trigger.example}.yml`;

  const getYamlOutput = async () => {
    try {
      const response = await fetch(yamlUrl);
      if (!response.ok) {
        throw new Error(`Failed to load YAML file: ${yamlUrl}`);
      }
      const text = await response.text();
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  const loadYamlOutputInBuilder = async () => {
    setLoading(true);
    try {
      const response = await fetch(yamlUrl);
      if (!response.ok) {
        throw new Error(`Failed to load YAML file: ${yamlUrl}`);
      }
      const text = await response.text();
      const json = await yamlToJson(text);
      navigate("/custom_enchants/custom_enchant_builder", { state: { json } });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="content-intro">Trigger Specifications</p>

      {/* Category */}
      <div className="content-box">
        <h2 className="content-box-title">{triggerName}</h2>
      </div>

      <div className="parameters-section">
        <p className="subsection-title offset">Description</p>
        <p className="minecraft offset"> {trigger.description}</p>
      </div>
      {trigger.trigger_conditions.length > 0 && (
        <div className="parameters-section">
          <p className="subsection-title offset">
            Trigger Specific Conditions and Parameters
          </p>
          {trigger.trigger_conditions.map((triggerConditionParent) => (
            <div>
              <p className="subsubsection-title offset">
                {toTitleCase(
                  combineStrings(
                    "_",
                    triggerConditionParent.prefix,
                    triggerConditionParent.group
                  )
                )}
              </p>
              {triggerConditionGroups[triggerConditionParent.group].values.map(
                (triggerCondition) => {
                  const name = combineStrings(
                    "_",
                    triggerConditionParent.prefix,
                    triggerConditionParent.group,
                    triggerCondition.suffix
                  );
                  return (
                    <div className="parameter-item">
                      <span className="parameter-name">%{name}%</span>
                      <span className="parameter-description">
                        {triggerCondition.description +
                          triggerConditionParent.description}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          ))}
        </div>
      )}

      <div className="parameters-section">
        <p className="subsection-title offset">
          Global Trigger Conditions and Parameters
        </p>
        {globalTriggerConditions.map((triggerConditionParent) => (
          <div>
            <p className="subsubsection-title offset">
              {toTitleCase(
                combineStrings(
                  "_",
                  triggerConditionParent.prefix,
                  triggerConditionParent.group
                )
              )}
            </p>
            {triggerConditionGroups[triggerConditionParent.group].values.map(
              (triggerCondition) => {
                const name = combineStrings(
                  "_",
                  triggerConditionParent.prefix,
                  triggerConditionParent.group,
                  triggerCondition.suffix
                );
                return (
                  <div className="parameter-item">
                    <span className="parameter-name">%{name}%</span>
                    <span className="parameter-description">
                      {triggerCondition.description +
                        triggerConditionParent.description}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        ))}
      </div>

      {trigger.example && (
        <div className="parameters-section">
          <p className="subsection-title offset">Example</p>
          <div>
            <img
              src={gifUrl}
              alt={`${triggerName}`}
              style={{ borderRadius: "15px", width: "100%" }}
            />
          </div>
          <button
            className={`add-btn-text ${copySucces ? "copy-success" : ""}`}
            onClick={getYamlOutput}
            disabled={copySucces}
          >
            {copySucces
              ? "Output copied to clipboard!"
              : "Copy Example Enchantment"}
          </button>
          <button
            className="add-btn-text btn-dis"
            onClick={loadYamlOutputInBuilder}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Example in Builder"}
          </button>
        </div>
      )}
      <ExtraFunctionalityTipBox
        firstLine={"a new trigger or trigger condition"}
      />
    </div>
  );
};

export default TriggerContent;

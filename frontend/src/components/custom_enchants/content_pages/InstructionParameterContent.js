import "../../../styles/custom_enchants/CustomEnchants.css";
import {
  cooldown_message_parameters,
  global_parameters,
} from "../../../data/trigger_conditions/parameters";
import ExtraFunctionalityTipBox from "../custom_components/ExtraFunctionalityTipBox";

const InstructionParameterContent = () => {
  return (
    <div>
      <p className="content-intro">
        A list of parameters that can be used in instructions, cooldown
        messages, delays...
      </p>
      <div className="parameters-section">
        <p className="subsection-title offset">Trigger Parameters</p>
        <p className="minecraft offset">
          Each trigger includes a set of global parameters, and some also have
          additional unique parameters! These can be found in the left sidebar
          on their respective trigger pages.
        </p>
      </div>
      <div className="parameters-section">
        <p className="subsection-title offset">PlaceholderAPI</p>
        <p className="minecraft offset">
          <a
            href="https://www.spigotmc.org/resources/placeholderapi.6245/"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            PlacheolderAPI
          </a>{" "}
          parameters are supported if the plugin is installed!
          <br />
          You can find a list of all usable parameters{" "}
          <a
            href="https://wiki.placeholderapi.com/users/placeholder-list/"
            className="minecraft-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>

      <div className="parameters-section">
        <p className="subsection-title offset">Global Enchantment Parameters</p>
        {global_parameters?.map((parameter, index) => (
          <div key={index} className="parameter-item">
            <span className="parameter-name">%{parameter.name}%:</span>
            <span className="parameter-description">
              {parameter.description}
            </span>
          </div>
        ))}
      </div>
      <div className="parameters-section">
        <p className="subsection-title offset">
          Global Cooldown Message Parameters
        </p>
        {cooldown_message_parameters?.map((parameter, index) => (
          <div key={index} className="parameter-item">
            <span className="parameter-name">%{parameter.name}%:</span>
            <span className="parameter-description">
              {parameter.description}
            </span>
          </div>
        ))}
      </div>

      <ExtraFunctionalityTipBox firstLine={"a new parameter"} />
    </div>
  );
};

export default InstructionParameterContent;

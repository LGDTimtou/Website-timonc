import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../custom_components/InputField";
import SelectField from "../custom_components/SelectField";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { versions } from "../../../data/versions";
import { enchantment_targets } from "../../../data/targets";
import { enchantment_tags } from "../../../data/tags";
import { enchantments } from "../../../data/enchantments";
import { triggers } from "../../../data/triggers";
import { enchanted_item_custom_locations } from "../../../data/enchanted_item_custom_locations";
import AddableSelectField from "../custom_components/AddableSelectField";
import SliderField from "../custom_components/SliderField";
import TriggerSelectField from "../custom_components/builder/TriggerSelectField";
import YamlActionButtonsField from "../custom_components/builder/YamlActionButtonsField";
import YamlPopup from "../custom_components/builder/YamlPopup";
import TipBox from "../custom_components/TipBox";
import LoadingDots from "../custom_components/builder/LoadingDots";
import { checkConstraints } from "../../../util/constraints";
import {
  defaultFormState,
  jsonToYaml,
  yamlToJson,
} from "../../../util/yamlParser";
import ToggleSwitchField from "../custom_components/ToggleSwitchField";
import { localStore } from "../../../util/util";
import { loadValues } from "../../../data/trigger_conditions/loadTrigger";

const BACKEND_URL = "https://timonc-backend.onrender.com/api";
//const BACKEND_URL = "http://localhost:8000/api";

const CustomEnchantBuilderContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const shouldClear = query.get("clear") === "true";
  const [formState, setFormState] = useState(() => {
    if (shouldClear) return defaultFormState;
    const storedData = localStorage.getItem("formState");
    return storedData ? JSON.parse(storedData) : defaultFormState;
  });
  const [secret, setSecret] = useState(undefined);
  const [isLoadingYaml, setLoadingYaml] = useState(false);
  const [errors, setErrors] = useState([]);
  const [buttonState, setButtonState] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dynamicSupportedOptions, setDynamicSupportedOptions] =
    useState(enchantment_targets);

  useEffect(() => {
    localStore("formState", JSON.stringify(formState));
  }, [formState]);

  useEffect(() => {
    (async () => {
      const values = await loadValues("item", formState.minecraft_version);
      const merged = [...enchantment_targets, ...values];
      setDynamicSupportedOptions(merged);
    })();
  }, [formState.minecraft_version]);

  useEffect(() => {
    if (location.state?.json) {
      setFormState(location.state.json);
    }
  }, [location.state]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const secret = query.get("secret");
    if (query.get("load_yaml") === "true") {
      setPopupVisible(true);
      query.delete("load_yaml");
      navigate({ search: query.toString() }, { replace: true });
    } else if (secret !== null && secret !== undefined) {
      setSecret(secret);

      let didFinish = false;
      const delay = setTimeout(() => {
        if (!didFinish) {
          setLoadingYaml(true);
        }
      }, 1000);

      (async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/load?secret=${secret}`);
          const data = await res.json();
          if (data.yaml !== "") {
            const parsed = await yamlToJson(data.yaml);
            setFormState(parsed);
          } else setFormState(defaultFormState);
        } catch (err) {
          alert(
            "Failed to load YAML, Please copy the YAML manually from the enchantments.yml file\n" +
              err
          );
          setSecret(undefined);
          setPopupVisible(true);
          query.delete("secret");
          navigate({ search: query.toString() }, { replace: true });
        } finally {
          didFinish = true;
          clearTimeout(delay);
          setLoadingYaml(false);
        }
      })();
    }
  }, [location.search, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleAddableSelectboxChange = (name, values) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: values,
    }));
  };

  const clearAllInput = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all inputs?"
    );
    if (confirmed) {
      setFormState(defaultFormState);
      const scrollContainer = document.querySelector(".content-container");
      if (scrollContainer)
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getYamlOutput = () => {
    const errors = checkConstraints(formState);
    setErrors(errors);
    if (errors.length > 0) return;

    navigator.clipboard.writeText(jsonToYaml(formState));
    setButtonState("success");
    setTimeout(() => setButtonState(""), 3000);
  };

  const sendInputToBackend = () => {
    const errors = checkConstraints(formState);
    setErrors(errors);
    if (errors.length > 0) return;

    setButtonState("loading");
    fetch(`${BACKEND_URL}/update?secret=${secret}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yaml: jsonToYaml(formState) }),
    })
      .then(() => {
        setButtonState("success");
        setTimeout(() => {
          setButtonState("");
        }, 3000);
      })
      .catch(() => {
        setButtonState("error");
        setTimeout(() => setButtonState(""), 10000);
        navigator.clipboard.writeText(jsonToYaml(formState));
      });
  };

  return isLoadingYaml ? (
    <LoadingDots />
  ) : (
    <div>
      <p className="content-intro">
        Use this builder to easily create custom enchantments
      </p>
      <YamlActionButtonsField
        secret={secret}
        onLoadClick={() => setPopupVisible(true)}
        onCopyClick={getYamlOutput}
        onClearClick={clearAllInput}
        onSendClick={sendInputToBackend}
        buttonState={buttonState}
        errors={errors}
      />
      <YamlPopup
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={(input) => setFormState(input)}
      />
      <div className="content-box">
        <h2 className="content-box-title">General Information</h2>
        <SelectField
          label="Minecraft Version"
          description="The Minecraft version this enchantment is intended for"
          options={versions.map((item) => ({ value: item, label: item }))}
          name="minecraft_version"
          value={formState.minecraft_version}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />
        <InputField
          label="Enchantment Name"
          description="The name you want the enchantment to have"
          placeholder=""
          name="enchantment_name"
          value={formState.enchantment_name}
          onChange={handleChange}
        />
        <AddableSelectField
          name="depends"
          label="Dependencies"
          description="List of plugins that this enchantment requires to function properly."
          options={[]}
          values={formState.depends}
          onChange={handleAddableSelectboxChange}
          customOptionsAllowed={true}
        />
        <ToggleSwitchField
          label="Needs Permission"
          description={`Determines if the player needs permission (customenchantments.enchantment.${
            formState.enchantment_name
              ? formState.enchantment_name.toLowerCase()
              : "<name>"
          }) to trigger this enchantment`}
          name="needs_permission"
          checked={formState.needs_permission}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchantment Definition</h2>
        <AddableSelectField
          name="supported"
          label="Supported"
          description="Items on which this enchantment can be applied using an anvil or using the /enchant command"
          options={dynamicSupportedOptions}
          values={formState.supported}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="tags"
          label="Tags"
          description="Modifiers to alter your enchantment's vanilla behaviour"
          options={enchantment_tags}
          values={formState.tags}
          onChange={handleAddableSelectboxChange}
        />
        <AddableSelectField
          name="conflicts_with"
          label="Conflicts with"
          description="Enchantments that cannot be combined with your enchantment on the same item."
          options={enchantments}
          values={formState.conflicts_with}
          customOptionsAllowed={true}
          onChange={handleAddableSelectboxChange}
        />
        <InputField
          label="Anvil Cost"
          description="The base cost when applying this enchantment to another item using an anvil. Halved when adding using a book, multiplied by the level of the enchantment."
          placeholder=""
          type="number"
          name="anvil_cost"
          value={formState.anvil_cost}
          onChange={handleChange}
        />
      </div>
      <div className="content-box">
        <h2 className="content-box-title">Enchanting Table</h2>
        <div className="field-container">
          <ToggleSwitchField
            label="Enabled"
            description="Determines if this enchantment can appear in enchanting tables"
            name="in_enchanting_table"
            checked={formState.in_enchanting_table}
            onChange={handleCheckboxChange}
          />
          {formState.in_enchanting_table && (
            <SliderField
              label="Weight"
              description="Value between 1 and 1024 (inclusive) — Controls the probability of this enchantment when enchanting. The probability is determined weight/total weight * 100%, where total_weight is the sum of the weights of all available enchantments."
              name="weight"
              value={formState.weight}
              onChange={handleChange}
              min={1}
              max={1024}
            />
          )}
        </div>

        {formState.in_enchanting_table && (
          <div className="content-box">
            {formState.supported.length > 0 && (
              <AddableSelectField
                name="primary"
                label="Primary"
                description="Items for which this enchantment appears in an enchanting table (leave empty to use all supported items)."
                options={formState.supported}
                values={formState.primary}
                onChange={handleAddableSelectboxChange}
              />
            )}
            <div className="field-container">
              <InputField
                label="Minimum Cost Base"
                description="The minimum cost for a level I enchantment"
                placeholder=""
                type="number"
                name="min_cost_base"
                value={formState.min_cost_base}
                onChange={handleChange}
              />
              <InputField
                label="Minimum Cost Increment"
                description="The amount of levels added to the minimum for each level above level I"
                placeholder=""
                type="number"
                name="min_cost_incr"
                value={formState.min_cost_incr}
                onChange={handleChange}
              />
            </div>

            <div className="field-container">
              <InputField
                label="Maximum Cost Base"
                description="The maximum cost for a level I enchantment"
                placeholder=""
                type="number"
                name="max_cost_base"
                value={formState.max_cost_base}
                onChange={handleChange}
              />
              <InputField
                label="Maximum Cost Increment"
                description="The amount of levels added to the maximum for each level above level I"
                placeholder=""
                type="number"
                name="max_cost_incr"
                value={formState.max_cost_incr}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="content-box">
          <h2 className="content-box-title">Extra settings</h2>
          <ToggleSwitchField
            label="Use Default Item Locations"
            description="Use default item locations when checking where the enchanted item is equipped (main_hand, armor)"
            name="default_enchantment_location"
            checked={formState.default_enchantment_location}
            onChange={handleCheckboxChange}
          />
          {!formState.default_enchantment_location && (
            <AddableSelectField
              name="custom_enchantment_locations"
              label="Custom Item Locations"
              description="Specify custom inventory locations to search for the enchanted item"
              options={enchanted_item_custom_locations}
              values={formState.custom_enchantment_locations}
              onChange={handleAddableSelectboxChange}
            />
          )}
          <SliderField
            label="Destroy Item Chance"
            description="Chance that the item will be destroyed when the enchantment activates"
            name="destroy_item_chance"
            value={formState.destroy_item_chance}
            onChange={handleChange}
            min={0}
            max={100}
            step={0.1}
          />
          <SliderField
            label="Remove Enchantment Chance"
            description="Chance that the enchantment will be removed from the item when it activates"
            name="remove_enchantment_chance"
            value={formState.remove_enchantment_chance}
            onChange={handleChange}
            min={0}
            max={100}
            step={0.1}
          />
        </div>

        <div className="content-box">
          <h2 className="content-box-title">Triggers</h2>
          <TipBox>
            <p>
              You can use{" "}
              <a
                href="https://timonc.be/custom_enchants/parameters"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                parameters
              </a>{" "}
              and{" "}
              <a
                href="https://timonc.be/custom_enchants/expressions"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                expressions
              </a>{" "}
              in your instructions, conditions and cooldown message. Type{" "}
              <strong>%</strong> for autocomplete suggestions.
            </p>
          </TipBox>
          <TipBox style={{ marginBottom: "20px" }}>
            <p>
              <a
                href="https://wiki.placeholderapi.com/users/placeholder-list/"
                className="minecraft-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                PlaceholderAPI
              </a>{" "}
              placeholders are supported if the plugin is installed!
            </p>
          </TipBox>
          <TriggerSelectField
            selectedTriggers={formState.triggers}
            triggerOptions={triggers}
            version={formState.minecraft_version}
            onChange={handleAddableSelectboxChange}
          />
        </div>
        <br />
        <br />
        <YamlActionButtonsField
          secret={secret}
          onLoadClick={() => setPopupVisible(true)}
          onCopyClick={getYamlOutput}
          onClearClick={clearAllInput}
          onSendClick={sendInputToBackend}
          buttonState={buttonState}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default CustomEnchantBuilderContent;

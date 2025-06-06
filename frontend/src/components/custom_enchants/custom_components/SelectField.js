import React, {useEffect, useRef} from "react";

const SelectField = React.memo(
    ({label, description, options, name, value, onChange, style}) => {
        const selectRef = useRef(null);

        useEffect(() => {
            if (selectRef.current) {
                const tempElement = document.createElement("div");
                tempElement.style.position = "absolute";
                tempElement.style.visibility = "hidden";
                tempElement.style.whiteSpace = "nowrap";
                tempElement.style.fontSize = "0.9rem";
                tempElement.style.fontFamily = "inherit";
                tempElement.style.padding = "10px 14px";
                document.body.appendChild(tempElement);

                let maxWidth = 0;
                options.forEach((option) => {
                    tempElement.innerText =
                        typeof option === "string" ? option : option.label;
                    const optionWidth = tempElement.offsetWidth;
                    maxWidth = Math.max(maxWidth, optionWidth);
                });

                document.body.removeChild(tempElement);

                // Apply the calculated width to the select field
                selectRef.current.style.width = `${maxWidth + 30}px`;
            }
        }, [options]);

        return (
            <div
                style={style}
            >
                <label className="input-label">
                    {label}
                    <div className="tooltip-bubble">{description}</div>
                </label>
                <select
                    className="select-field"
                    ref={selectRef}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

export default SelectField;

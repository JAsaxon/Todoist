import chroma from "chroma-js";
import { ColourOption, colourOptions } from "../data/colorData";
import Select, { StylesConfig } from "react-select";
import { colorObject } from "../types";
//! Stolen from the react-select examples, no clue how it works :p
const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    const selection = chroma("gray");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color.alpha(0.3).css()
        : isFocused
        ? selection.alpha(0.2).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast("black", "white") < 2
          ? "white"
          : "black"
        : "black",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? "red" : "red") : "red",
      },
      ":before": {
        content: "''",
        width: "10px",
        marginRight: "10px",
        height: "10px",
        display: "inline-block",
        backgroundColor: color.css(),
        borderRadius: "50%",
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};
type colorSelectionProps = {
  handleChange: (obj: any) => void;
  color: colorObject;
};

export default ({ handleChange, color }: colorSelectionProps) => (
  <Select
    options={colourOptions}
    onChange={handleChange}
    value={color}
    styles={colourStyles}
  />
);

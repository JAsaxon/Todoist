import { Form } from "react-bootstrap";
import "../styles/colorSelect.scss";
import { useState } from "react";
const COLORS = {
  Yellow: "#ffdc5f",
  Green: "#71dc7b",
  Blue: "#58c3ff",
} as const;
type colorsKeys = keyof typeof COLORS;
const colors = Object.values(COLORS);
export type Color = (typeof colors)[number];
function ColorSelection() {
  const [currentColor, setCurrentColor] = useState<Color>(COLORS.Yellow);
  const style = { "--color-attr": currentColor } as React.CSSProperties;
  return (
    <div className="select-wrapper" style={style}>
      <Form.Select aria-label="Default select example" className="color-select">
        {(Object.keys(COLORS) as colorsKeys[]).map((color: colorsKeys) => {
          return (
            <option
              style={{ color: `${COLORS[color]}` }}
              onClick={() => setCurrentColor(COLORS[color])}
            >
              {color}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}

export default ColorSelection;

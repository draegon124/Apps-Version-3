import { woodFrameStyle } from "./FarmersChalkboardHeading";
import "./WoodFrame.css";

export default function WoodFrame({
  children,
  as: Tag         = "div",
  innerColor      = "#5a3e1b",
  outerColor      = "#7a5428",
  thickness       = 10,
  dropShadow      = "rgba(0,0,0,0.5)",
  borderRadius    = "6px",
  className       = "",
  ...rest
}) {
  const frameStyle = woodFrameStyle({ innerColor, outerColor, thickness, dropShadow, borderRadius });

  return (
    <Tag
      className={`wood-frame ${className}`.trim()}
      style={frameStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
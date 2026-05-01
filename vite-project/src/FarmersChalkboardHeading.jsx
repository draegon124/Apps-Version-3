import { useEffect, useState } from "react";
import "./FarmersChalkboardHeading.css";


function woodFrameStyle({
  innerColor   = "#5a3e1b",
  outerColor   = "#7a5428",
  thickness    = 14,
  dropShadow   = "rgba(0,0,0,0.5)",
  borderRadius = "6px",
} = {}) {
  const t  = thickness;
  const t1 = t + 2;
  const t2 = t + 4;
  return {
    borderRadius,
    boxShadow: `
      0 0 0 ${t}px ${innerColor},
      0 0 0 ${t1}px ${outerColor},
      0 0 0 ${t2}px ${innerColor},
      0 4px 20px ${dropShadow}
    `,
  };
}



export default function FarmersChalkboardHeading({
  // Text
  title              = "THE FARM",
  subtitle           = "Market & Bakery",
  tagline            = "Fresh & Local",
  established        = "Est. 1887 · Farm to Table",
  // Frame
  frameInnerColor    = "#5a3e1b",
  frameOuterColor    = "#7a5428",
  frameThickness     = 14,
  frameDropShadow    = "rgba(0,0,0,0.6)",
  frameBorderRadius  = "6px",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const frameStyle = woodFrameStyle({
    innerColor:   frameInnerColor,
    outerColor:   frameOuterColor,
    thickness:    frameThickness,
    dropShadow:   frameDropShadow,
    borderRadius: frameBorderRadius,
  });

  return (
    <div className="cb-wrap">
      <div
        className={`cb-board${visible ? " visible" : ""}`}
        style={frameStyle}
      >
        <div className="cb-grain" aria-hidden="true" />
        <div className="cb-border" aria-hidden="true" />

        <div className="cb-inner">
          <p className="cb-subtitle-top">{tagline}</p>


          <h1 className="cb-main-title">{title}</h1>

          <div className="cb-underlines" aria-hidden="true">
            <span />
            <span />
          </div>

          <p className="cb-secondary">{subtitle}</p>

          <div className="cb-bottom-bar">
            <span className="cb-rule" />
            <span className="cb-established">· {established} ·</span>
            <span className="cb-rule" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { woodFrameStyle };
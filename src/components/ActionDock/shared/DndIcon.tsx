import React from "react";

export type DndIconCategory = "damage" | "spell" | "weapon" | "class" | "combat" | "condition";

export interface DndIconProps {
  category: DndIconCategory;
  name: string;
  size?: number;
  color?: string;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Universal D&D 5e Vector Icon Component
 * Renders monochrome vector SVG icons from /dnd-icons using CSS mask,
 * allowing instant color styling with zero external dependencies.
 */
export const DndIcon: React.FC<DndIconProps> = ({
  category,
  name,
  size = 16,
  color = "currentColor",
  className = "",
  title,
  style,
}) => {
  const normalized = name.toLowerCase().replace(/\s+/g, "-");
  const iconUrl = `/dnd-icons/${category}/${normalized}.svg`;

  return (
    <span
      className={`dnd-icon dnd-icon-${category}-${normalized} ${className}`}
      title={title || name}
      aria-hidden={!title}
      aria-label={title || name}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url("${iconUrl}")`,
        maskImage: `url("${iconUrl}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        flexShrink: 0,
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
};

export default DndIcon;

"use client";

import React, { type ReactNode, ReactElement, useState } from "react";
import ChevronIcon from "../ChevronIcon";

type ExpandableType = {
  title: string | ReactElement;
  children: ReactNode;
  shouldRenderBottomLine?: boolean;
};

export default function Expandable({ title, children, shouldRenderBottomLine }: ExpandableType) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderTitle = () => {
    const className = `${shouldRenderBottomLine ? "border-b border-line" : ""}`;
    if (React.isValidElement(title)) {
      return (
        <div className="cursor-pointer flex items-center" onClick={handleExpand}>
          {title}
          <div className={`ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}>
            <ChevronIcon />
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center w-full py-2 cursor-pointer ${className}`} onClick={handleExpand}>
        <h2>{title}</h2>
        <div className={`ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </div>
      </div>
    );
  };

  const renderChildren = () => {
    return (
      <div
        className={`grid mt-2 transition-[grid-template-rows] ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderTitle()}
      {renderChildren()}
    </div>
  );
}

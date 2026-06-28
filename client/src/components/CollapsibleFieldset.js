import { useState } from "react";

export default function CollapsibleFieldset({
  legend,
  children,
  defaultOpen = false,
}) {
  const [isOpen, setOpen] = useState(defaultOpen);

  return (
    <fieldset className="collapsible-fieldset">
      <legend
        onClick={() => setOpen((o) => !o)}
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {isOpen ? "▼ " : "▶ "} {legend}
      </legend>

      {isOpen && (
        <div className="fieldset-content">
          {children}
        </div>
      )}
    </fieldset>
  );
}
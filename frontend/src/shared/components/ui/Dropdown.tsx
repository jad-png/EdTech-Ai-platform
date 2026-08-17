import { useEffect, useRef, useState, type ReactNode } from "react";

interface DropdownProps {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
}

export function Dropdown({ label, trigger, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="ui-dropdown" ref={rootRef}>
      <button
        type="button"
        className="ui-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={() => setIsOpen((open) => !open)}
      >
        {trigger}
        <span
          className={`ui-dropdown__chevron${isOpen ? " ui-dropdown__chevron--open" : ""}`}
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>
      {isOpen && (
        <div className="ui-dropdown__panel" role="menu">
          {children}
        </div>
      )}
    </div>
  );
}

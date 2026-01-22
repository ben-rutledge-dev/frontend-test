import { useState, useRef, useEffect } from "react";
import "./SearchableDropdown.css";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  optional?: boolean;
  options: Option[];
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

function SearchableDropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Search...",
  error,
  optional,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="fieldWrapper" ref={wrapperRef}>
      {label && <label className="label">{label}</label>}
      <div className="dropdown">
        <div
          className={`dropdownToggle ${error ? "dropdownError" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? "selectedText" : "placeholder"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="dropdownActions">
            <span className="arrow">{isOpen ? "▲" : "▼"}</span>
            {optional && value && (
              <span
                className="optionalRemove"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(undefined);
                }}
              >
                ✕
              </span>
            )}
          </span>
        </div>
        {isOpen && (
          <div className="dropdownMenu">
            <input
              type="text"
              className="searchInput"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="optionsList">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`option ${
                      option.value === value ? "optionSelected" : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="noOptions">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default SearchableDropdown;

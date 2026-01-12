import { useState, useRef, useEffect } from 'react';
import styles from './SearchableDropdown.module.css';

interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

function SearchableDropdown({
  options,
  value,
  onChange,
  label,
  placeholder = 'Search...',
  error,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={styles.fieldWrapper} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dropdown}>
        <div
          className={`${styles.dropdownToggle} ${error ? styles.dropdownError : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? styles.selectedText : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className={styles.optionsList}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`${styles.option} ${
                      option.value === value ? styles.optionSelected : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className={styles.noOptions}>No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default SearchableDropdown;

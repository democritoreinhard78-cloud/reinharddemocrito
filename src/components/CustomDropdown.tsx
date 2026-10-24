import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listboxId = `${baseId}-listbox`;

  const selectedIndex = Math.max(options.findIndex((opt) => opt.value === value), 0);
  const selectedOption = options[selectedIndex];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openMenu = () => {
    setHighlightedIndex(selectedIndex);
    setIsOpen(true);
  };

  const selectOption = (index: number) => {
    onChange(options[index].value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) openMenu();
        else setHighlightedIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) openMenu();
        else setHighlightedIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(options.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        if (isOpen) {
          e.preventDefault();
          selectOption(highlightedIndex);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      className="space-y-1.5 relative select-none"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      data-no-shortcuts
    >
      {label && (
        <span
          id={labelId}
          className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-medium block"
        >
          {label}
        </span>
      )}

      {/* Dropdown Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0a0708] text-xs text-white flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border border-rose ring-1 ring-rose/50 shadow-[0_0_15px_rgba(194,86,106,0.25)]'
            : 'border border-line hover:border-line'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
      >
        <span className="truncate tracking-wide font-normal">
          {selectedOption.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-rose shrink-0 ml-2 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listboxId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#110b0d]/98 backdrop-blur-xl border border-line/80 rounded-xl shadow-2xl p-1.5 max-h-64 overflow-y-auto space-y-1"
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectOption(index)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-rose/15 text-cream font-semibold border border-rose/30'
                      : isHighlighted
                        ? 'text-white bg-line/70'
                        : 'text-slate-300 hover:text-white hover:bg-line/70'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-rose shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useFlightStore } from '../store/flightStore';
import './LanguageSwitcher.css';

const languages = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' }
];

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide on mobile when modals are open
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const showCard = useFlightStore((state) => state.showCard);
  const shouldHideOnMobile = !hasStarted || showCard;

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`language-switcher-dropdown ${shouldHideOnMobile ? 'hide-on-mobile' : ''}`}
      ref={dropdownRef}
    >
      <button
        className="language-selector"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLang.flag}</span>
        <span className={`language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                changeLanguage(lang.code as 'it' | 'en');
                setIsOpen(false);
              }}
            >
              <span className="language-flag">{lang.flag}</span>
              {language === lang.code && <span className="check-mark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

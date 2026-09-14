import { Moon, Sun } from 'lucide-react';

export default function Preferences({ theme, language, setTheme, setLanguage, t }) {
  return (
    <div className="preferences" role="group" aria-label={t('Tema e idioma')}>
      <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={t(theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro')}
        title={t(theme === 'dark' ? 'Modo escuro' : 'Modo claro')}>
        {theme === 'dark' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
      </button>
      <div className="language-controls" role="group" aria-label={t('Idioma')}>
        {[['pt', 'Português'], ['en', 'English']].map(([code, label]) => (
          <button key={code} type="button" lang={code === 'pt' ? 'pt-BR' : 'en'} aria-label={label}
            aria-pressed={language === code} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>
        ))}
      </div>
    </div>
  );
}

import useLanguage from '@common/hooks/features/useLanguage';
import { Translate } from '@phosphor-icons/react';

export default function LanguageToggle() {
  const { toggleLanguage, isSpanish } = useLanguage();

  return (
    <div>
      <input
        type="checkbox"
        name="language-switch"
        id="language-switch"
        className="language-switch sr-only"
        defaultChecked={isSpanish}
        onClick={toggleLanguage}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-[35px] h-[35px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        htmlFor="language-switch">
        <Translate className="w-5 h-5" size={20} weight="fill" />
        <span className="sr-only">
          {isSpanish ? 'Switch to English' : 'Cambiar a Español'}
        </span>
      </label>
    </div>
  );
}

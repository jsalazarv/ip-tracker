import useTheme from '@common/hooks/useTheme';
import { MoonStars, Sun } from '@phosphor-icons/react';

export default function ThemeToggle() {
  const { toggleTheme, isLight } = useTheme();

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        defaultChecked={isLight}
        onClick={toggleTheme}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-[35px] h-[35px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        htmlFor="light-switch">
        <Sun className="w-5 h-5 dark:hidden" size={20} weight="fill" />
        <MoonStars
          className="w-5 h-5 hidden dark:block"
          size={20}
          weight="fill"
        />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}

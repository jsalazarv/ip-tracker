import ThemeToggle from '@common/components/ThemeToggle';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

export const Header = () => {
  return (
    <header
      className={`z-20 w-full max-w-[1072px] mx-auto bg-white-600 p-5 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 transition-all`}>
      <div className="flex items-center justify-between h-16 w-full">
        <div className="flex gap-3 items-center justify-between w-full">
          <div className="flex items-center justify-center gap-1">
            <img
              className="rounded-full w-[35px] h-[35px] grayscale"
              src="https://avatars.githubusercontent.com/u/20529328?s=96&v=4"
              alt="Me"
            />
            <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">
              Juan Salazar
            </span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <a
              className="flex items-center justify-center cursor-pointer w-[35px] h-[35px]  bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
              href="https://github.com/jsalazarv"
              target="_blank"
              rel="noreferrer">
              <GithubLogo size={20} weight="fill" />
            </a>
            <a
              className="flex items-center justify-center cursor-pointer w-[35px] h-[35px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
              href="https://www.linkedin.com/in/jsalazarv/"
              target="_blank"
              rel="noreferrer">
              <LinkedinLogo size={20} weight="fill" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

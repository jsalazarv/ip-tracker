import { useState, useEffect } from 'react';

type AccordionProps = {
  children: React.ReactNode;
  title: string;
  id: string;
  active?: boolean;
  className?: string;
  location?: {
    city: string;
    country: string;
    flag_emoji: string;
    latitude: number;
    longitude: number;
  };
  onClick?: () => void;
};

export default function Accordion({
  children,
  title,
  id,
  active = false,
  className,
  location,
  onClick,
}: AccordionProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, [active]);

  return (
    <div
      className={
        className ||
        'text-sm odd:bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800/80 dark:to-slate-900 rounded-lg'
      }>
      <h3>
        <button
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
            onClick?.();
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}>
          <div className="flex relative w-full">
            <div className="grid grid-cols-2 flex-1 gap-4">
              <div>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  IP Address:
                </span>
                <p className="font-medium text-sm">{title}</p>
              </div>
              {location && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Location:
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {location.flag_emoji} {location.city}, {location.country}
                  </p>
                </div>
              )}
            </div>
            <svg
              className="absolute right-0 top-0 fill-slate-400 dark:fill-slate-500 shrink-0"
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                y="5"
                width="12"
                height="2"
                rx="1"
                className={`transform origin-center transition duration-200 ease-out ${
                  accordionOpen && '!rotate-180'
                }`}
              />
              <rect
                y="5"
                width="12"
                height="2"
                rx="1"
                transform="rotate(90 6 6)"
                className={`transform origin-center transition duration-200 ease-out ${
                  accordionOpen && '!rotate-180'
                }`}
              />
            </svg>
          </div>
        </button>
      </h3>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

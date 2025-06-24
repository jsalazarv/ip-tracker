import { Dialog, Transition } from '@headlessui/react';
import { Info, X } from '@phosphor-icons/react';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center justify-center cursor-pointer w-[35px] h-[35px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full">
        <Info className="w-5 h-5" size={20} weight="fill" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {t('projectInfo.title')}
                  </Dialog.Title>

                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <X size={20} weight="bold" />
                  </button>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('projectInfo.description')}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {t('projectInfo.requirements.title')}:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>{t('projectInfo.requirements.responsive')}</li>
                      <li>{t('projectInfo.requirements.frontend')}</li>
                      <li>{t('projectInfo.requirements.database')}</li>
                      <li>{t('projectInfo.requirements.solution')}</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {t('projectInfo.features.title')}:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>{t('projectInfo.features.search')}</li>
                      <li>{t('projectInfo.features.table')}</li>
                      <li>{t('projectInfo.features.filter')}</li>
                      <li>{t('projectInfo.features.delete')}</li>
                      <li>{t('projectInfo.features.duplicate')}</li>
                      <li>{t('projectInfo.features.data')}</li>
                      <li>{t('projectInfo.features.map')}</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {t('projectInfo.tech.title')}:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>{t('projectInfo.tech.frontend')}</li>
                      <li>{t('projectInfo.tech.styles')}</li>
                      <li>{t('projectInfo.tech.database')}</li>
                      <li>{t('projectInfo.tech.api')}</li>
                      <li>{t('projectInfo.tech.map')}</li>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { useTranslation } from 'react-i18next';

export default function useLanguage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLanguage);
  };

  const isSpanish = currentLanguage === 'es';

  return { toggleLanguage, isSpanish };
}

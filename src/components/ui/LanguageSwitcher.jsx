import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir(lng); // Set RTL/LTR direction
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-800/90 backdrop-blur-sm p-2 rounded-full border border-white/10 shadow-lg">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        العربية
      </button>
      <button
        onClick={() => changeLanguage('am')}
        className={`px-3 py-1 text-xs rounded-full ${i18n.language === 'am' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
      >
        አማ
      </button>
    </div>
  );
};

export default LanguageSwitcher;
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import GlassCard from '../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Loader2 } from 'lucide-react';
import api from '../utils/settingsApi'; // separate API instance for settings

const Settings = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currency: 'USD',
    language: 'en',
    notifications: true,
    weeklyReports: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

const fetchProfile = async () => {
  try {
    // Try these endpoints instead:
    const { data } = await api.get('/auth/me'); // or '/users/me', '/profile', '/user'
    setFormData({
      ...formData,
      name: data.name,
      email: data.email,
      currency: data.currency || 'USD',
      language: data.language || 'en',
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};


  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
     await api.put('/users/me', {
  name: formData.name,
  email: formData.email,
  currency: formData.currency,
  language: formData.language,
});

      setShowSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 relative">
      <AnimatedHeader text={t('settings.title')} />

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50"
          >
            <div className="bg-green-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-green-400/30">
              <CheckCircle className="h-5 w-5" />
              <span>{t('settings.successMessage')}</span>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-white/80 hover:text-white ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Profile Settings Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('settings.profileSettings')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  {t('settings.fullName')}
                </label>
                <motion.input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  {t('settings.email')}
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-300">
                  {t('settings.currency')}
                </label>
                <motion.select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                >
                  <option value="USD">{t('currencies.usd')}</option>
                  <option value="EUR">{t('currencies.eur')}</option>
                  <option value="GBP">{t('currencies.gbp')}</option>
                  <option value="JPY">{t('currencies.jpy')}</option>
                </motion.select>
              </div>

              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-300">
                  {t('settings.language')}
                </label>
                <motion.select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
                >
                  <option value="en">{t('languages.en')}</option>
                  <option value="es">{t('languages.es')}</option>
                  <option value="fr">{t('languages.fr')}</option>
                  <option value="de">{t('languages.de')}</option>
                </motion.select>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('settings.notifications')}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    {t('settings.enableNotifications')}
                  </label>
                  <p className="text-xs text-gray-400">{t('settings.notificationsDescription')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    {t('settings.weeklyReports')}
                  </label>
                  <p className="text-xs text-gray-400">{t('settings.weeklyReportsDescription')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="weeklyReports"
                    checked={formData.weeklyReports}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6 flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSaving}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('settings.saving')}
                </>
              ) : (
                t('settings.saveChanges')
              )}
            </motion.button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default Settings;

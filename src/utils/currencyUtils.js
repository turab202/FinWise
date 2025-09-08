// utils/currencyUtils.js
export const getCurrencySettings = (language) => {
  const lang = language.split('-')[0]; // Get base language code
  const settings = {
    'en': { locale: 'en-US', currency: 'USD', symbol: '$', dir: 'ltr' },
    'ar': { locale: 'ar-SA', currency: 'SAR', symbol: 'ر.س', dir: 'rtl' },
    'am': { locale: 'am-ET', currency: 'ETB', symbol: 'ብር', dir: 'ltr' },
    'es': { locale: 'es-ES', currency: 'EUR', symbol: '€', dir: 'ltr' },
    'fr': { locale: 'fr-FR', currency: 'EUR', symbol: '€', dir: 'ltr' },
    'de': { locale: 'de-DE', currency: 'EUR', symbol: '€', dir: 'ltr' }
  };

  return settings[lang] || settings.en;
};

export const formatCurrency = (value, language) => {
  const { locale, currency, symbol } = getCurrencySettings(language);
  
  try {
    // Special handling for Ethiopian Birr
    if (currency === 'ETB') {
      return new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value) + ' ብር';
    }

    // Try standard currency formatting
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return formatter.format(value);
  } catch (error) {
    console.warn(`Currency formatting failed for ${currency}. Using fallback.`);
    // Fallback to symbol + formatted number
    return symbol + ' ' + new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
};
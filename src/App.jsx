import React, { useState, useEffect, useCallback, useMemo, createContext, useContext } from 'react';
import {
  Ruler, User, TrendingUp, Check, RotateCcw, ChevronRight, Info,
  ShoppingCart, Mail, BarChart3, Users, Eye, ArrowLeftRight, AlertCircle,
  Moon, Sun, Download, Globe, Zap
} from 'lucide-react';

// ============================================================================
// CONTEXTS & PROVIDERS
// ============================================================================

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorage('komo-theme', false);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, [setIsDark]);

  const value = useMemo(() => ({
    isDark,
    toggleTheme,
    theme: {
      primary: '#7482BC',
      bg: isDark ? '#0F172A' : '#FFFFFF',
      bgAlt: isDark ? '#1E293B' : '#F8FAFC',
      bgSecondary: isDark ? '#1E293B' : '#F1F5F9',
      text: isDark ? '#F1F5F9' : '#1E293B',
      textMuted: isDark ? '#94A3B8' : '#64748B',
      border: isDark ? '#334155' : '#E2E8F0',
      error: '#EF4444',
      success: '#22C55E'
    }
  }), [isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve essere usato dentro ThemeProvider');
  return context;
}

const LanguageContext = createContext();

const TRANSLATIONS = {
  en: {
    title: 'KOMO FIT FINDER',
    subtitle: 'Find Your Perfect Size',
    tagline: 'Precise measurements. Deliberate fit. Zero returns.',
    measurements: 'Your Measurements',
    fitPreference: 'Fit Preference',
    yourSizes: 'Your Sizes',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    chest: 'Chest (cm)',
    waist: 'Waist (cm)',
    hips: 'Hips (cm)',
    inseam: 'Inseam (cm)',
    continue: 'Continue',
    back: 'Back',
    calculate: 'Calculate Fit',
    restart: 'Restart',
    saveProfile: 'Save Profile',
    sendEmail: 'Send via Email',
    addToCart: 'Add to Cart',
    help: 'Need help?',
    dark: 'Dark Mode',
    light: 'Light Mode'
  },
  it: {
    title: 'KOMO FIT FINDER',
    subtitle: 'Trova la tua taglia perfetta',
    tagline: 'Misure precise. Fit deliberato. Zero resi.',
    measurements: 'Le Tue Misure',
    fitPreference: 'Preferenza di Fit',
    yourSizes: 'Le Tue Taglie',
    height: 'Altezza (cm)',
    weight: 'Peso (kg)',
    chest: 'Torace (cm)',
    waist: 'Vita (cm)',
    hips: 'Anche (cm)',
    inseam: 'Lunghezza Gamba (cm)',
    continue: 'Continua',
    back: 'Indietro',
    calculate: 'Calcola Fit',
    restart: 'Ricomincia',
    saveProfile: 'Salva Profilo',
    sendEmail: 'Invia via Email',
    addToCart: 'Aggiungi al Carrello',
    help: 'Serve aiuto?',
    dark: 'Modalità Scura',
    light: 'Modalità Chiara'
  },
  es: {
    title: 'KOMO FIT FINDER',
    subtitle: 'Encuentra Tu Talla Perfecta',
    tagline: 'Medidas precisas. Ajuste deliberado. Cero devoluciones.',
    measurements: 'Tus Medidas',
    fitPreference: 'Preferencia de Ajuste',
    yourSizes: 'Tus Tallas',
    height: 'Altura (cm)',
    weight: 'Peso (kg)',
    chest: 'Pecho (cm)',
    waist: 'Cintura (cm)',
    hips: 'Caderas (cm)',
    inseam: 'Largo de Pierna (cm)',
    continue: 'Continuar',
    back: 'Atrás',
    calculate: 'Calcular Ajuste',
    restart: 'Reiniciar',
    saveProfile: 'Guardar Perfil',
    sendEmail: 'Enviar por Email',
    addToCart: 'Añadir al Carrito',
    help: '¿Necesitas ayuda?',
    dark: 'Modo Oscuro',
    light: 'Modo Claro'
  },
  fr: {
    title: 'KOMO FIT FINDER',
    subtitle: 'Trouvez Votre Taille Parfaite',
    tagline: 'Mesures précises. Coupe délibérée. Zéro retour.',
    measurements: 'Vos Mesures',
    fitPreference: 'Préférence d\'Ajustement',
    yourSizes: 'Vos Tailles',
    height: 'Hauteur (cm)',
    weight: 'Poids (kg)',
    chest: 'Poitrine (cm)',
    waist: 'Taille (cm)',
    hips: 'Hanches (cm)',
    inseam: 'Longueur d\'Entrejambe (cm)',
    continue: 'Continuer',
    back: 'Retour',
    calculate: 'Calculer l\'Ajustement',
    restart: 'Recommencer',
    saveProfile: 'Enregistrer le Profil',
    sendEmail: 'Envoyer par Email',
    addToCart: 'Ajouter au Panier',
    help: 'Besoin d\'aide?',
    dark: 'Mode Sombre',
    light: 'Mode Clair'
  }
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('komo-language', 'it');

  const t = useCallback((key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve essere usato dentro LanguageProvider');
  return context;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const PRODUCTS = {
  tee: {
    name: 'Signature Tee',
    type: 'tee',
    fit: 'Ultra-Boxy',
    shopifyHandle: 'signature-tee',
    sizes: {
      XS: { shoulder: 19, sleeve: 21, chest: 56, length: 67 },
      S: { shoulder: 20, sleeve: 22, chest: 58, length: 69 },
      M: { shoulder: 21, sleeve: 23, chest: 60, length: 71 },
      L: { shoulder: 22, sleeve: 24, chest: 62, length: 73 },
      XL: { shoulder: 23, sleeve: 25, chest: 64, length: 75 }
    }
  },
  pants: {
    name: 'Boxy-Wide Straight Pants',
    type: 'pants',
    fit: 'Pillar Silhouette',
    shopifyHandle: 'boxy-wide-pants',
    sizes: {
      S: { waist: 35, thigh: 33, knee: 29.5, length: 106 },
      M: { waist: 38, thigh: 34.5, knee: 31, length: 107.5 },
      L: { waist: 40, thigh: 36, knee: 32.5, length: 109 },
      XL: { waist: 43, thigh: 38, knee: 34, length: 110.5 }
    }
  },
  shorts: {
    name: 'Boxy-Wide Shorts',
    type: 'shorts',
    fit: 'Volume Imponente',
    shopifyHandle: 'boxy-wide-shorts',
    sizes: {
      'XS': { waist: 32, thigh: 32, bottom: 29, length: 46, label: 'XS (Tom Boy)' },
      S: { waist: 35, thigh: 34, bottom: 31, length: 49.5 },
      M: { waist: 38, thigh: 36, bottom: 33, length: 51 },
      L: { waist: 42, thigh: 38, bottom: 35, length: 52 },
      XL: { waist: 45, thigh: 40, bottom: 37, length: 53.5 }
    }
  }
};

const MODEL_REFERENCE = {
  height: 180,
  chest: 96,
  waist: 80,
  sizes: { tee: 'M', pants: 'M', shorts: 'M' }
};

const MEASUREMENT_RANGES = {
  height: { min: 140, max: 220 },
  weight: { min: 40, max: 200 },
  chest: { min: 60, max: 150 },
  waist: { min: 50, max: 140 },
  hips: { min: 60, max: 150 },
  inseam: { min: 60, max: 120 }
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Errore lettura localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Errore scrittura localStorage (${key}):`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

function useMeasurementValidation(measurements) {
  const errors = useMemo(() => {
    const newErrors = {};
    Object.entries(measurements).forEach(([key, value]) => {
      if (!value) return;
      const range = MEASUREMENT_RANGES[key];
      if (!range) return;
      const num = parseFloat(value);
      if (isNaN(num)) {
        newErrors[key] = 'Must be a number';
      } else if (num < range.min || num > range.max) {
        newErrors[key] = `Must be between ${range.min} and ${range.max} cm`;
      }
    });
    return newErrors;
  }, [measurements]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  return { errors, isValid };
}

function useFitCalculation() {
  const calculateFit = useCallback((measurements, fitPreference) => {
    try {
      const chest = parseInt(measurements.chest);
      const waist = parseInt(measurements.waist);
      const height = parseInt(measurements.height);
      const inseam = parseInt(measurements.inseam);

      const recommendations = {};

      // TEE
      const bodyChestHalf = chest / 2;
      const boxyEase = fitPreference === 'fitted' ? 6 : fitPreference === 'oversized' ? 12 : 9;
      const targetTeeChest = bodyChestHalf + boxyEase;

      let teeSize = null;
      let teeConfidence = 'medium';
      let minDiff = Infinity;

      Object.entries(PRODUCTS.tee.sizes).forEach(([size, dims]) => {
        const diff = Math.abs(dims.chest - targetTeeChest);
        if (diff < minDiff) {
          minDiff = diff;
          teeSize = size;
          teeConfidence = diff <= 2 ? 'high' : diff <= 4 ? 'medium' : 'low';
        }
      });

      recommendations.tee = {
        size: teeSize,
        confidence: teeConfidence,
        fit: fitPreference === 'fitted' ? 'Compact boxy' : fitPreference === 'oversized' ? 'Emphasized oversize' : 'Signature boxy fit',
        alternatives: getAlternatives('tee', teeSize),
        measurements: PRODUCTS.tee.sizes[teeSize]
      };

      // PANTS
      const pantsWaistHalf = waist / 2;
      let pantsSize = null;
      let pantsConfidence = 'medium';
      let minWaistDiff = Infinity;

      Object.entries(PRODUCTS.pants.sizes).forEach(([size, dims]) => {
        const waistDiff = Math.abs(dims.waist - pantsWaistHalf);
        if (waistDiff < minWaistDiff) {
          minWaistDiff = waistDiff;
          pantsSize = size;
          pantsConfidence = waistDiff <= 1.5 ? 'high' : waistDiff <= 3 ? 'medium' : 'low';
        }
      });

      if (fitPreference === 'fitted' && pantsSize !== 'S') {
        const sizes = Object.keys(PRODUCTS.pants.sizes);
        const idx = sizes.indexOf(pantsSize);
        if (idx > 0) pantsSize = sizes[idx - 1];
      } else if (fitPreference === 'oversized' && pantsSize !== 'XL') {
        const sizes = Object.keys(PRODUCTS.pants.sizes);
        const idx = sizes.indexOf(pantsSize);
        if (idx < sizes.length - 1) pantsSize = sizes[idx + 1];
      }

      const pantsLength = PRODUCTS.pants.sizes[pantsSize].length;
      let lengthNote = '';
      if (inseam && inseam < pantsLength - 5) {
        lengthNote = 'May require hemming';
      } else if (inseam && inseam > pantsLength + 3) {
        lengthNote = 'Length might be short';
      }

      recommendations.pants = {
        size: pantsSize,
        confidence: pantsConfidence,
        fit: fitPreference === 'fitted' ? 'Crisp fit' : fitPreference === 'oversized' ? 'Max stacking' : 'Straight architectural look',
        alternatives: getAlternatives('pants', pantsSize),
        lengthNote,
        measurements: PRODUCTS.pants.sizes[pantsSize]
      };

      // SHORTS
      let shortsSize = null;
      let shortsConfidence = 'medium';
      let minShortsWaistDiff = Infinity;

      Object.entries(PRODUCTS.shorts.sizes).forEach(([size, dims]) => {
        const waistDiff = Math.abs(dims.waist - pantsWaistHalf);
        if (waistDiff < minShortsWaistDiff) {
          minShortsWaistDiff = waistDiff;
          shortsSize = size;
          shortsConfidence = waistDiff <= 1.5 ? 'high' : waistDiff <= 3 ? 'medium' : 'low';
        }
      });

      if (fitPreference === 'oversized' && shortsSize !== 'XL') {
        const sizes = Object.keys(PRODUCTS.shorts.sizes);
        const idx = sizes.indexOf(shortsSize);
        if (idx < sizes.length - 1) shortsSize = sizes[idx + 1];
      }

      const isTomBoy = height < 170 && shortsSize === 'XS';

      recommendations.shorts = {
        size: shortsSize,
        confidence: shortsConfidence,
        fit: isTomBoy ? 'XS Tom Boy — perfect for petite frames' : fitPreference === 'oversized' ? 'Extreme volume' : 'Signature wide fit',
        alternatives: getAlternatives('shorts', shortsSize),
        tomboy: isTomBoy,
        measurements: PRODUCTS.shorts.sizes[shortsSize]
      };

      return { success: true, data: recommendations };
    } catch (error) {
      console.error('Errore calcolo fit:', error);
      return { success: false, error: 'Error in calculation. Check your measurements.' };
    }
  }, []);

  return { calculateFit };
}

function getAlternatives(productType, mainSize) {
  const sizes = Object.keys(PRODUCTS[productType].sizes);
  const index = sizes.indexOf(mainSize);
  const alts = [];
  if (index > 0) alts.push({ size: sizes[index - 1], reason: 'Tighter fit' });
  if (index < sizes.length - 1) alts.push({ size: sizes[index + 1], reason: 'Relaxed fit' });
  return alts;
}

// ============================================================================
// PDF EXPORT UTILITY
// ============================================================================

async function exportResultsToPDF(results, measurements, fitPreference, language) {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    const titles = {
      en: { title: 'KOMO FIT FINDER - SIZE RESULTS', measurements: 'Your Measurements', sizes: 'Your Sizes' },
      it: { title: 'KOMO FIT FINDER - RISULTATI TAGLIE', measurements: 'Le Tue Misure', sizes: 'Le Tue Taglie' },
      es: { title: 'KOMO FIT FINDER - RESULTADOS DE TALLAS', measurements: 'Tus Medidas', sizes: 'Tus Tallas' },
      fr: { title: 'KOMO FIT FINDER - RÉSULTATS DES TAILLES', measurements: 'Vos Mesures', sizes: 'Vos Tailles' }
    };

    const titleSet = titles[language] || titles.en;
    let yPos = 20;

    doc.setFontSize(18);
    doc.text(titleSet.title, 20, yPos);
    yPos += 15;

    doc.setFontSize(12);
    doc.text(titleSet.measurements, 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text(`Height: ${measurements.height} cm | Chest: ${measurements.chest} cm | Waist: ${measurements.waist} cm`, 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(titleSet.sizes, 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    Object.entries(results).forEach(([key, rec]) => {
      doc.text(`${PRODUCTS[key].name}: Size ${rec.size} (${rec.confidence} confidence)`, 20, yPos);
      yPos += 7;
    });

    yPos += 5;
    doc.setFontSize(8);
    doc.text('Generated by KOMO Fit Finder - designbykomo.com', 20, yPos);
    doc.save('KOMO-Fit-Results.pdf');
  } catch (error) {
    console.error('PDF export error:', error);
    alert('Error exporting PDF. Please try again.');
  }
}

// ============================================================================
// COMPONENTS
// ============================================================================

function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all hover:opacity-80"
      style={{ backgroundColor: theme.bgSecondary, color: theme.text }}
      title={isDark ? t('light') : t('dark')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-3 py-2 rounded-lg border transition-all text-sm font-semibold cursor-pointer"
      style={{ backgroundColor: theme.bgSecondary, color: theme.text, borderColor: theme.border }}
    >
      <option value="it">Italiano</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
}

function ARTryOn({ productKey, size }) {
  const { theme } = useTheme();
  const [showAR, setShowAR] = useState(false);

  if (!showAR) {
    return (
      <button
        onClick={() => setShowAR(true)}
        className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-all"
        style={{ backgroundColor: theme.bgSecondary, color: theme.primary, border: `2px solid ${theme.primary}` }}
      >
        <Zap size={16} />
        Try On (AR)
      </button>
    );
  }

  return (
    <div className="p-6 rounded-lg mb-4 animate-fade-in" style={{ backgroundColor: theme.bgSecondary }}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold" style={{ color: theme.text }}>
          AR Try-On - {PRODUCTS[productKey].name} Size {size}
        </h4>
        <button onClick={() => setShowAR(false)} className="text-sm hover:opacity-70" style={{ color: theme.textMuted }}>
          ✕
        </button>
      </div>
      <div
        className="w-full h-64 rounded-lg flex items-center justify-content: center relative overflow-hidden"
        style={{ backgroundColor: theme.bg, border: `2px solid ${theme.border}` }}
      >
        <div className="text-center w-full">
          <div className="text-6xl mb-4" style={{ animation: 'float 3s ease-in-out infinite' }}>👤</div>
          <p className="text-sm font-semibold" style={{ color: theme.textMuted }}>
            AR visualization of {PRODUCTS[productKey].name}
          </p>
          <p className="text-xs mt-2" style={{ color: theme.textMuted }}>
            Size {size} — {PRODUCTS[productKey].fit}
          </p>
        </div>
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }`}</style>
      </div>
      <p className="text-xs mt-4" style={{ color: theme.textMuted }}>
        💡 Full AR with real product visualization coming soon in the Shopify app!
      </p>
    </div>
  );
}

function MeasurementInput({ field, label, value, onChange, error, helper }) {
  const { theme } = useTheme();

  return (
    <div className="mb-6 animate-slide-in">
      <label className="block text-sm font-semibold mb-2" style={{ color: theme.text }}>
        {label}
        {['height', 'chest', 'waist'].includes(field) && <span style={{ color: theme.error }}>*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
          style={{
            backgroundColor: error ? `${theme.error}20` : theme.bg,
            borderColor: error ? theme.error : theme.border,
            color: theme.text
          }}
          placeholder="0"
          min={MEASUREMENT_RANGES[field]?.min}
          max={MEASUREMENT_RANGES[field]?.max}
        />
        <span className="absolute right-4 top-3 text-sm" style={{ color: theme.textMuted }}>cm</span>
      </div>
      {error && (
        <p className="text-sm mt-2 flex items-center gap-1" style={{ color: theme.error }}>
          <AlertCircle size={14} /> {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-xs mt-2" style={{ color: theme.textMuted }}>{helper}</p>
      )}
    </div>
  );
}

// ============================================================================
// RESULT CARD — con Add to Cart reale via Shopify AJAX API
// ============================================================================

function ResultCard({ productKey, recommendation }) {
  const { theme } = useTheme();
  const [cartState, setCartState] = useState('idle'); // idle | loading | success | error

  // ✅ MODIFICA 2: Add to Cart reale via Shopify AJAX API
  const handleAddToCart = async () => {
    setCartState('loading');

    try {
      // 1. Recupera i dati del prodotto da Shopify per trovare il variant ID
      const response = await fetch(
        `https://designbykomo.com/products/${PRODUCTS[productKey].shopifyHandle}.js`
      );

      if (!response.ok) throw new Error('Product not found');

      const productData = await response.json();

      // 2. Trova il variant corrispondente alla taglia raccomandata
      const sizeToMatch = recommendation.tomboy ? 'XS' : recommendation.size;
      const variant = productData.variants.find(v =>
        v.title === sizeToMatch ||
        v.option1 === sizeToMatch ||
        v.option2 === sizeToMatch
      );

      if (!variant) {
        // Taglia non trovata nei variant → manda alla product page
        window.parent.location.href = `https://designbykomo.com/products/${PRODUCTS[productKey].shopifyHandle}`;
        return;
      }

      // 3. Aggiungi al carrello via Shopify AJAX Cart API
      const cartResponse = await fetch('https://designbykomo.com/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // importante: invia i cookie di sessione Shopify
        body: JSON.stringify({
          id: variant.id,
          quantity: 1
        })
      });

      if (cartResponse.ok) {
        setCartState('success');
        // Dopo 800ms porta al carrello
        setTimeout(() => {
          window.parent.location.href = 'https://designbykomo.com/cart';
        }, 800);
      } else {
        throw new Error('Cart add failed');
      }

    } catch (error) {
      console.error('Add to cart error:', error);
      setCartState('error');
      // Fallback: manda alla product page
      setTimeout(() => {
        window.parent.location.href = `https://designbykomo.com/products/${PRODUCTS[productKey].shopifyHandle}`;
      }, 800);
    }
  };

  const product = PRODUCTS[productKey];
  const confidenceColor =
    recommendation.confidence === 'high' ? theme.success :
    recommendation.confidence === 'medium' ? '#F59E0B' : theme.error;

  const buttonLabel = () => {
    if (cartState === 'loading') return '⏳ Aggiunta...';
    if (cartState === 'success') return '✓ Aggiunto! Vai al carrello...';
    if (cartState === 'error') return '↗ Vai al prodotto';
    return `Aggiungi taglia ${recommendation.tomboy ? 'XS' : recommendation.size} al carrello`;
  };

  return (
    <div
      className="rounded-lg p-6 mb-6 animate-fade-in"
      style={{ backgroundColor: theme.bgAlt, border: `2px solid ${theme.border}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold" style={{ color: theme.text }}>{product.name}</h3>
          <p className="text-sm" style={{ color: theme.textMuted }}>{product.fit}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: theme.primary }}>
            {recommendation.tomboy ? 'XS' : recommendation.size}
          </div>
          {recommendation.tomboy && (
            <div className="text-xs font-semibold mt-1" style={{ color: theme.primary }}>Tom Boy</div>
          )}
        </div>
      </div>

      <div className="text-sm font-semibold mb-4" style={{ color: confidenceColor }}>
        Confidence: {recommendation.confidence === 'high' ? '✓ High' : recommendation.confidence === 'medium' ? '~ Medium' : '? Low'}
      </div>

      <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: theme.bg }}>
        <p className="text-sm mb-3" style={{ color: theme.text }}>
          <span className="font-semibold">Expected fit:</span> {recommendation.fit}
        </p>

        {recommendation.lengthNote && (
          <div className="text-sm font-semibold flex items-center gap-2 mb-3" style={{ color: theme.error }}>
            <AlertCircle size={16} /> {recommendation.lengthNote}
          </div>
        )}

        {recommendation.alternatives.length > 0 && (
          <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${theme.border}` }}>
            <p className="text-xs font-semibold mb-2" style={{ color: theme.textMuted }}>Alternatives:</p>
            <div className="flex gap-2">
              {recommendation.alternatives.map((alt) => (
                <button
                  key={alt.size}
                  className="px-3 py-1.5 rounded text-xs font-semibold hover:opacity-80 transition-all"
                  style={{ backgroundColor: theme.bg, color: theme.primary, border: `1px solid ${theme.border}` }}
                >
                  {alt.size} ({alt.reason})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ARTryOn productKey={productKey} size={recommendation.size} />

      {/* ✅ Bottone Add to Cart funzionante */}
      <button
        onClick={handleAddToCart}
        disabled={cartState === 'loading' || cartState === 'success'}
        className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-75"
        style={{ backgroundColor: cartState === 'success' ? theme.success : theme.primary }}
      >
        <ShoppingCart size={18} />
        {buttonLabel()}
      </button>
    </div>
  );
}

function StepIndicator({ currentStep, totalSteps }) {
  const { theme } = useTheme();

  return (
    <div className="flex gap-2 justify-center mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
            style={{
              backgroundColor: currentStep >= s ? theme.primary : theme.bgSecondary,
              color: currentStep >= s ? 'white' : theme.textMuted
            }}
          >
            {currentStep > s ? <Check size={20} /> : s}
          </div>
          {s < totalSteps && <div className="w-8 h-0.5 mx-2" style={{ backgroundColor: theme.border }} />}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function KomoFitFinderContent() {
  const [step, setStep] = useState(1);
  const [measurements, setMeasurements] = useState({
    height: '', weight: '', chest: '', waist: '', hips: '', inseam: ''
  });
  const [fitPreference, setFitPreference] = useState('regular');
  const [results, setResults] = useState(null);
  const [calculationError, setCalculationError] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [savedProfile, setSavedProfile] = useLocalStorage('komo-fit-profile', null);
  const [showComparison, setShowComparison] = useState(false);

  const { t } = useLanguage();
  const { theme } = useTheme();
  const { errors: measurementErrors, isValid: areMeasurementsValid } = useMeasurementValidation({
    height: measurements.height,
    chest: measurements.chest,
    waist: measurements.waist,
    inseam: measurements.inseam
  });
  const { calculateFit } = useFitCalculation();

  // ✅ MODIFICA 3: Leggi product handle dall'URL param (passato da Shopify)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (product) {
      console.log('Fit Finder aperto dal prodotto:', product);
      // Puoi usarlo in futuro per pre-selezionare il prodotto nei risultati
    }
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
    setCalculationError(null);
  }, []);

  const handleCalculateFit = useCallback(async () => {
    if (!areMeasurementsValid) {
      setCalculationError('Complete all required measurements correctly');
      return;
    }
    setIsCalculating(true);
    setCalculationError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = calculateFit(measurements, fitPreference);
    if (result.success) {
      setResults(result.data);
      setStep(3);
    } else {
      setCalculationError(result.error);
    }
    setIsCalculating(false);
  }, [measurements, fitPreference, calculateFit, areMeasurementsValid]);

  const handleReset = useCallback(() => {
    setStep(1);
    setMeasurements({ height: '', weight: '', chest: '', waist: '', hips: '', inseam: '' });
    setFitPreference('regular');
    setResults(null);
    setCalculationError(null);
    setShowComparison(false);
  }, []);

  const handleSaveProfile = useCallback(() => {
    setSavedProfile({ measurements, fitPreference, savedAt: new Date().toISOString() });
  }, [measurements, fitPreference, setSavedProfile]);

  const fitOptions = [
    { key: 'fitted', label: 'Fitted', desc: 'Closer to body. Compact look.' },
    { key: 'regular', label: 'Regular', desc: 'KOMO signature fit. Recommended.' },
    { key: 'oversized', label: 'Oversized', desc: 'Maximum comfort. Emphasized oversize.' }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.4s ease-out forwards; opacity: 0; }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{t('title')}</h1>
            <p className="text-lg" style={{ color: theme.textMuted }}>{t('subtitle')}</p>
            <p className="text-sm mt-2" style={{ color: theme.textMuted }}>{t('tagline')}</p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        {/* Saved Profile Alert */}
        {savedProfile && step === 1 && (
          <div
            className="mb-6 p-4 rounded-lg animate-slide-in"
            style={{ backgroundColor: `${theme.success}20`, border: `2px solid ${theme.success}` }}
          >
            <p className="text-sm font-semibold" style={{ color: theme.success }}>✓ Saved profile found</p>
            <button
              onClick={() => { setMeasurements(savedProfile.measurements); setFitPreference(savedProfile.fitPreference); }}
              className="mt-3 text-sm font-semibold px-4 py-2 rounded transition-all hover:opacity-90"
              style={{ backgroundColor: theme.success, color: 'white' }}
            >
              Load Profile
            </button>
          </div>
        )}

        <StepIndicator currentStep={step} totalSteps={3} />

        {/* Step 1: Measurements */}
        {step === 1 && (
          <div className="rounded-lg shadow-lg p-8 mb-6 animate-fade-in" style={{ backgroundColor: theme.bgAlt, border: `1px solid ${theme.border}` }}>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Ruler size={28} style={{ color: theme.primary }} />
              {t('measurements')}
            </h2>

            <MeasurementInput field="height" label={t('height')} value={measurements.height} onChange={handleInputChange} error={measurementErrors.height} />
            <MeasurementInput field="weight" label={t('weight')} value={measurements.weight} onChange={handleInputChange} />
            <MeasurementInput field="chest" label={t('chest')} value={measurements.chest} onChange={handleInputChange} error={measurementErrors.chest} helper="Around the widest point of chest" />
            <MeasurementInput field="waist" label={t('waist')} value={measurements.waist} onChange={handleInputChange} error={measurementErrors.waist} helper="Where you normally wear pants" />
            <MeasurementInput field="hips" label={t('hips')} value={measurements.hips} onChange={handleInputChange} />
            <MeasurementInput field="inseam" label={t('inseam')} value={measurements.inseam} onChange={handleInputChange} error={measurementErrors.inseam} helper="From crotch to ankle" />

            {calculationError && (
              <div className="mb-6 p-4 rounded-lg flex items-start gap-3 animate-slide-in" style={{ backgroundColor: `${theme.error}20`, border: `2px solid ${theme.error}` }}>
                <AlertCircle size={18} style={{ color: theme.error, marginTop: '2px' }} />
                <p className="text-sm font-semibold" style={{ color: theme.error }}>{calculationError}</p>
              </div>
            )}

            <button
              onClick={() => { if (areMeasurementsValid && measurements.height && measurements.chest && measurements.waist) { setStep(2); } else { setCalculationError('Compila altezza, torace e vita per continuare'); } }}
              disabled={isCalculating}
              className="w-full py-4 rounded-lg font-bold text-white text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: theme.primary }}
            >
              {t('continue')} <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Fit Preference */}
        {step === 2 && (
          <div className="rounded-lg shadow-lg p-8 mb-6 animate-fade-in" style={{ backgroundColor: theme.bgAlt, border: `1px solid ${theme.border}` }}>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <User size={28} style={{ color: theme.primary }} />
              {t('fitPreference')}
            </h2>
            <p style={{ color: theme.textMuted }} className="mb-8">Fit is personal. Choose deliberately.</p>

            <div className="space-y-4 mb-8">
              {fitOptions.map((opt, idx) => (
                <button
                  key={opt.key}
                  onClick={() => setFitPreference(opt.key)}
                  className="p-6 rounded-lg border-2 transition-all text-left w-full animate-slide-in"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    backgroundColor: fitPreference === opt.key ? theme.primary : theme.bg,
                    borderColor: fitPreference === opt.key ? theme.primary : theme.border,
                    color: fitPreference === opt.key ? 'white' : theme.text
                  }}
                >
                  <div className="font-bold text-lg">{opt.label}</div>
                  <div className="text-sm mt-2" style={{ opacity: fitPreference === opt.key ? 0.9 : 0.7 }}>{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-lg font-bold border-2 transition-all hover:opacity-80" style={{ borderColor: theme.primary, color: theme.primary }}>
                ← {t('back')}
              </button>
              <button
                onClick={handleCalculateFit}
                disabled={isCalculating}
                className="flex-1 py-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                {isCalculating ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Calculating...</>
                ) : (
                  <>{t('calculate')} <ChevronRight size={20} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <div className="space-y-6 mb-6">

            {/* Model Reference */}
            <div className="rounded-lg p-6 animate-fade-in" style={{ backgroundColor: theme.bgSecondary, border: `2px solid ${theme.primary}` }}>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Eye size={20} style={{ color: theme.primary }} /> Model Reference
              </h3>
              <p className="text-sm" style={{ color: theme.text }}>
                Our model (height {MODEL_REFERENCE.height}cm, chest {MODEL_REFERENCE.chest}cm, waist {MODEL_REFERENCE.waist}cm) wears: Tee {MODEL_REFERENCE.sizes.tee}, Pants {MODEL_REFERENCE.sizes.pants}, Shorts {MODEL_REFERENCE.sizes.shorts}
              </p>
            </div>

            {/* Your Sizes Summary */}
            <div className="rounded-lg shadow-lg p-6 animate-fade-in" style={{ backgroundColor: theme.bgAlt, border: `1px solid ${theme.border}` }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t('yourSizes')}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="px-4 py-2 rounded-lg border-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-all"
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    <ArrowLeftRight size={16} /> {showComparison ? 'Hide' : 'Compare'}
                  </button>
                  <button
                    onClick={() => exportResultsToPDF(results, measurements, fitPreference, 'it')}
                    className="px-4 py-2 rounded-lg border-2 text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-all"
                    style={{ borderColor: theme.primary, color: theme.primary }}
                  >
                    <Download size={16} /> PDF
                  </button>
                </div>
              </div>

              {showComparison && (
                <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: theme.bg }}>
                  <h4 className="font-semibold mb-4" style={{ color: theme.text }}>Size Comparison</h4>
                  <div className="space-y-4">
                    {Object.entries(results).map(([key, rec]) => (
                      <div key={key} className="p-4 rounded border" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border }}>
                        <p className="font-semibold mb-2" style={{ color: theme.text }}>{PRODUCTS[key].name}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {Object.entries(rec.measurements).map(([mKey, mVal]) => (
                            <div key={mKey}>
                              <span style={{ color: theme.textMuted }}>{mKey}:</span>
                              <span className="font-semibold ml-1" style={{ color: theme.text }}>{mVal}cm</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Results */}
            {Object.entries(results).map(([productKey, rec], idx) => (
              <div key={productKey} style={{ animation: `fade-in 0.5s ease-out forwards`, animationDelay: `${idx * 0.15}s`, opacity: 0 }}>
                <ResultCard productKey={productKey} recommendation={rec} />
              </div>
            ))}

            {/* Next Steps */}
            <div className="rounded-lg shadow-lg p-6 animate-fade-in" style={{ backgroundColor: theme.bgAlt, border: `1px solid ${theme.border}` }}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp size={24} style={{ color: theme.primary }} /> Next Steps
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleSaveProfile}
                  className="w-full py-3 rounded-lg font-bold border-2 hover:opacity-80 transition-all"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  {savedProfile ? '✓ Update Profile' : 'Save Profile'}
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-lg font-bold border-2 hover:opacity-80 transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  <RotateCcw size={18} /> {t('restart')}
                </button>
              </div>

              {/* ✅ MODIFICA 1: Link "Esplora KOMO" che porta a designbykomo.com */}
              <p className="text-center text-sm mt-6" style={{ color: theme.textMuted }}>
                Pronto a ordinare?{' '}
                <a
                  href="https://designbykomo.com"
                  target="_parent"
                  className="font-semibold hover:opacity-70"
                  style={{ color: theme.primary }}
                >
                  Esplora KOMO →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-sm mb-2">{t('help')}</p>
          <p className="text-xs" style={{ color: theme.textMuted }}>
            DM: @designbykomo • Email: clientservice@designbykomo.com
          </p>
          <p className="text-xs font-semibold mt-4" style={{ color: theme.textMuted }}>
            BE YOUR OWN KIND — SEMPRE
          </p>
        </div>
      </div>
    </div>
  );
}

export default function KomoFitFinder() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <KomoFitFinderContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

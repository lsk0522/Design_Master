import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark' | 'high-contrast' | 'system';
export type ColorScheme = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  brandColor?: string;
  brandTokens?: Record<string, string>;
  disableTransitions?: boolean;
  respectSystemPreference?: boolean;
}

export interface ResolvedTheme {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  cssVariables: Record<string, string>;
  brandTokens: Record<string, string>;
}

const DEFAULT_CONFIG: ThemeConfig = {
  mode: 'system',
  respectSystemPreference: true,
  disableTransitions: false,
};

const ThemeContext = createContext<{
  theme: ResolvedTheme;
  config: ThemeConfig;
  setMode: (mode: ThemeMode) => void;
  setBrandColor: (color: string) => void;
  setBrandTokens: (tokens: Record<string, string>) => void;
} | null>(null);

export function ThemeProvider({
  children,
  config: userConfig = {},
  storageKey = 'essence-theme',
  attribute = 'data-theme',
}: {
  children: ReactNode;
  config?: Partial<ThemeConfig>;
  storageKey?: string;
  attribute?: string;
}) {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...userConfig }), [userConfig]);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    getInitialTheme(config, storageKey)
  );
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback(
    (theme: ResolvedTheme) => {
      if (typeof document === 'undefined') return;

      const root = document.documentElement;

      // Apply color scheme attribute
      root.setAttribute(attribute, theme.colorScheme);

      // Apply CSS variables
      Object.entries(theme.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Apply brand tokens
      Object.entries(theme.brandTokens).forEach(([key, value]) => {
        root.style.setProperty(`--brand-${key}`, value);
      });

      // Handle transitions
      if (config.disableTransitions) {
        root.classList.add('essence-no-transitions');
      } else {
        root.classList.remove('essence-no-transitions');
      }
    },
    [attribute, config.disableTransitions]
  );

  const resolveTheme = useCallback(
    (mode: ThemeMode, brandTokens: Record<string, string> = {}): ResolvedTheme => {
      let colorScheme: ColorScheme = 'light';

      if (mode === 'system' && config.respectSystemPreference) {
        colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else if (mode === 'dark' || mode === 'high-contrast') {
        colorScheme = 'dark';
      }

      // Base CSS variables from tokens
      const cssVariables = getBaseCSSVariables(colorScheme);

      return {
        mode,
        colorScheme,
        cssVariables,
        brandTokens,
      };
    },
    [config.respectSystemPreference]
  );

  const setMode = useCallback(
    (mode: ThemeMode) => {
      const newTheme = resolveTheme(mode, resolvedTheme.brandTokens);
      setResolvedTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify({ mode }));
      }
    },
    [resolvedTheme.brandTokens, resolveTheme, storageKey]
  );

  const setBrandColor = useCallback(
    (color: string) => {
      const brandTokens = generateBrandTokens(color);
      const newTheme = resolveTheme(resolvedTheme.mode, brandTokens);
      setResolvedTheme(newTheme);
    },
    [resolvedTheme.mode, resolveTheme]
  );

  const setBrandTokens = useCallback(
    (tokens: Record<string, string>) => {
      const newTheme = resolveTheme(resolvedTheme.mode, tokens);
      setResolvedTheme(newTheme);
    },
    [resolvedTheme.mode, resolveTheme]
  );

  // Initialize on mount
  useEffect(() => {
    setMounted(true);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (resolvedTheme.mode === 'system' && config.respectSystemPreference) {
        const newTheme = resolveTheme('system', resolvedTheme.brandTokens);
        setResolvedTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme);
    }
  }, [resolvedTheme, applyTheme, mounted]);

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        theme: resolvedTheme,
        config,
        setMode,
        setBrandColor,
        setBrandTokens,
      },
    },
    children
  );
}

function getInitialTheme(config: ThemeConfig, storageKey: string): ResolvedTheme {
  if (typeof window === 'undefined') {
    return {
      mode: config.mode,
      colorScheme: 'light',
      cssVariables: getBaseCSSVariables('light'),
      brandTokens: {},
    };
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const { mode } = JSON.parse(stored);
      return {
        mode,
        colorScheme: 'light',
        cssVariables: getBaseCSSVariables('light'),
        brandTokens: {},
      };
    }
  } catch {
    // Ignore parse errors
  }

  return {
    mode: config.mode,
    colorScheme: 'light',
    cssVariables: getBaseCSSVariables('light'),
    brandTokens: {},
  };
}

function getBaseCSSVariables(colorScheme: ColorScheme): Record<string, string> {
  // These would ideally come from the tokens package
  // For now, return essential CSS variables
  const isDark = colorScheme === 'dark';

  return {
    '--color-background-primary': isDark ? '#0A0A0A' : '#FFFFFF',
    '--color-background-secondary': isDark ? '#171717' : '#F5F5F5',
    '--color-background-tertiary': isDark ? '#262626' : '#E5E5E5',
    '--color-surface-primary': isDark ? '#171717' : '#FFFFFF',
    '--color-surface-secondary': isDark ? '#262626' : '#F5F5F5',
    '--color-surface-tertiary': isDark ? '#404040' : '#E5E5E5',
    '--color-border-primary': isDark ? '#404040' : '#E5E5E5',
    '--color-border-secondary': isDark ? '#525252' : '#D4D4D4',
    '--color-text-primary': isDark ? '#FAFAFA' : '#171717',
    '--color-text-secondary': isDark ? '#A3A3A3' : '#525252',
    '--color-text-tertiary': isDark ? '#737373' : '#737373',
    '--color-primary-brand': '#2563EB',
    '--color-primary-on-brand': '#FFFFFF',
  };
}

function generateBrandTokens(brandColor: string): Record<string, string> {
  // In a real implementation, this would use a color manipulation library
  // to generate the full brand token scale from a single color
  return {
    primary: brandColor,
    'primary-hover': brandColor,
    'primary-active': brandColor,
    'primary-subtle': brandColor,
    'on-primary': '#FFFFFF',
  };
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeMode(): ThemeMode {
  const { theme } = useTheme();
  return theme.mode;
}
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

// Focus management
export function useFocusTrap(enabled = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTab);
  }, [enabled]);

  return containerRef;
}

export function useFocusRestore(enabled = true) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const save = useCallback(() => {
    if (enabled) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [enabled]);

  const restore = useCallback(() => {
    if (enabled && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [enabled]);

  return { save, restore };
}

export function useFocusRedirect(targetRef: React.RefObject<HTMLElement>, enabled = true) {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const lastElement = focusableElements[focusableElements.length - 1];

        if (document.activeElement === lastElement) {
          e.preventDefault();
          targetRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [targetRef, enabled]);
}

// Announcer for screen readers
export function useAnnouncer() {
  const [announcerRef, setAnnouncerRef] = useState<HTMLDivElement | null>(null);

  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!announcerRef) return;

      announcerRef.setAttribute('aria-live', priority);
      announcerRef.textContent = '';
      // Force reflow
      void announcerRef.offsetHeight;
      announcerRef.textContent = message;
    },
    [announcerRef]
  );

  const announcerProps = useMemo(
    () => ({
      ref: setAnnouncerRef,
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      style: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
      },
    }),
    []
  );

  return { announce, announcerProps };
}

// Keyboard navigation
export function useKeyboardNavigation(
  items: HTMLElement[],
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    onSelect?: (index: number) => void;
  } = {}
) {
  const { orientation = 'vertical', loop = true, onSelect } = options;
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;
      let newIndex = focusedIndex;

      const isHorizontal = key === 'ArrowLeft' || key === 'ArrowRight';
      const isVertical = key === 'ArrowUp' || key === 'ArrowDown';

      if (
        (orientation === 'horizontal' && isHorizontal) ||
        (orientation === 'vertical' && isVertical) ||
        (orientation === 'both' && (isHorizontal || isVertical))
      ) {
        e.preventDefault();

        const isBackward = key === 'ArrowLeft' || key === 'ArrowUp';
        const step = isBackward ? -1 : 1;

        newIndex = focusedIndex + step;

        if (newIndex < 0) {
          newIndex = loop ? items.length - 1 : 0;
        } else if (newIndex >= items.length) {
          newIndex = loop ? 0 : items.length - 1;
        }

        setFocusedIndex(newIndex);
        items[newIndex]?.focus();
      } else if (key === 'Home') {
        e.preventDefault();
        setFocusedIndex(0);
        items[0]?.focus();
      } else if (key === 'End') {
        e.preventDefault();
        const lastIndex = items.length - 1;
        setFocusedIndex(lastIndex);
        items[lastIndex]?.focus();
      } else if (key === 'Enter' || key === ' ') {
        if (onSelect && focusedIndex >= 0) {
          e.preventDefault();
          onSelect(focusedIndex);
        }
      }
    },
    [focusedIndex, items, orientation, loop, onSelect]
  );

  return { focusedIndex, setFocusedIndex, handleKeyDown };
}

// Media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: more)');
}

export function useColorScheme(): 'light' | 'dark' {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  return isDark ? 'dark' : 'light';
}

// Breakpoint hooks
export function useBreakpoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean {
  const breakpoints = {
    xs: '(min-width: 320px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };
  return useMediaQuery(breakpoints[breakpoint]);
}

// Intersection Observer
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

// Resize Observer
export function useResizeObserver(): [
  React.RefObject<HTMLDivElement>,
  { width: number; height: number }
] {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

// LocalStorage sync
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// Debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Throttle
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}

// Click outside
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Idle detection
export function useIdle(timeout: number): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), timeout);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, [timeout]);

  return idle;
}

// Copy to clipboard
export function useClipboard(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopied(false);
    }
  }, []);

  return [copied, copy];
}
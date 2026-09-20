import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const read = (): Theme =>
  (document.documentElement.dataset.theme as Theme) || 'dark';

/**
 * Reads the theme the inline script in index.html already applied, so the
 * first paint is never wrong, and writes changes back to <html> + storage.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* private mode — the in-memory value still drives this session */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  return { theme, toggle };
};

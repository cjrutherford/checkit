import { App } from './app';
import type { SpyInstance } from 'jest-mock';
import { jest } from '@jest/globals';

describe('App', () => {
  let app: App;
  let originalLocalStorage: Storage;
  let setAttributeSpy: SpyInstance;

  beforeEach(() => {
    // Mock localStorage
    originalLocalStorage = window.localStorage;
    const store: Record<string, string> = {};
    window.localStorage = {
      getItem: jest.fn((key: string) => store[key] ?? null),
      setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: jest.fn((key: string) => { delete store[key]; }),
      clear: jest.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
      key: jest.fn(),
      length: 0,
    } as any;

    // Mock document.documentElement.setAttribute
    setAttributeSpy = jest.spyOn(document.documentElement, 'setAttribute').mockImplementation();

    app = new App();
  });

  afterEach(() => {
    window.localStorage = originalLocalStorage;
    setAttributeSpy.mockRestore();
  });

  it('should initialize with the first theme and light mode', () => {
    expect(app.selectedTheme().name).toBe(app.themes[0].name);
    expect(app.themeMode()).toBe('light');
  });

  it('should toggle theme mode between light and dark', () => {
    expect(app.themeMode()).toBe('light');
    app.toggleThemeMode();
    expect(app.themeMode()).toBe('dark');
    app.toggleThemeMode();
    expect(app.themeMode()).toBe('light');
  });

  it('should set a new theme', () => {
    const newTheme = app.themes[1];
    app.setTheme(newTheme);
    expect(app.selectedTheme().name).toBe(newTheme.name);
  });

  it('should save theme settings to localStorage', () => {
    const setItem = jest.spyOn(window.localStorage, 'setItem');
    app.saveThemeSettings();
    expect(setItem).toHaveBeenCalledWith('themeMode', app.themeMode());
    expect(setItem).toHaveBeenCalledWith('themeName', app.selectedTheme().name);
  });

  it('should load theme settings from localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockImplementation((...args: unknown[]) => {
      const key = args[0] as string;
      if (key === 'themeMode') return 'dark';
      if (key === 'themeName') return app.themes[2].name;
      return null;
    });
    const newApp = new App();
    expect(newApp.themeMode()).toBe('dark');
    expect(newApp.selectedTheme().name).toBe(app.themes[2].name);
  });

  it('should apply theme and set color signals', () => {
    const palette = app.currentPalette();
    app.applyTheme();
    expect(app.background()).toBe(palette[0].code);
    expect(app.primary()).toBe(palette[1].code);
    expect(app.secondary()).toBe(palette[2].code);
    expect(app.accent()).toBe(palette[3].code);
    expect(app.text()).toBe(palette[4].code);
    expect(app.highlight()).toBe(palette[5].code);
    expect(setAttributeSpy).toHaveBeenCalledWith('data-theme-mode', app.themeMode());
  });

  it('should not throw if localStorage is empty', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    expect(() => new App()).not.toThrow();
  });

  it('should not set theme if stored theme name is not found', () => {
    (window.localStorage.getItem as jest.Mock).mockImplementation((...args: unknown[]) => {
      const key = args[0] as string;
      if (key === 'themeMode') return 'light';
      if (key === 'themeName') return 'Nonexistent Theme';
      return null;
    });
    const newApp = new App();
    expect(newApp.selectedTheme().name).toBe(newApp.themes[0].name);
  });
});
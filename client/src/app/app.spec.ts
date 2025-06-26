import { App } from './app';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, client');
  });

  it('should have default theme as "Sunny Day" and mode as "light"', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.selectedTheme().name).toBe('Sunny Day');
    expect(app.themeMode()).toBe('light');
  });

  it('should toggle theme mode between light and dark', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.themeMode()).toBe('light');
    app.toggleThemeMode();
    expect(app.themeMode()).toBe('dark');
    app.toggleThemeMode();
    expect(app.themeMode()).toBe('light');
  });

  it('should set a new theme', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const newTheme = app.themes.find(t => t.name === 'Misty Morning');
    expect(newTheme).toBeTruthy();
    app.setTheme(newTheme!);
    expect(app.selectedTheme().name).toBe('Misty Morning');
  });

  it('should apply theme and update color signals', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.selectedTheme.set(app.themes[2]); // Misty Morning
    app.themeMode.set('dark');
    app.applyTheme();
    const palette = app.themes[2].dark;
    expect(app.background()).toBe(palette[0].code);
    expect(app.primary()).toBe(palette[1].code);
    expect(app.secondary()).toBe(palette[2].code);
    expect(app.accent()).toBe(palette[3].code);
    expect(app.text()).toBe(palette[4].code);
    expect(app.highlight()).toBe(palette[5].code);
  });

  it('should save and load theme settings from localStorage', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'themeMode') return 'dark';
      if (key === 'themeName') return 'Desert Bloom';
      return null;
    });
    app.themeMode.set('dark');
    app.selectedTheme.set(app.themes.find(t => t.name === 'Desert Bloom')!);
    app.saveThemeSettings();
    expect(localStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('themeName', 'Desert Bloom');
    app.loadThemeSettings();
    expect(app.themeMode()).toBe('dark');
    expect(app.selectedTheme().name).toBe('Desert Bloom');
  });
});

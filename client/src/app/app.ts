import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TitleBar } from './components/title-bar/title-bar';

export declare type ColorSwatch = {
  code: string;
  description: string;
}

export declare type ThemeType = {
  name: string,
  light: ColorSwatch[]
  dark: ColorSwatch[]
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, TitleBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[style.--background]': 'background',
    '[style.--primary]': 'primary',
    '[style.--secondary]': 'secondary',
    '[style.--accent]': 'accent',
    '[style.--text]': 'text',
    '[style.--highlight]': 'highlight',
  }
})
export class App {
  themes: ThemeType[] = [
    {
      name: "Sunny Day",
      light: [
        { code: "#F8F8F8", description: "Off-White Background" },
        { code: "#DEE5A2", description: "Khaki" },
        { code: "#CCB87C", description: "Pale Orange" },
        { code: "#AD6E6B", description: "Apple Red" },
        { code: "#B38759", description: "High Orange" },
        { code: "#D3B89F", description: "Nude" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#DEE5A2", description: "Khaki" },
        { code: "#CCB87C", description: "Pale Orange" },
        { code: "#AD6E6B", description: "Apple Red" },
        { code: "#B38759", description: "High Orange" },
        { code: "#D3B89F", description: "Nude" }
      ]
    },
    {
      name: "Earthen Whisper",
      light: [
        { code: "#FAFAF7", description: "Creamy White Background" },
        { code: "#266771", description: "Regal Teal" },
        { code: "#66CCAE", description: "Soft Turquiose" },
        { code: "#897B40", description: "Soft Brown" },
        { code: "#419431", description: "Hunter Green" },
        { code: "#A1D6A4", description: "Off Sea Foam" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#266771", description: "Regal Teal" },
        { code: "#66CCAE", description: "Soft Turquiose" },
        { code: "#897B40", description: "Soft Brown" },
        { code: "#419431", description: "Hunter Green" },
        { code: "#A1D6A4", description: "Off Sea Foam" }
      ]
    },
    {
      name: "Misty Morning",
      light: [
        { code: "#F5F7F9", description: "Cool Off-White Background" },
        { code: "#DDE2E7", description: "Light Cool Gray" },
        { code: "#AAB2BD", description: "Slate Gray" },
        { code: "#7C8D9E", description: "Medium Blue-Gray" },
        { code: "#526B7E", description: "Deep Indigo-Gray" },
        { code: "#BACDCD", description: "Muted Cyan Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#23272B", description: "Dark Cool Gray" },
        { code: "#344D60", description: "Slate Gray" },
        { code: "#5E6F80", description: "Medium Blue-Gray" },
        { code: "#7C8D9E", description: "Indigo-Gray" },
        { code: "#9EB1B1", description: "Cyan Accent" }
      ]
    },
    {
      name: "Desert Bloom",
      light: [
        { code: "#FFFDFB", description: "Warm White Background" },
        { code: "#F5F0EB", description: "Pale Peach" },
        { code: "#E7D8CD", description: "Rosy Beige" },
        { code: "#CBA495", description: "Terracotta" },
        { code: "#98756A", description: "Burnt Sienna" },
        { code: "#D8C28F", description: "Soft Gold Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#2C2320", description: "Dark Peach" },
        { code: "#4B3A35", description: "Rosy Beige" },
        { code: "#7A574C", description: "Terracotta" },
        { code: "#AD8677", description: "Burnt Sienna" },
        { code: "#BAA471", description: "Gold Accent" }
      ]
    },
    {
      name: "Forest Path",
      light: [
        { code: "#F9FCF8", description: "Very Light Greenish-White Background" },
        { code: "#E3EAE0", description: "Pale Mint" },
        { code: "#C1D5BF", description: "Soft Green" },
        { code: "#89A98A", description: "Dusky Green" },
        { code: "#587C5E", description: "Deep Forest Green" },
        { code: "#EDE0C8", description: "Cream Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#1A2B1A", description: "Dark Mint" },
        { code: "#3A5E40", description: "Soft Green" },
        { code: "#6B8B6C", description: "Dusky Green" },
        { code: "#89A98A", description: "Forest Green" },
        { code: "#CFB9AC", description: "Cream Accent" }
      ]
    },
    {
      name: "Coastal Breeze",
      light: [
        { code: "#F6FCFD", description: "Light Aqua-White Background" },
        { code: "#E5F2F5", description: "Very Light Blue" },
        { code: "#C9E4E9", description: "Powder Blue" },
        { code: "#9DCED9", description: "Soft Sky Blue" },
        { code: "#6FA8B4", description: "Deep Ocean Blue" },
        { code: "#F0D8B4", description: "Sandy Beige Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#1A2326", description: "Dark Aqua" },
        { code: "#22313A", description: "Powder Blue" },
        { code: "#518A96", description: "Sky Blue" },
        { code: "#7FACC1", description: "Ocean Blue" },
        { code: "#D2BA96", description: "Sandy Accent" }
      ]
    }
  ];
  selectedTheme: ThemeType = this.themes[0];
  themeMode: 'light' | 'dark' = 'light';
  background: string = '';
  primary: string = '';
  secondary: string = '';
  accent: string = '';
  text: string = '';
  highlight: string = '';

  get currentPalette(): ColorSwatch[] {
    return this.selectedTheme[this.themeMode];
  }

  setTheme($event: ThemeType) {
    const theme = $event;
    this.selectedTheme = theme;
    this.applyTheme();
    this.saveThemeSettings();
  }

  toggleThemeMode() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.saveThemeSettings();
  }

  applyTheme() {
    // Apply CSS variables for the current palette
    const palette = this.currentPalette;
    const [background, primary, secondary, accent, text, highlight] = palette.map(swatch => swatch.code);
    this.background = background;
    this.primary = primary;
    this.secondary = secondary;
    this.accent = accent;
    this.text = text;
    this.highlight = highlight;

    document.documentElement.setAttribute('data-theme-mode', this.themeMode);
  }

  saveThemeSettings() {
    localStorage.setItem('themeMode', this.themeMode);
    localStorage.setItem('themeName', this.selectedTheme.name);
  }

  loadThemeSettings() {
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    const storedName = localStorage.getItem('themeName');
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      this.themeMode = storedMode;
    }
    if (storedName) {
      const found = this.themes.find(t => t.name === storedName);
      if (found) {
        this.selectedTheme = found;
      }
    }
  }

  ngOnInit() {
    this.loadThemeSettings();
    this.applyTheme();
  }
}

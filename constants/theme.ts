import { Platform } from 'react-native';

const primaryGreen = '#4CAF50';
const surfaceWhite = '#FCF9F8';
const primaryText = '#1C1B1B';
const alertRed = '#B3261E';
const surfaceContainer1 = '#F6F3F2';
const surfaceContainer2 = '#F1EEED';

export const Colors = {
  light: {
    text: primaryText,
    background: surfaceWhite,
    tint: primaryGreen,
    icon: '#6B6867',
    tabIconDefault: 'rgba(28, 27, 27, 0.5)',
    tabIconSelected: primaryGreen,
    primaryGreen,
    surfaceWhite,
    primaryText,
    alertRed,
    surfaceContainer1,
    surfaceContainer2,
  },
  // Since EntePocket does not support Dark Mode, we map the dark palette to the light values.
  // This guarantees a consistent, calm, parent-friendly light theme under any system configuration.
  dark: {
    text: primaryText,
    background: surfaceWhite,
    tint: primaryGreen,
    icon: '#6B6867',
    tabIconDefault: 'rgba(28, 27, 27, 0.5)',
    tabIconSelected: primaryGreen,
    primaryGreen,
    surfaceWhite,
    primaryText,
    alertRed,
    surfaceContainer1,
    surfaceContainer2,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});


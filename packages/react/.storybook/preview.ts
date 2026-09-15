import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@essence/core/theme';
import '@essence/tokens/dist/tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#0A0A0A' },
        { name: 'gray', value: '#F5F5F5' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) =>
      React.createElement(
        ThemeProvider,
        { config: { mode: 'system' } },
        React.createElement('div', { style: { minHeight: '100vh' } }, React.createElement(Story))
      ),
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
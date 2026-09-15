import { promises as fs } from 'fs';
import path from 'path';
import { transform } from 'theo';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

async function buildTokens(options: { watch?: boolean } = {}) {
  console.log('🔨 Building design tokens...');

  // Ensure dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  // Read all token files
  const tokenFiles = await getTokenFiles(srcDir);
  const allTokens = {};

  for (const file of tokenFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const json = JSON.parse(content);
    Object.assign(allTokens, json);
  }

  // Write combined tokens.json
  await fs.writeFile(
    path.join(distDir, 'tokens.json'),
    JSON.stringify(allTokens, null, 2)
  );

  // Theo configurations for different output formats
  const formats = [
    {
      name: 'css',
      format: 'css',
      output: path.join(distDir, 'tokens.css'),
      options: {
        selector: ':root',
        showFileHeader: true,
      },
    },
    {
      name: 'js',
      format: 'javascript.es6',
      output: path.join(distDir, 'tokens.js'),
      options: {
        showFileHeader: true,
      },
    },
    {
      name: 'ts',
      format: 'typescript',
      output: path.join(distDir, 'tokens.d.ts'),
      options: {
        showFileHeader: true,
      },
    },
    {
      name: 'scss',
      format: 'scss',
      output: path.join(distDir, 'tokens.scss'),
      options: {
        showFileHeader: true,
      },
    },
  ];

  for (const fmt of formats) {
    try {
      const result = await transform({
        tokenFiles: [path.join(distDir, 'tokens.json')],
        output: fmt.output,
        format: fmt.format,
        options: fmt.options,
      });
      console.log(`✅ Generated ${fmt.name}: ${fmt.output}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${fmt.name}:`, error);
    }
  }

  // Generate theme-specific CSS files
  await generateThemeCSS(allTokens);

  // Generate TypeScript types
  await generateTypeScriptTypes(allTokens);

  console.log('✨ Token build complete!');

  if (options.watch) {
    console.log('👀 Watching for changes...');
    // Watch implementation would go here
  }
}

async function getTokenFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getTokenFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function generateThemeCSS(tokens: any) {
  const themes = {
    light: tokens.color || {},
    dark: {},
    'high-contrast': {},
  };

  // This would be expanded with actual theme token resolution
  // For now, create basic theme CSS structure
  let css = ':root {\n';
  css += '  /* Light theme (default) */\n';
  css += generateCSSVariables(tokens, '');
  css += '}\n\n';

  css += '[data-theme="dark"] {\n';
  css += '  /* Dark theme overrides */\n';
  css += generateCSSVariables(getThemeOverrides(tokens, 'dark'), '');
  css += '}\n\n';

  css += '@media (prefers-color-scheme: dark) {\n';
  css += '  :root:not([data-theme="light"]) {\n';
  css += generateCSSVariables(getThemeOverrides(tokens, 'dark'), '    ');
  css += '  }\n';
  css += '}\n\n';

  css += '@media (prefers-contrast: more) {\n';
  css += '  :root {\n';
  css += generateCSSVariables(getThemeOverrides(tokens, 'high-contrast'), '    ');
  css += '  }\n';
  css += '}\n';

  await fs.writeFile(path.join(distDir, 'themes.css'), css);
  console.log('✅ Generated themes.css');
}

function generateCSSVariables(obj: any, indent: string): string {
  let css = '';
  for (const [key, value] of Object.entries(obj)) {
    const varName = `--${key.replace(/\./g, '-')}`;
    if (typeof value === 'object' && value !== null) {
      if (value.value !== undefined) {
        css += `${indent}  ${varName}: ${value.value};\n`;
      } else {
        css += `${indent}/* ${key} */\n`;
        css += generateCSSVariables(value, indent + '  ');
      }
    }
  }
  return css;
}

function getThemeOverrides(tokens: any, theme: string): any {
  // Simplified - in reality would merge theme tokens with base tokens
  return tokens.theme?.[theme] || {};
}

async function generateTypeScriptTypes(tokens: any) {
  let ts = `// Auto-generated types from design tokens\n`;
  ts += `// Do not edit manually\n\n`;

  ts += `export interface DesignTokens {\n`;
  ts += generateTSInterface(tokens, '  ');
  ts += `}\n\n`;

  ts += `export type ColorToken = keyof DesignTokens['color'];\n`;
  ts += `export type SpacingToken = keyof DesignTokens['spacing'];\n`;
  ts += `export type TypographyToken = keyof DesignTokens['typography'];\n`;
  ts += `export type BorderToken = keyof DesignTokens['border'];\n`;
  ts += `export type MotionToken = keyof DesignTokens['motion'];\n`;
  ts += `export type ElevationToken = keyof DesignTokens['elevation'];\n`;

  await fs.writeFile(path.join(distDir, 'index.d.ts'), ts);
  console.log('✅ Generated index.d.ts');
}

function generateTSInterface(obj: any, indent: string): string {
  let ts = '';
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.value !== undefined || value.type !== undefined) {
        ts += `${indent}${key}: string;\n`;
      } else {
        ts += `${indent}${key}: {\n`;
        ts += generateTSInterface(value, indent + '  ');
        ts += `${indent}};\n`;
      }
    }
  }
  return ts;
}

// Run build
const args = process.argv.slice(2);
const watch = args.includes('--watch');

buildTokens({ watch }).catch(console.error);
# Contributing to Essence Design System

Thank you for your interest in contributing! This document outlines the process for contributing to the Essence Design System.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/essence.git
cd essence

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

## Development Workflow

### Branch Strategy

- `main` - Stable, production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches (e.g., `feature/new-button-variant`)
- `fix/*` - Bug fix branches (e.g., `fix/button-focus-issue`)
- `docs/*` - Documentation updates (e.g., `docs/update-button-api`)
- `chore/*` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Creating a Feature Branch

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit, push
git add .
git commit -m "feat: add new button variant"
git push origin feature/your-feature-name

# Create Pull Request to develop
```

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that don't affect code meaning (formatting, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to build process or auxiliary tools |
| `ci` | Changes to CI configuration files and scripts |

### Examples

```
feat(button): add loading state variant

fix(input): resolve focus ring color in dark mode

docs: update button API documentation

refactor(tokens): migrate to new token structure

perf(core): optimize theme provider re-renders

test(button): add keyboard navigation tests

chore: update dependencies

ci: add accessibility audit to CI pipeline
```

### Scope

Use the package or component name as scope when applicable:
- `feat(tokens): add new color scale`
- `fix(react/button): resolve SSR hydration mismatch`
- `docs(core/hooks): update useFocusTrap documentation`

## Pull Request Process

### Before Submitting

1. **Run tests locally**: `pnpm test`
2. **Run linting**: `pnpm lint`
3. **Run typecheck**: `pnpm typecheck`
4. **Build packages**: `pnpm build`
5. **Update documentation** if needed

### PR Requirements

- [ ] Clear, descriptive title following commit conventions
- [ ] Description explaining the change and why
- [ ] Linked issue (if applicable)
- [ ] Screenshots for visual changes
- [ ] Updated documentation
- [ ] Tests pass
- [ ] No linting errors
- [ ] TypeScript compiles without errors

### PR Template

```markdown
## Description
Brief description of the change

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Related Issue
Closes #123

## Screenshots (if applicable)
| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Visual regression tests pass (if applicable)
- [ ] Accessibility tests pass

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
```

## Code Style

### General Principles

1. **TypeScript strict mode** - No `any`, explicit types
2. **Functional components** - Use React hooks, avoid classes
3. **Composition over inheritance** - Build small, composable components
4. **Accessibility first** - ARIA, keyboard navigation, semantic HTML
5. **Performance aware** - Memoization, lazy loading, bundle size

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button`, `CardHeader` |
| Hooks | camelCase with `use` prefix | `useTheme`, `useFocusTrap` |
| Utilities | camelCase | `cn`, `deepMerge` |
| Types/Interfaces | PascalCase | `ButtonProps`, `ThemeConfig` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_CONFIG` |
| CSS Variables | kebab-case with prefix | `--color-primary-brand` |
| Files | PascalCase for components, kebab-case for utils | `Button.tsx`, `use-focus-trap.ts` |

### Component Structure

```tsx
// ComponentName.tsx
import React from 'react';
import { style, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';

// 1. Types
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// 2. Styles (Vanilla Extract)
const base = style({ ... });
const variants = recipe({ ... });

// 3. Component
export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(base, variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

// 4. Sub-components (if any)
export const ComponentNameSub = ...
```

### Token Usage

Always use design tokens instead of hardcoded values:

```tsx
// Good
const buttonStyle = style({
  backgroundColor: 'var(--color-primary-brand)',
  padding: 'var(--spacing-component-md)',
  borderRadius: 'var(--border-radius-md)',
});

// Bad
const buttonStyle = style({
  backgroundColor: '#2563EB',
  padding: '1rem',
  borderRadius: '0.375rem',
});
```

## Testing

### Test Types

1. **Unit Tests** - Test individual functions/hooks (`*.test.ts`)
2. **Component Tests** - Test React components (`*.test.tsx`)
3. **Integration Tests** - Test component interactions
4. **Visual Regression** - Storybook + Chromatic
5. **Accessibility** - axe-core automated tests

### Running Tests

```bash
# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Run specific package
pnpm --filter @essence/react test

# Run with coverage
pnpm test --coverage
```

### Writing Tests

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { axe } from 'jest-axe';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Documentation

### Component Documentation

Each component must have:

1. **Storybook stories** - All variants, states, and use cases
2. **Props documentation** - Auto-generated from TypeScript
3. **Usage examples** - Common patterns
4. **Do's and Don'ts** - Best practices

### Writing Documentation

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Description of the component and when to use it.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual variant',
    },
  },
};

export default meta;
```

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major** - Breaking changes
- **Minor** - New features (backward compatible)
- **Patch** - Bug fixes (backward compatible)

### Release Workflow

1. Changesets are created with each PR
2. On merge to `main`, GitHub Action creates version bump
3. Packages are published to npm
4. GitHub Release is created with changelog

### Creating a Changeset

```bash
# After making changes
pnpm changeset

# Select packages, version type, write summary
# This creates a .changeset/*.md file
```

## Questions?

- Open a [Discussion](https://github.com/your-org/essence/discussions)
- Check existing [Issues](https://github.com/your-org/essence/issues)
- Review [Documentation](https://essence.design)
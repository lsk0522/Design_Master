import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { cn } from '@essence/core/utils';

// Base styles
const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-component-xs)',
  fontFamily: 'var(--font-family-sans)',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--line-height-normal)',
  letterSpacing: 'var(--letter-spacing-normal)',
  border: 'none',
  borderRadius: 'var(--border-radius-md)',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  verticalAlign: 'middle',
  transition: 'background-color var(--motion-duration-fast) var(--motion-easing-ease-out), color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out), transform var(--motion-duration-fastest) var(--motion-easing-ease-out)',
  outline: 'none',

  ':focus-visible': {
    boxShadow: 'var(--elevation-focus)',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  selectors: {
    '&[data-loading="true"]': {
      position: 'relative',
      color: 'transparent !important',
      pointerEvents: 'none',
    },
  },
});

// Size variants
const sizeVariants = styleVariants({
  xs: {
    height: '1.5rem',
    minWidth: '1.5rem',
    paddingInline: 'var(--spacing-component-xs)',
    fontSize: 'var(--font-size-xs)',
    gap: 'var(--spacing-raw-1)',
  },
  sm: {
    height: '2rem',
    minWidth: '2rem',
    paddingInline: 'var(--spacing-component-sm)',
    fontSize: 'var(--font-size-sm)',
    gap: 'var(--spacing-raw-2)',
  },
  md: {
    height: '2.5rem',
    minWidth: '2.5rem',
    paddingInline: 'var(--spacing-component-md)',
    fontSize: 'var(--font-size-base)',
    gap: 'var(--spacing-raw-2)',
  },
  lg: {
    height: '3rem',
    minWidth: '3rem',
    paddingInline: 'var(--spacing-component-lg)',
    fontSize: 'var(--font-size-lg)',
    gap: 'var(--spacing-raw-3)',
  },
  xl: {
    height: '3.5rem',
    minWidth: '3.5rem',
    paddingInline: 'var(--spacing-component-xl)',
    fontSize: 'var(--font-size-xl)',
    gap: 'var(--spacing-raw-4)',
  },
});

// Variant styles
const variantVariants = styleVariants({
  primary: {
    backgroundColor: 'var(--color-primary-brand)',
    color: 'var(--color-primary-on-brand)',
    boxShadow: 'var(--elevation-level1)',

    ':hover:not(:disabled)': {
      backgroundColor: 'var(--color-primary-brand-hover)',
      boxShadow: 'var(--elevation-level2)',
    },

    ':active:not(:disabled)': {
      backgroundColor: 'var(--color-primary-brand-active)',
      boxShadow: 'var(--elevation-level1)',
    },

    ':focus-visible': {
      boxShadow: 'var(--elevation-focus)',
    },
  },
  secondary: {
    backgroundColor: 'var(--color-surface-primary)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-primary)',
    boxShadow: 'var(--elevation-level1)',

    ':hover:not(:disabled)': {
      backgroundColor: 'var(--color-surface-secondary)',
      borderColor: 'var(--color-border-secondary)',
      boxShadow: 'var(--elevation-level2)',
    },

    ':active:not(:disabled)': {
      backgroundColor: 'var(--color-surface-tertiary)',
      boxShadow: 'var(--elevation-level1)',
    },

    ':focus-visible': {
      boxShadow: 'var(--elevation-focus)',
    },
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary-brand)',

    ':hover:not(:disabled)': {
      backgroundColor: 'var(--color-primary-brand-subtle)',
    },

    ':active:not(:disabled)': {
      backgroundColor: 'var(--color-primary-brand-subtle-hover)',
    },

    ':focus-visible': {
      boxShadow: 'var(--elevation-focus)',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',

    ':hover:not(:disabled)': {
      backgroundColor: 'var(--color-surface-secondary)',
    },

    ':active:not(:disabled)': {
      backgroundColor: 'var(--color-surface-tertiary)',
    },

    ':focus-visible': {
      boxShadow: 'var(--elevation-focus)',
    },
  },
  destructive: {
    backgroundColor: 'var(--color-raw-red-600)',
    color: '#FFFFFF',
    boxShadow: 'var(--elevation-level1)',

    ':hover:not(:disabled)': {
      backgroundColor: 'var(--color-raw-red-700)',
      boxShadow: 'var(--elevation-level2)',
    },

    ':active:not(:disabled)': {
      backgroundColor: 'var(--color-raw-red-800)',
      boxShadow: 'var(--elevation-level1)',
    },

    ':focus-visible': {
      boxShadow: 'var(--elevation-focus-error)',
    },
  },
});

// Loading spinner animation
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const spinner = style({
  width: '1em',
  height: '1em',
  border: '2px solid currentColor',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 0.6s linear infinite`,
  position: 'absolute',
});

// Compound recipe
export const buttonRecipe = recipe({
  base,
  variants: {
    size: sizeVariants,
    variant: variantVariants,
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
  compoundVariants: [
    {
      variants: { variant: 'primary', size: 'xs' },
      style: { minWidth: '1.5rem', paddingInline: 'var(--spacing-component-xs)' },
    },
    {
      variants: { variant: 'destructive' },
      style: {
        ':hover:not(:disabled)': { backgroundColor: 'var(--color-raw-red-700)' },
      },
    },
  ],
});

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      asChild = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classNames = cn(
      buttonRecipe({ variant, size }),
      fullWidth && 'w-full',
      className
    );

    const Component = asChild ? 'span' : 'button';

    return (
      <Component
        ref={ref}
        className={classNames}
        disabled={isDisabled}
        data-loading={loading}
        aria-busy={loading}
        {...(Component === 'button' ? props : { role: 'button', tabIndex: 0, ...props })}
      >
        {loading && <span className={spinner} aria-hidden="true" />}
        {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';
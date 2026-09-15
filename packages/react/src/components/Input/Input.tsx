import React from 'react';
import { style, styleVariants, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';

const base = style({
  width: '100%',
  fontFamily: 'var(--font-family-sans)',
  fontWeight: 'var(--font-weight-normal)',
  lineHeight: 'var(--line-height-normal)',
  letterSpacing: 'var(--letter-spacing-normal)',
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-md)',
  outline: 'none',
  transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out), background-color var(--motion-duration-fast) var(--motion-easing-ease-out)',
  boxSizing: 'border-box',

  '::placeholder': {
    color: 'var(--color-text-tertiary)',
    opacity: 1,
  },

  ':hover:not(:disabled):not([aria-invalid="true"])': {
    borderColor: 'var(--color-border-secondary)',
  },

  ':focus': {
    borderColor: 'var(--color-border-focus)',
    borderWidth: '2px',
    boxShadow: 'var(--elevation-focus)',
  },

  '::selection': {
    backgroundColor: 'var(--color-selection-bg)',
    color: 'var(--color-selection-text)',
  },

  ':disabled': {
    backgroundColor: 'var(--color-surface-secondary)',
    color: 'var(--color-text-disabled)',
    cursor: 'not-allowed',
    opacity: 1,
  },

  '[aria-invalid="true"]&': {
    borderColor: 'var(--color-border-error)',

    ':focus': {
      boxShadow: 'var(--elevation-focus-error)',
    },

    ':hover:not(:disabled)': {
      borderColor: 'var(--color-border-error)',
    },
  },
});

const sizeVariants = styleVariants({
  sm: {
    height: '2rem',
    paddingInline: 'var(--spacing-component-sm)',
    fontSize: 'var(--font-size-sm)',
  },
  md: {
    height: '2.5rem',
    paddingInline: 'var(--spacing-component-md)',
    fontSize: 'var(--font-size-base)',
  },
  lg: {
    height: '3rem',
    paddingInline: 'var(--spacing-component-lg)',
    fontSize: 'var(--font-size-lg)',
  },
});

const inputRecipe = recipe({
  base,
  variants: {
    size: sizeVariants,
  },
  defaultVariants: {
    size: 'md',
  },
});

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  label?: string;
  hint?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      label,
      hint,
      error,
      leftElement,
      rightElement,
      fullWidth = true,
      className,
      id,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
      ariaDescribedBy,
    ].filter(Boolean).join(' ') || undefined;

    const classNames = cn(
      inputRecipe({ size }),
      fullWidth && 'w-full',
      className
    );

    return (
      <div style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label
            htmlFor={id || inputId}
            style={{
              display: 'block',
              marginBottom: 'var(--spacing-raw-1)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
            }}
          >
            {label}
            {required && (
              <span style={{ color: 'var(--color-raw-red-500)', marginLeft: 'var(--spacing-raw-1)' }}>
                *
              </span>
            )}
          </label>
        )}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {leftElement && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInline: 'var(--spacing-component-sm)',
                color: 'var(--color-icon-secondary)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={id || inputId}
            className={classNames}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            {...props}
          />
          {rightElement && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInline: 'var(--spacing-component-sm)',
                color: 'var(--color-icon-secondary)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            style={{
              marginTop: 'var(--spacing-raw-1)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-status-error-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-raw-1)',
            }}
          >
            <span aria-hidden="true">⚠</span>
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={hintId}
            style={{
              marginTop: 'var(--spacing-raw-1)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
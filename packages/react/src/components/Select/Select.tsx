import React from 'react';
import { style, styleVariants, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from '../Icons/Icons';

const triggerStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--spacing-component-sm)',
  height: '2.5rem',
  minWidth: '12rem',
  paddingInline: 'var(--spacing-component-md)',
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-normal)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-md)',
  cursor: 'pointer',
  transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
  outline: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  ':hover': {
    borderColor: 'var(--color-border-secondary)',
  },

  ':focus': {
    borderColor: 'var(--color-border-focus)',
    borderWidth: '2px',
    boxShadow: 'var(--elevation-focus)',
  },

  '[aria-invalid="true"]&': {
    borderColor: 'var(--color-border-error)',

    ':focus': {
      boxShadow: 'var(--elevation-focus-error)',
    },
  },

  selectors: {
    '&[data-disabled]': {
      backgroundColor: 'var(--color-surface-secondary)',
      color: 'var(--color-text-disabled)',
      cursor: 'not-allowed',
      opacity: 1,
    },
  },
});

const chevronStyle = style({
  color: 'var(--color-icon-secondary)',
  flexShrink: 0,
  transition: 'transform var(--motion-duration-fast) var(--motion-easing-ease-out)',
  selectors: {
    '[data-state="open"] &': {
      transform: 'rotate(180deg)',
    },
  },
});

const contentStyle = style({
  position: 'relative',
  maxHeight: '16rem',
  overflowY: 'auto',
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-md)',
  boxShadow: 'var(--elevation-level4)',
  outline: 'none',
  zIndex: 'var(--z-index-dropdown)',
});

const viewportStyle = style({
  padding: 'var(--spacing-raw-1)',
});

const itemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-component-sm)',
  padding: 'var(--spacing-component-sm) var(--spacing-component-md)',
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-base)',
  fontWeight: 'var(--font-weight-normal)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  borderRadius: 'var(--border-radius-sm)',
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',

  selectors: {
    '&[data-highlighted]': {
      backgroundColor: 'var(--color-primary-brand-subtle)',
      color: 'var(--color-primary-brand)',
    },
    '&[data-disabled]': {
      color: 'var(--color-text-disabled)',
      cursor: 'not-allowed',
    },
  },
});

const itemTextStyle = style({
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const separatorStyle = style({
  height: '1px',
  backgroundColor: 'var(--color-border-primary)',
  margin: 'var(--spacing-raw-1) 0',
});

const scrollUpButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '1.5rem',
  backgroundColor: 'var(--color-surface-primary)',
  color: 'var(--color-icon-secondary)',
  cursor: 'pointer',
});

const scrollDownButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '1.5rem',
  backgroundColor: 'var(--color-surface-primary)',
  color: 'var(--color-icon-secondary)',
  cursor: 'pointer',
});

const labelStyle = style({
  padding: 'var(--spacing-component-sm) var(--spacing-component-md)',
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-semibold)',
  lineHeight: 'var(--line-height-normal)',
  letterSpacing: 'var(--letter-spacing-wider)',
  textTransform: 'uppercase',
  color: 'var(--color-text-tertiary)',
});

const valueStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-component-sm)',
  flex: 1,
  minWidth: 0,
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      placeholder = '선택하세요',
      label,
      error,
      hint,
      options,
      fullWidth = true,
      size = 'md',
      className,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
      ariaDescribedBy,
    ].filter(Boolean).join(' ') || undefined;

    const classNames = cn(
      fullWidth && 'w-full',
      className
    );

    return (
      <div style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label
            htmlFor={id || selectId}
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
        <SelectPrimitive.Root {...props} disabled={disabled} required={required}>
          <SelectPrimitive.Trigger
            ref={ref}
            id={id || selectId}
            className={cn(triggerStyle, classNames)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            data-disabled={disabled}
          >
            <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {props.value ? options.find((o) => o.value === props.value)?.label : placeholder}
            </span>
            <ChevronDownIcon className={chevronStyle} data-state={props.open ? 'open' : 'closed'} />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={contentStyle}>
              <SelectPrimitive.Viewport className={viewportStyle}>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={itemStyle}
                  >
                    <span className={itemTextStyle}>{option.label}</span>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
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

Select.displayName = 'Select';
import React from 'react';
import { style, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';
import { Box } from '../Box/Box';

const cardBase = style({
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--elevation-level1)',
  overflow: 'hidden',
  transition: 'box-shadow var(--motion-duration-normal) var(--motion-easing-ease-out), border-color var(--motion-duration-normal) var(--motion-easing-ease-out)',
});

const cardVariants = recipe({
  base: cardBase,
  variants: {
    variant: {
      default: {
        borderWidth: '1px',
      },
      elevated: {
        borderWidth: '0',
        boxShadow: 'var(--elevation-level3)',
      },
      outlined: {
        borderWidth: '2px',
      },
      filled: {
        backgroundColor: 'var(--color-surface-secondary)',
        borderWidth: '0',
      },
    },
    padding: {
      none: {},
      sm: { padding: 'var(--spacing-component-sm)' },
      md: { padding: 'var(--spacing-component-md)' },
      lg: { padding: 'var(--spacing-component-lg)' },
    },
    hoverable: {
      true: {
        ':hover': {
          boxShadow: 'var(--elevation-level3)',
          borderColor: 'var(--color-border-secondary)',
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
  },
});

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hoverable = false, className, children, ...props }, ref) => {
    const classNames = cn(cardVariants({ variant, padding, hoverable }), className);

    return (
      <Box
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';

// Card Header
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn('flex items-center justify-between', className)}
      px={4}
      py={3}
      borderBottom="1px solid var(--color-border-primary)"
      {...props}
    >
      {children}
    </Box>
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-[var(--color-text-primary)]', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--color-text-secondary)] mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(className)}
      p={4}
      {...props}
    >
      {children}
    </Box>
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn('flex items-center justify-end gap-2', className)}
      px={4}
      py={3}
      borderTop="1px solid var(--color-border-primary)"
      bg="var(--color-surface-secondary)"
      {...props}
    >
      {children}
    </Box>
  )
);
CardFooter.displayName = 'CardFooter';
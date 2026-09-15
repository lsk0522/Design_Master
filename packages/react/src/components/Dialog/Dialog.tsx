import React from 'react';
import { style, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CloseIcon } from '../Icons/Icons';

const overlayStyle = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'var(--color-overlay-bg)',
  backdropFilter: 'blur(2px)',
  zIndex: 'var(--z-index-overlay)',
  animation: 'fadeIn var(--motion-duration-normal) var(--motion-easing-ease-out)',
});

const contentStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '32rem',
  maxHeight: '85vh',
  overflow: 'hidden',
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--elevation-level6)',
  zIndex: 'var(--z-index-modal)',
  animation: 'slideIn var(--motion-duration-normal) var(--motion-easing-springGentle)',
});

const closeStyle = style({
  position: 'absolute',
  top: 'var(--spacing-component-md)',
  right: 'var(--spacing-component-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: 'var(--border-radius-full)',
  color: 'var(--color-icon-secondary)',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color var(--motion-duration-fast) var(--motion-easing-ease-out), color var(--motion-duration-fast) var(--motion-easing-ease-out)',

  ':hover': {
    backgroundColor: 'var(--color-surface-secondary)',
    color: 'var(--color-icon-primary)',
  },

  ':focus-visible': {
    outline: 'none',
    boxShadow: 'var(--elevation-focus)',
  },
});

const headerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-component-lg)',
  borderBottom: '1px solid var(--color-border-primary)',
});

const titleStyle = style({
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  lineHeight: 'var(--line-height-snug)',
  color: 'var(--color-text-primary)',
});

const descriptionStyle = style({
  marginTop: 'var(--spacing-raw-1)',
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-secondary)',
});

const bodyStyle = style({
  padding: 'var(--spacing-component-lg)',
  overflowY: 'auto',
});

const footerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 'var(--spacing-component-sm)',
  padding: 'var(--spacing-component-lg)',
  borderTop: '1px solid var(--color-border-primary)',
  backgroundColor: 'var(--color-surface-secondary)',
});

const dialogRecipe = recipe({
  base: contentStyle,
  variants: {
    size: {
      sm: { maxWidth: '20rem' },
      md: { maxWidth: '32rem' },
      lg: { maxWidth: '48rem' },
      xl: { maxWidth: '64rem' },
      full: { maxWidth: '100%', margin: 'var(--spacing-component-lg)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: DialogSize;
  showClose?: boolean;
}

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayStyle} />
        <DialogPrimitive.Content className={cn(dialogRecipe({ size }))}>
          {(title || showClose) && (
            <div className={headerStyle}>
              <div>
                {title && <h2 className={titleStyle}>{title}</h2>}
                {description && <p className={descriptionStyle}>{description}</p>}
              </div>
              {showClose && (
                <DialogPrimitive.Close className={cn(closeStyle)} aria-label="닫기">
                  <CloseIcon size="md" />
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          <div className={bodyStyle}>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

Dialog.displayName = 'Dialog';

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(bodyStyle, className)} {...props}>
      {children}
    </div>
  )
);
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(headerStyle, className)} {...props}>
      {children}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h2 ref={ref} className={cn(titleStyle, className)} {...props}>
      {children}
    </h2>
  )
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={cn(descriptionStyle, className)} {...props}>
      {children}
    </p>
  )
);
DialogDescription.displayName = 'DialogDescription';

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(bodyStyle, className)} {...props}>
      {children}
    </div>
  )
);
DialogBody.displayName = 'DialogBody';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(footerStyle, className)} {...props}>
      {children}
    </div>
  )
);
DialogFooter.displayName = 'DialogFooter';

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Close
      ref={ref}
      className={cn(closeStyle, className)}
      aria-label="닫기"
      {...props}
    >
      {children || <CloseIcon size="md" />}
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
};
import React from 'react';
import { style, styleVariants, recipe } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { CloseIcon, CheckIcon, AlertCircleIcon, InfoIcon } from '../Icons/Icons';

const viewportStyle = style({
  position: 'fixed',
  bottom: 'var(--spacing-component-lg)',
  right: 'var(--spacing-component-lg)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-component-sm)',
  zIndex: 'var(--z-index-toast)',
  maxWidth: '24rem',
  pointerEvents: 'none',
});

const rootStyle = style({
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'var(--spacing-component-sm)',
  padding: 'var(--spacing-component-md)',
  minWidth: '16rem',
  maxWidth: '24rem',
  backgroundColor: 'var(--color-surface-primary)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--elevation-level4)',
  animation: 'slideInRight var(--motion-duration-normal) var(--motion-easing-springSnappy)',
});

const iconWrapperStyle = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexShrink: 0,
  width: '1.5rem',
  height: '1.5rem',
  marginTop: '0.125rem',
});

const contentStyle = style({
  flex: 1,
  minWidth: 0,
});

const titleStyle = style({
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-semibold)',
  lineHeight: 'var(--line-height-snug)',
  color: 'var(--color-text-primary)',
  marginBottom: 'var(--spacing-raw-1)',
});

const descriptionStyle = style({
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-secondary)',
});

const closeStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: 'var(--border-radius-full)',
  color: 'var(--color-icon-tertiary)',
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

const progressStyle = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)',
  backgroundColor: 'currentColor',
  opacity: 0.3,
  transformOrigin: 'left',
  animation: 'progress var(--toast-duration) linear forwards',
});

const variantStyles = styleVariants({
  default: {
    borderLeft: '4px solid var(--color-border-primary)',
    vars: {
      '--toast-icon-color': 'var(--color-icon-primary)',
    },
  },
  success: {
    borderLeft: '4px solid var(--color-status-success-icon)',
    vars: {
      '--toast-icon-color': 'var(--color-status-success-icon)',
    },
  },
  error: {
    borderLeft: '4px solid var(--color-status-error-icon)',
    vars: {
      '--toast-icon-color': 'var(--color-status-error-icon)',
    },
  },
  warning: {
    borderLeft: '4px solid var(--color-status-warning-icon)',
    vars: {
      '--toast-icon-color': 'var(--color-status-warning-icon)',
    },
  },
  info: {
    borderLeft: '4px solid var(--color-status-info-icon)',
    vars: {
      '--toast-icon-color': 'var(--color-status-info-icon)',
    },
  },
});

const toastRecipe = recipe({
  base: rootStyle,
  variants: {
    variant: variantStyles,
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  action?: React.ReactNode;
}

const Toast = ({
  variant = 'default',
  title,
  description,
  duration = 5000,
  onClose,
  action,
}: ToastProps) => {
  const [open, setOpen] = React.useState(true);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (!open) return;

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 100 - (elapsed / duration) * 100));
    }, 50);

    const timeout = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, duration, onClose]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const iconMap = {
    default: <InfoIcon size="sm" style={{ color: 'var(--toast-icon-color)' }} />,
    success: <CheckIcon size="sm" style={{ color: 'var(--toast-icon-color)' }} />,
    error: <AlertCircleIcon size="sm" style={{ color: 'var(--toast-icon-color)' }} />,
    warning: <AlertCircleIcon size="sm" style={{ color: 'var(--toast-icon-color)' }} />,
    info: <InfoIcon size="sm" style={{ color: 'var(--toast-icon-color)' }} />,
  };

  if (!open) return null;

  return (
    <div
      className={cn(toastRecipe({ variant }))}
      style={{
        '--toast-duration': `${duration}ms`,
      } as React.CSSProperties}
    >
      <div className={iconWrapperStyle} style={{ color: 'var(--toast-icon-color)' }}>
        {iconMap[variant]}
      </div>
      <div className={contentStyle}>
        {title && <h4 className={titleStyle}>{title}</h4>}
        {description && <p className={descriptionStyle}>{description}</p>}
        {action && <div style={{ marginTop: 'var(--spacing-component-sm)' }}>{action}</div>}
      </div>
      <button
        className={closeStyle}
        onClick={handleClose}
        aria-label="닫기"
      >
        <CloseIcon size="sm" />
      </button>
      <div
        className={progressStyle}
        style={{ width: `${progress}%` } as React.CSSProperties}
      />
    </div>
  );
};

Toast.displayName = 'Toast';

interface ToastViewportProps {
  children: React.ReactNode;
}

const ToastViewport = ({ children }: ToastViewportProps) => (
  <div className={viewportStyle} style={{ pointerEvents: 'none' }}>
    <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-component-sm)' }}>
      {children}
    </div>
  </div>
);

ToastViewport.displayName = 'ToastViewport';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Array<ToastProps & { id: string }>>([]);

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...props, id }]);
    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <>
      {children}
      <ToastViewport>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => dismiss(toast.id)} />
        ))}
      </ToastViewport>
    </>
  );
};

ToastProvider.displayName = 'ToastProvider';

export { Toast, ToastProvider, ToastViewport };
export type { ToastProps, ToastVariant };
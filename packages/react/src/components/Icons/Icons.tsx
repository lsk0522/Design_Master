import React from 'react';
import { style } from '@vanilla-extract/css';

const iconBase = style({
  display: 'inline-block',
  flexShrink: 0,
  verticalAlign: 'middle',
  color: 'currentColor',
});

const sizeVariants = {
  xs: style({ width: '1rem', height: '1rem' }),
  sm: style({ width: '1.25rem', height: '1.25rem' }),
  md: style({ width: '1.5rem', height: '1.5rem' }),
  lg: style({ width: '2rem', height: '2rem' }),
  xl: style({ width: '2.5rem', height: '2.5rem' }),
};

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: keyof typeof sizeVariants;
}

const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
);
ChevronDownIcon.displayName = 'ChevronDownIcon';

const ChevronRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
);
ChevronRightIcon.displayName = 'ChevronRightIcon';

const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
);
ChevronLeftIcon.displayName = 'ChevronLeftIcon';

const ChevronUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
);
ChevronUpIcon.displayName = 'ChevronUpIcon';

const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
);
CloseIcon.displayName = 'CloseIcon';

const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
);
CheckIcon.displayName = 'CheckIcon';

const LoaderIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size], animation: 'spin 1s linear infinite' }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  )
);
LoaderIcon.displayName = 'LoaderIcon';

const InfoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
);
InfoIcon.displayName = 'InfoIcon';

const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
);
SearchIcon.displayName = 'SearchIcon';

const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
);
MenuIcon.displayName = 'MenuIcon';

const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
);
HomeIcon.displayName = 'HomeIcon';

const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
);
UserIcon.displayName = 'UserIcon';

const SettingsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
);
SettingsIcon.displayName = 'SettingsIcon';

const BellIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
);
BellIcon.displayName = 'BellIcon';

const AlertCircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <svg
      ref={ref}
      className={iconBase}
      style={{ width: sizeVariants[size] }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
);
AlertCircleIcon.displayName = 'AlertCircleIcon';

export {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  CloseIcon,
  CheckIcon,
  LoaderIcon,
  SearchIcon,
  MenuIcon,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  AlertCircleIcon,
  InfoIcon,
};
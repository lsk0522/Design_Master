import React from 'react';
import { style } from '@vanilla-extract/css';
import { cn } from '@essence/core/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  bg?: string;
  color?: string;
  rounded?: string;
  shadow?: string;
  flex?: boolean | string;
  flexDirection?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  justifyContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number | string;
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  grid?: boolean | string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: number | string;
}

const baseStyles = style({
  boxSizing: 'border-box',
});

const spacingStyles = {
  p: style({ padding: 'var(--spacing-component-md)' }),
  px: style({ paddingInline: 'var(--spacing-component-md)' }),
  py: style({ paddingBlock: 'var(--spacing-component-md)' }),
  pt: style({ paddingTop: 'var(--spacing-component-md)' }),
  pr: style({ paddingRight: 'var(--spacing-component-md)' }),
  pb: style({ paddingBottom: 'var(--spacing-component-md)' }),
  pl: style({ paddingLeft: 'var(--spacing-component-md)' }),
  m: style({ margin: 'var(--spacing-component-md)' }),
  mx: style({ marginInline: 'var(--spacing-component-md)' }),
  my: style({ marginBlock: 'var(--spacing-component-md)' }),
  mt: style({ marginTop: 'var(--spacing-component-md)' }),
  mr: style({ marginRight: 'var(--spacing-component-md)' }),
  mb: style({ marginBottom: 'var(--spacing-component-md)' }),
  ml: style({ marginLeft: 'var(--spacing-component-md)' }),
};

const flexStyles = style({
  display: 'flex',
});

const gridStyles = style({
  display: 'grid',
});

const flexDirectionStyles = {
  row: style({ flexDirection: 'row' }),
  col: style({ flexDirection: 'column' }),
  'row-reverse': style({ flexDirection: 'row-reverse' }),
  'col-reverse': style({ flexDirection: 'column-reverse' }),
};

const alignItemsStyles = {
  stretch: style({ alignItems: 'stretch' }),
  center: style({ alignItems: 'center' }),
  'flex-start': style({ alignItems: 'flex-start' }),
  'flex-end': style({ alignItems: 'flex-end' }),
  baseline: style({ alignItems: 'baseline' }),
};

const justifyContentStyles = {
  stretch: style({ justifyContent: 'stretch' }),
  center: style({ justifyContent: 'center' }),
  'flex-start': style({ justifyContent: 'flex-start' }),
  'flex-end': style({ justifyContent: 'flex-end' }),
  'space-between': style({ justifyContent: 'space-between' }),
  'space-around': style({ justifyContent: 'space-around' }),
  'space-evenly': style({ justifyContent: 'space-evenly' }),
};

const wrapStyles = {
  wrap: style({ flexWrap: 'wrap' }),
  nowrap: style({ flexWrap: 'nowrap' }),
  'wrap-reverse': style({ flexWrap: 'wrap-reverse' }),
};

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
      className,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      bg,
      color,
      rounded,
      shadow,
      flex,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      wrap,
      grid,
      gridTemplateColumns,
      gridTemplateRows,
      gridGap,
      style: inlineStyle,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = cn(
      baseStyles,
      p && spacingStyles.p,
      px && spacingStyles.px,
      py && spacingStyles.py,
      pt && spacingStyles.pt,
      pr && spacingStyles.pr,
      pb && spacingStyles.pb,
      pl && spacingStyles.pl,
      m && spacingStyles.m,
      mx && spacingStyles.mx,
      my && spacingStyles.my,
      mt && spacingStyles.mt,
      mr && spacingStyles.mr,
      mb && spacingStyles.mb,
      ml && spacingStyles.ml,
      flex && flexStyles,
      flexDirection && flexDirectionStyles[flexDirection],
      alignItems && alignItemsStyles[alignItems],
      justifyContent && justifyContentStyles[justifyContent],
      gap && style({ gap: typeof gap === 'number' ? `${gap}rem` : gap }),
      wrap && (typeof wrap === 'boolean' ? style({ flexWrap: 'wrap' }) : wrapStyles[wrap]),
      grid && gridStyles,
      gridTemplateColumns && style({ gridTemplateColumns }),
      gridTemplateRows && style({ gridTemplateRows }),
      gridGap && style({ gap: typeof gridGap === 'number' ? `${gridGap}rem` : gridGap }),
      rounded && style({ borderRadius: rounded }),
      shadow && style({ boxShadow: shadow }),
      bg && style({ backgroundColor: bg }),
      color && style({ color }),
      className
    );

    const styleObj = React.useMemo(
      () => ({
        ...(inlineStyle || {}),
        ...(bg && { backgroundColor: bg }),
        ...(color && { color }),
        ...(rounded && { borderRadius: rounded }),
        ...(shadow && { boxShadow: shadow }),
      }),
      [inlineStyle, bg, color, rounded, shadow]
    );

    return (
      <Component
        ref={ref}
        className={classNames}
        style={styleObj}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

import { LinkProps } from 'next/link';

export interface AnchorButtonProps {
  theme:
    | 'green'
    | 'green-alt'
    | 'blue'
    | 'blue-alt'
    | 'white'
    | 'white-alt'
    | 'black'
    | 'black-alt';
  size: 'xs' | 'base' | 'xl';
  className?: string;
}

// Button props
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorButtonProps & {
    href?: undefined;
  };

// Anchor props
export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  AnchorButtonProps & {
    href?: string;
    disabled?: boolean;
    anchorLinkProps?: LinkProps;
  };

// Input/output options
export type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

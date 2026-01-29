declare module 'next' {
  export type Metadata = Record<string, unknown>;
}

declare module 'next/link' {
  import * as React from 'react';

  export type LinkProps = {
    href: string | URL;
    children?: React.ReactNode;
    className?: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

  export default function Link(props: LinkProps): React.ReactElement;
}

declare module 'next/font/google' {
  export type NextFont = { className: string; style?: { fontFamily: string }; variable?: string };

  export function Geist(options?: Record<string, unknown>): NextFont;
  export function Geist_Mono(options?: Record<string, unknown>): NextFont;
}

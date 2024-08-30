import { ReactNode, ComponentProps } from 'react';

type Title = {
  title: string;
  children?: never;
};

type Children = {
  title?: never;
  children: ReactNode;
};
type TitleChildren = Title | Children;

type ButtonProps = TitleChildren & ComponentProps<'button'>; // accepts all the props of button but if title is provided should not children or vice versa
const Button =
  /* get this big scary type from this source 
https://unpkg.com/@types/react@16.4.7/index.d.ts
*/
  ({ title, children, ...rest }: ButtonProps) => {
    return <button {...rest}>{title ?? children}</button>;
  };

export { Button };

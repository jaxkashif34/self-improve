import { ReactNode, ComponentProps } from 'react';
import { Todo } from '../App';

export const UL = ({ items, render }: { items: Todo[]; render: (text: Todo) => ReactNode } & ComponentProps<'ul'>) => {
  return <ul>{items.map((item) => render(item))}</ul>;
};

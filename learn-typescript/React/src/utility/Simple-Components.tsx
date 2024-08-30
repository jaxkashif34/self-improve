import { FunctionComponent, ReactNode, useState } from 'react';
import { Button } from '../components/HTML-Atteributes';
type HeadingProps = { title: string };
type BoxProps = { children: ReactNode };

const Heading = ({ title }: HeadingProps) => <h2>{title}</h2>;
const Box = ({ children }: BoxProps) => <div>{children}</div>;
const List: FunctionComponent<{ items: string[]; onClick: (item: string) => void }> = ({ items, onClick }) => (
  <ul>
    {items.map((item, i) => (
      <li key={i} onClick={() => onClick(item)}>
        {item}
      </li>
    ))}
  </ul>
);

/*
 *****************Old bad way***************** 
const IncrementorOld: FunctionComponent<{ value: number; setValue: Dispatch<SetStateAction<number>> }> = ({ value, setValue }) => {
  return <button onClick={() => setValue((value) => value + 1)}>ADD - {value}</button>;
};
*/

/*
 *****************Best good way***************** */
const Incrementor: FunctionComponent<{ value: UserNumberValue; setValue: UserNumberSetValue }> = ({ value, setValue }) => {
  return <Button onClick={() => setValue((value) => value + 1)} title={`ADD - ${value}`} />;
};
// best alternative for defining types for props

const useNumber = (initialValue: number) => useState<number>(initialValue); // custom hook

type UserNumberValue = ReturnType<typeof useNumber>[0];
type UserNumberSetValue = ReturnType<typeof useNumber>[1];

export { Heading, Box, List, Incrementor };

import { FormEvent, useCallback, useReducer } from 'react';
import { ActionType, Todo } from '../App';

export const useTodo = (initialTodo: Todo[]): { todoList: Todo[]; addTodo: (text: FormEvent<HTMLFormElement>) => void; removeTodo: (id: number) => void } => {
  const [todoList, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  }, initialTodo);

  const addTodo = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let text = e.currentTarget.todo.value;
    if (text === '') return;
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
    };

    dispatch({ type: 'ADD', payload: newTodo });

    e.currentTarget.todo.value = '';
  }, []);

  const removeTodo = useCallback((id: number) => {
    console.log({ id });
    dispatch({ type: 'REMOVE', id });
  }, []);
  return { todoList, addTodo, removeTodo };
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

export type SliceState = {
  todos: Todo[];
};
const initialState: SliceState = {
  todos: [{ id: 1, text: 'hello', done: false }],
};

const slice = createSlice({
  initialState,
  name: 'Todo-Slice',
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
});

export const useReduxTodo = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);
  const addTodo = (todo: Todo) => dispatch(slice.actions.addTodo(todo));
  const removeTodo = (id: number) => dispatch(slice.actions.removeTodo(id));
  return { todos, addTodo, removeTodo };
};
export default slice.reducer;

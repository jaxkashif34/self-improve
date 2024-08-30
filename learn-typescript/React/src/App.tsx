import { useState, useEffect, FormEvent } from 'react';
import './App.css';
import { Box, Heading, List, Incrementor } from './utility/Simple-Components';
import { useTodo } from './components/custom-hooks';
import { UL } from './components/Generic-Components';
import { useReduxTodo } from './redux-slices/todoSlice';
type PayloadType = {
  text: string;
};

export type ActionType = { type: 'ADD'; payload: Todo } | { type: 'REMOVE'; id: number };

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};
function App() {
  // useState with TS
  const [payload, setPayload] = useState<PayloadType | null>(null);
  useEffect(() => {
    fetch('/payload.json')
      .then((res) => res.json())
      .then((data) => setPayload(data))
      .catch((err) => console.log(err));
  }, []);

  // userReducer with TS
  // const { addTodo, removeTodo, todoList } = useTodo([]);

  // Advance Properties

  const [value, setValue] = useState(0);

  // Redux with TS

  const { todos, addTodo, removeTodo } = useReduxTodo();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.currentTarget['todo'].value;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    };
    addTodo(newTodo);
    e.currentTarget['todo'].value = '';
  };

  return (
    <div>
      <Heading title="Introduction" />
      <Box>
        <List items={['one', 'two', 'three']} onClick={(item) => alert(item)} />
      </Box>
      <Heading title="Todo Items" />
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" id="todo" />
        </form>
        <UL
          items={todos}
          render={(todo) => (
            <li key={todo.id} onClick={removeTodo.bind(null, todo.id)}>
              {todo.text}
            </li>
          )}
        />
      </div>
      <Incrementor value={value} setValue={setValue} />
    </div>
  );
}

export default App;

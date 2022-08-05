import React, { useEffect } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Button, TextField } from '@mui/joy';
import Select, { SelectChangeEvent } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Todo from './Todo';
import firebase from 'firebase/compat/app';

import { db } from './firebase'

import './App.css'

/*
TODO:

- Faster animations
- Load labels when data is returned
*/

function App() {
  const [todos, setTodo] = useState([]);
  const [status, setStatus] = useState(['minor']);
  const [todoStatuses, setTodoStatuses] = useState([]);
  const [input, setInput] = useState('');
  const [buttonState, setButtonState] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodo(snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }
      ))
    })

    db.collection('statuses').onSnapshot(snapshot => {
      setTodoStatuses(snapshot.docs.map(doc => {
        return { ...doc.data(), key: doc.id }
      }))
    })

  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    {
      input &&

        db.collection('todos').add(
          {
            status: status,
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }
        )

      //setTodo([...todos, { status: status, text: input }])
      setInput('')
    }
  }

  // Add priority dropdown
  return (
    <div className="App">

      <CssVarsProvider />

      <div className="bg"></div>
      <h1>TO:DO <span>App</span></h1>

      <div className="box center">
        <form>
          <div className="search">
            <TextField
              value={input}
              placeholder="Add an todo.."
              sx={{ mr: 1, flexGrow: 1 }}
              onChange={event => {
                setInput(event.target.value);
              }} />

            <Select
              defaultValue={'minor'}
              placeholder="Priority .."
              color="primary"
              onChange={event => {
                setStatus(event);
              }}
              sx={{ mr: 1, fontSize: 14 }}>
              {
                todoStatuses.map((status, index) => {
                  return <Option key={index} value={status.key}>{status.label}</Option>
                })
              }
            </Select>

            <Button
              disabled={!input}
              color="primary"
              size="md"
              type="submit"
              onClick={addTodo} >
              Add Todo
            </Button>
          </div>
        </form>
      </div>

      <div className="todos center">
        <ul>
          {
            todos.map((todo, i) => {
              return !todo.text ? '' : <Todo {...todo} akey={todo.index} key={todo.index} />
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;

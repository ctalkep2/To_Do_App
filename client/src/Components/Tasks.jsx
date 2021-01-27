import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { useHttp } from '../hooks/http.hook';

import { NavBar } from '../styles/NavBar.css';
import { 
  TaskBody,
  TaskItem, 
  ArrowDown, 
  ArrowUp, 
  RemoveTask,
  CompliteTask,
  CheckComplited
} from '../styles/Tasks.css';

function Tasks() {

  const { loading, request, error } = useHttp();
  const auth = useContext(AuthContext);

  const [item, setItem] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    async function getTaskData() {
      const response = await request('/api/tasks', 'GET', null, {
        autorization: `Bearer ${auth.token}`
      });
      
      if (response) setTasks(response);

      if (error) {
        auth.logout();
      }

    }

    getTaskData();
  }, [request, auth, error]);

	const logoutHadler = () => {
		auth.logout();
	}

  const addTask = async e => {
    e.preventDefault();

    if (item.length) {

      const data = await request(
        '/api/tasks/create',
        'POST', 
        [...tasks, {
          task: item,
          complited: false,
          priority: tasks.length + 1,
          key: Date.now()
        }],
        {
          autorization: `Bearer ${auth.token}`
        }
      );

      setTasks([...tasks, data]);
    }

    setItem('');
  }

  const itemHandler = e => {
    setItem(e.target.value);
  }

  const removeHandler = async e => {

    const data = await request(
      '/api/tasks/delete',
      'DELETE',
      { id: e.target.parentNode.id },
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    setTasks(data);
  }

  const priorityUpHandler = async e => {

    const data = await request(
      '/api/tasks/change',
      'PUT',
      { 
        id: e.target.parentNode.id,
        command: 'UP'
      },
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    if (data) setTasks(data)
  }

  const priorityDownHandler = async e => {

    const data = await request(
      '/api/tasks/change',
      'PUT',
      { 
        id: e.target.parentNode.id,
        command: 'DOWN'
      },
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    if (data) setTasks(data)
  }

  const compliteHandler = async e => {
    const data = await request(
      '/api/tasks/change',
      'PUT',
      { 
        id: e.target.parentNode.parentNode.id,
        command: 'COMPLITED'
      },
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    if (data) setTasks(data)
  }

  return (
    <div>
      <NavBar>    
        <button
        	onClick = {logoutHadler}
        >
        	Logout
        </button>
        <NavLink to="/profile">
        	Profile
        </NavLink>
      </NavBar>
      <h1 style={{ textAlign: 'center' }} >Hello Tasks</h1>
      <TaskBody onSubmit={addTask}>
        <input 
          name="addTask"
          value={item}
          onChange={itemHandler}
          disabled={loading}
        />      
      </TaskBody>
      <TaskItem>
        <ul>
          {tasks.map((item, index) => {
            return (
              <li 
                key={index}
                id={item._id}
              >
                <ArrowUp
                  onClick={priorityUpHandler}
                />
                <ArrowDown
                  onClick={priorityDownHandler}
                />
                <RemoveTask
                  disabled={loading}
                  onClick={removeHandler}
                />
                <CheckComplited>
                  <input
                    id={item._id + 1}
                    onChange={compliteHandler}
                    checked={item.complited} 
                    disabled={loading}
                    type="checkbox" 
                  />
                  <label htmlFor={item._id + 1}></label>
                </CheckComplited>
                <CompliteTask
                  complite={item.complited}
                >                
                  {item.task}
                </CompliteTask>  
              </li>
            )
          })}
        </ul>
      </TaskItem> 
    </div>
  );
}

export default Tasks;

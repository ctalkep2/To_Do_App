import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { useHttp } from '../hooks/http.hook';

import { taskEvents } from '../events/tasks.event';

import Task from './Task';

import { NavBar } from '../styles/NavBar.css';
import { TaskBody, TaskItem } from '../styles/Tasks.css';

function Tasks() {

  const { loading, request, error } = useHttp();

  const auth = useContext(AuthContext);

  const [item, setItem] = useState('');
  const [tasks, setTasks] = useState([]);

  const changeTask = (data) => {
    setTasks(data);
  }

  const changeItem = (data) => {
    setItem(data);
  }

  const { logoutHadler, addTask } = taskEvents(
    auth, 
    request, 
    item, 
    tasks, 
    changeTask, 
    changeItem
  );

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

  const itemHandler = e => {
    setItem(e.target.value);
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
          {tasks.map((currentItem, index) => {
            return (              
              <Task
                key={index}
                currentItem={currentItem}
                tasks={tasks}
                changeTask={changeTask}                  
                request={request}
                loading={loading}
              />           
            )
          })}
        </ul>        
      </TaskItem> 
    </div>
  );
}

export default Tasks;
import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { useHttp } from '../hooks/http.hook';

import { taskEvents } from '../events/tasks.event';

import Skeleton from './Skeleton';
import Task from './Task';

import { NavBar } from '../styles/NavBar.css';
import { TaskBody, TaskItem } from '../styles/Tasks.css';
import { SkeletonWrapCSS, SkeletonCSS } from '../styles/Skeleton.css';

function Tasks() {

  const { loading, request, error } = useHttp();

  const auth = useContext(AuthContext);

  const skeleton = [0, 0, 0, 0, 0];

  const [item, setItem] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dataHasLoad, setDataHasLoad] = useState(false);

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
      if (response) setDataHasLoad(true);

      if (error) {
        auth.logout();
      }

    }

    getTaskData();
  }, [request, auth, error]);

  const itemHandler = e => {
    setItem(e.target.value);
  }

  const onDragEnd = async result => {

    if (!result.destination) {
      return;
    }

    const reorderItems = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    const priorityChange = reorderItems.map((item, index) => {
      return {
        _id: item._id,
        task: item.task,
        complited: item.complited,
        owner: item.owner,
        priority: index + 1,
        date: item.date,
      }
    });

    setTasks(priorityChange);

    await request(
      '/api/tasks/change',
      'PUT',
      { 
        tasks: priorityChange,
        command: 'DROP'
      },
      {
        autorization: `Bearer ${auth.token}`
      }
    );
    
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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
      {dataHasLoad ?
        <TaskItem>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((currentItem, index) => (
                    <Task
                      key={index}
                      index={index}
                      currentItem={currentItem}
                      tasks={tasks}
                      changeTask={changeTask}                  
                      request={request}
                      loading={loading}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>     
        </TaskItem>
        :
        <SkeletonWrapCSS>
          {
            skeleton.map((item, index) => (
              <SkeletonCSS key={index} >
                <Skeleton/>
              </SkeletonCSS>
            ))
          }
        </SkeletonWrapCSS>
      }
    </div>
  );
}

export default Tasks;
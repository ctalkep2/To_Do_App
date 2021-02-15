import React, { useState, useEffect, useContext } from 'react';
import TaskEditor from 'react-textarea-autosize';

import { AuthContext } from '../context/AuthContext';

import { taskEvents } from '../events/tasks.event';

import { 
  ArrowDown, 
  ArrowUp, 
  RemoveTask,
  CompliteTask,
  // TaskEditor,
  CheckComplited
} from '../styles/Tasks.css';

function Task(props) {

  const { 
    currentItem, 
    tasks, 
    changeTask, 
    item, 
    changeItem, 
    request,
    loading } = props;

  const [click, setClick] = useState(false);
  const [editTask, setEditTask] = useState(currentItem.task);

  const auth = useContext(AuthContext);  

  const {
    removeHandler, 
    priorityUpHandler,
    priorityDownHandler,
    compliteHandler
  } = taskEvents(
    auth, 
    request, 
    item, 
    tasks, 
    changeTask, 
    changeItem
  );

  useEffect(() => {
    if (click === true) {
      const editor = document.getElementById(currentItem._id + 'editor');

      editor.focus();
    }    

  }, [click, currentItem]);

  const saveEdit = async e => {
    if (editTask !== currentItem.task) {
      let oneTask;    
      let newTasks = tasks.map((elem, index) => {

        if (elem._id === currentItem._id) {

          oneTask = {
            _id: elem._id,
            task: editTask,
            complited: elem.complited,
            owner: elem.owner,
            priority: elem.priority,
            date: elem.date,
          };

          return oneTask;
        }

        return elem;
      });    

      await request(
        '/api/tasks/change',
        'PUT',
        { 
          task: oneTask,
          id: currentItem._id,
          command: 'EDIT'
        },
        {
          autorization: `Bearer ${auth.token}`
        }
      );

      changeTask(newTasks);
    }

    setClick(!click);
  }

  const beginEditHandler = e => {
    setClick(!click);
  }

  const changingHandler = e => {
    setEditTask(e.target.value);
  }  

  return (
    <li
      id={currentItem._id}
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
          id={currentItem._id + 1}
          onChange={compliteHandler}
          checked={currentItem.complited} 
          disabled={loading}
          type="checkbox"
        />
        <label htmlFor={currentItem._id + 1}></label>
      </CheckComplited>
        <div>
          {!click ?           
            <CompliteTask
              id={currentItem._id + 'task'}
              complite={currentItem.complited}
              onClick={beginEditHandler}
            >
              {currentItem.task}
            </CompliteTask>
          :           
            <TaskEditor
              id={currentItem._id + 'editor'}
              value={editTask}
              onChange={changingHandler}
              onBlur={saveEdit}
            />

            }
        </div>
    </li>              
  )
}

export default Task;
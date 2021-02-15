import React, { useState, useEffect, useContext } from 'react';
import TaskEditor from 'react-textarea-autosize';

import { AuthContext } from '../context/AuthContext';

import { oneTaskEvents } from '../events/oneTask.event';

import { 
  ArrowDown, 
  ArrowUp, 
  RemoveTask,
  CompliteTask,
  CheckComplited
} from '../styles/Tasks.css';

function Task(props) {

  const { 
    currentItem, 
    tasks, 
    changeTask,
    request,
    loading } = props;

  const [click, setClick] = useState(false);
  const [editTask, setEditTask] = useState(currentItem.task);

  const auth = useContext(AuthContext);  

  const {
    removeHandler, 
    priorityUpHandler,
    priorityDownHandler,
    compliteHandler,
    saveEdit
  } = oneTaskEvents(
    auth, 
    request,
    tasks, 
    changeTask,
    editTask,
    currentItem
  );

  useEffect(() => {
    if (click === true) {
      const editor = document.getElementById(currentItem._id + 'editor');

      editor.focus();
    }    

  }, [click, currentItem]);

  const onBlurAction = async e => {
    await saveEdit(e)

    await setClick(!click);
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
              onBlur={onBlurAction}
            />

            }
        </div>
    </li>              
  )
}

export default Task;
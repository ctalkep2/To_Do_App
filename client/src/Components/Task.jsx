import React, { useState, useEffect, useContext } from 'react';
import { Draggable } from "react-beautiful-dnd";
import TaskEditor from 'react-textarea-autosize';

import { AuthContext } from '../context/AuthContext';

import { oneTaskEvents } from '../events/oneTask.event';

import {
  RemoveTask,
  CompliteTask,
  CheckComplited
} from '../styles/Tasks.css';

function Task(props) {

  const {
    index,
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    border: '1px solid #ccc',
    borderRadius: '5px',
    background: isDragging ? "#fff" : "#fff",
    ...draggableStyle
  });

  return (
    <Draggable draggableId={currentItem._id + '_' + index} index={index}>
      {(provided, snapshot) => (
        <li
          id={currentItem._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
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
      )}
    </Draggable>             
  )
}

export default Task;
import React, { useState } from 'react';

function Task(props) {

	const removeHandler = async e => {

		const [activeChange, setActiveChange] = useState(true);

    const data = await props.request(
      '/api/tasks/delete',
      'DELETE',
      { id: e.target.parentNode.id },
      {
        autorization: `Bearer ${props.auth.token}`
      }
    );

    setTasks(data);

  }

  const priorityUpHandler = async e => {

    const data = await props.request(
      '/api/tasks/change',
      'PUT',
      { 
        id: e.target.parentNode.id,
        command: 'UP'
      },
      {
        autorization: `Bearer ${props.auth.token}`
      }
    );

    if (data) setTasks(data)
  }

  const priorityDownHandler = async e => {

    const data = await props.request(
      '/api/tasks/change',
      'PUT',
      { 
        id: e.target.parentNode.id,
        command: 'DOWN'
      },
      {
        autorization: `Bearer ${props.auth.token}`
      }
    );

    if (data) setTasks(data)
  }

  const changeTask = e => {
    e.preventDefault();

    setActiveChange(false);

    const textArea = document.createElement("textarea");
    console.log(e.target.parentNode.children[3])
    textArea.innerHTML = e.target.parentNode.children[3].innerHTML;
    textArea.setAttribute('rows', 1)

    e.target.parentNode.replaceChild(
      textArea,
      e.target.parentNode.children[3]
    );

    const autosize = () => {

      setTimeout(() => {

        textArea.style.cssText = 'height:auto; padding:0';
        textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';

      }, 0);
    }

    autosize();

    textArea.addEventListener('keydown', autosize);
  }

  const applyTask = e => {
    e.preventDefault();

    setActiveChange(true);
  }
	
	if (props.tasks.length) {
		props.tasks.map((item, index) => {
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
          <div>
            {item.task}
          </div>
          {
            activeChange ?
            (<ChangeTask onClick={changeTask} />) :
            (<ApplyTask onClick={applyTask} />)  
          }     
        </li>
      )
    })
   } else {
   	return (<div>EMPTY</div>)
   }
}

export default Task;
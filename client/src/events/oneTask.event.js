export const oneTaskEvents 
	= (auth, request, tasks, changeTask, editTask, currentItem) => {

	const removeHandler = async e => {

    const data = await request(
      '/api/tasks/delete',
      'DELETE',
      { id: e.target.parentNode.id },
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    changeTask(data);
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

    if (data) changeTask(data)
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

    if (data) changeTask(data)
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

    if (data) changeTask(data)
  }

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
  }

 	return {
		removeHandler, 
		priorityUpHandler, 
		priorityDownHandler,
		compliteHandler,
		saveEdit
	}
}
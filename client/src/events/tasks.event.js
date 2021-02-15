export const taskEvents = (auth, request, item, tasks, changeTask, changeItem) => {

	const logoutHadler = () => {
		auth.logout();
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

      changeTask([...tasks, data]);
    }

    changeItem('');
  }

	return { 
		logoutHadler, 
		removeHandler, 
		priorityUpHandler, 
		priorityDownHandler,
		compliteHandler,
		addTask
	}
}
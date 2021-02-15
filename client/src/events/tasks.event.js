export const taskEvents = (auth, request, item, tasks, changeTask, changeItem) => {

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

      changeTask([...tasks, data]);
    }

    changeItem('');
  }

	return { 
		logoutHadler,
		addTask
	}
}
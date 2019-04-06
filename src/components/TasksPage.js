import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddItem from './AddItem';
import AddMultiple from './AddMultiple';


import {
    Tab,
  } from 'semantic-ui-react';


function TasksPage() {
    const [state, ,] = useContext(GlobalContext);
    const panes = [
      { menuItem: 'All Tasks', render: () => <Tab.Pane><AddMultiple itemTypes={state.itemTypes} title='All Tasks'/></Tab.Pane> },
      { menuItem: 'Add Single', render: () => <Tab.Pane><AddItem /></Tab.Pane> },
      ];
    state.taskLists.forEach(taskList => {
        const tabName = `${taskList.value} Task List`;
        const itemsInList = taskList.notes.split(',');
        const itemTypes = itemsInList.reduce((result, key) => ({ ...result, [key]: state.itemTypes[key] }), {});
        panes.push({ menuItem: { key: taskList.id, content: tabName }, render: () => <Tab.Pane><AddMultiple itemTypes={itemTypes} title={tabName}/></Tab.Pane> });
    });

    return (
        <Tab  menu={{ pointing: true, className: "wrapped" }} panes={panes} />
    );
}

export default TasksPage;

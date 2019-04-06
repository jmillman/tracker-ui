import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddItem from './AddItem';
import AddMultiple from './AddMultiple';
import SelectList from './SelectList';


import {
    Tab, Segment, SegmentGroup, Grid
  } from 'semantic-ui-react';


// function TasksPage() {
//     const [state, ,] = useContext(GlobalContext);
//     const panes = [
//       { menuItem: 'All Tasks', render: () => <Tab.Pane fluid><AddMultiple itemTypes={state.itemTypes} title='All Tasks'/></Tab.Pane> },
//       { menuItem: 'Add Single', render: () => <Tab.Pane><AddItem /></Tab.Pane> },
//       ];
//     state.taskLists.forEach(taskList => {
//         const tabName = `${taskList.value} Task List`;
//         const itemsInList = taskList.notes.split(',');
//         const itemTypes = itemsInList.reduce((result, key) => ({ ...result, [key]: state.itemTypes[key] }), {});
//         panes.push({ menuItem: { key: taskList.id, content: tabName }, render: () => <Tab.Pane><AddMultiple itemTypes={itemTypes} title={tabName}/></Tab.Pane> });
//     });

//     return (
//         <Tab  menu={{ pointing: true, className: "wrapped" }} panes={panes} />
//     );
// }

const ALL = 'All Tasks';

function TasksPage() {
  const [state, ,] = useContext(GlobalContext);
  const [taskListToEditId, setTaskListToEditId] = useState(ALL);
  const [itemTypes, setItemTypes] = useState({});
  const [optionItems, setOptionItems] = useState([{id: ALL, value: ALL}]);
  const [name, setName] = useState(ALL);

  useEffect(() => {
      setOptionItems(optionItems.concat(state.taskLists));
  }, [state.taskLists]);  

  useEffect(() => {
        setItemTypes(state.itemTypes);
  }, [state.itemTypes]);  

  function handleSelectTaskList(taskID) {
      if(taskID === ALL) {
        setTaskListToEditId(ALL);
        setName(ALL);
        setItemTypes(state.itemTypes);
      }
      else{
        const taskList = state.taskLists.filter(taskList => { return taskList.id === taskID })[0];
        const itemsInList = taskList.notes.split(',');
        const itemTypes = itemsInList.reduce((result, key) => ({ ...result, [key]: state.itemTypes[key] }), {});  
        setTaskListToEditId(taskID);
        setName(taskList.value);
        setItemTypes(itemTypes);
      }
}

return (
    <>
        <Grid columns='equal' padded>
          <Grid.Row key={'TaskPage'}>
            <Grid.Column width={5}>
              <SelectList
                fluid
                callback={handleSelectTaskList}
                // optionItems={state.taskLists}
                optionItems={optionItems}
                selected={taskListToEditId}
                placeholder={'Select a task list to edit'}
                textKey={'value'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      <AddMultiple itemTypes={itemTypes} title={name} />
    </>

  );
}
export default TasksPage;

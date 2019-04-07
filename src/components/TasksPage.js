import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddMultiple from './AddMultiple';
import SelectList from './SelectList';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';


import {
    Grid
  } from 'semantic-ui-react';


const ALL = 'All Tasks';

function TasksPage() {
  const [state, ,] = useContext(GlobalContext);
  const [taskListToEditId, setTaskListToEditId] = useState(ALL);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [itemTypes, setItemTypes] = useState({});
  const [name, setName] = useState(ALL);
  const optionItems = [{id: ALL, value: ALL}].concat(state.taskLists);
  
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


function handleChangeDate(event, {name, value}) {
  setDate(value);
  handleSelectTaskList(taskListToEditId);
}

return (
    <>
        <Grid columns='equal' padded>
          <Grid.Row key={'TaskPage'}>
            <Grid.Column width={15}>
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
          <Grid.Row key={'Calendar'}>
            <Grid.Column width={15}>
              <DateInput
                  name="date"
                  placeholder="Date"
                  dateFormat='YYYY-MM-DD'
                  value={date}
                  iconPosition="left"
                  onChange={handleChangeDate}
                  closable={true}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      <AddMultiple  key={date + name} itemTypes={itemTypes} date={date} />
    </>

  );
}
export default TasksPage;

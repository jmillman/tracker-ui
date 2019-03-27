import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddItem from './AddItem';
import AddMultiple from './AddMultiple';


import {
    Container,
    Segment,
    Tab,
  } from 'semantic-ui-react';


function TasksPage() {
    const [state, ,] = useContext(GlobalContext);
    const panes = [
        { menuItem: 'Add Single', render: () => <Tab.Pane><AddItem /></Tab.Pane> },
        { menuItem: 'Add Multiple', render: () => <Tab.Pane><AddMultiple itemTypes={state.itemTypes} title='All Tasks'/></Tab.Pane> },
      ];
    state.taskLists.forEach(taskList => {
        const tabName = `${taskList.value} Task List`;
        const itemsInList = taskList.notes.split(',');
        const itemTypes = itemsInList.reduce((result, key) => ({ ...result, [key]: state.itemTypes[key] }), {});
        panes.push({ menuItem: tabName, render: () => <Tab.Pane><AddMultiple itemTypes={itemTypes} title={tabName}/></Tab.Pane> });
    });

    return (
        <Container text>
            <Segment.Group>
                <Segment>
                    <Tab panes={panes} />
                </Segment>
            </Segment.Group>
        </Container>
    );
}

export default TasksPage;

import React from 'react';
import CreateTaskList from './CreateTaskList';
import ItemTypePage from './ItemTypePage';

import {
    Container,
    Segment,
    Tab,
  } from 'semantic-ui-react';


function SettingsPage() {
    const panes = [
        { menuItem: 'Task Lists', render: () => <Tab.Pane><CreateTaskList /></Tab.Pane> },
        { menuItem: 'Item Types', render: () => <Tab.Pane><ItemTypePage /></Tab.Pane> },
      ];
    
    return (
        <Container>
            <Segment.Group>
                <Segment>
                    <Tab panes={panes} />
                </Segment>
            </Segment.Group>
        </Container>
    );
}

export default SettingsPage;

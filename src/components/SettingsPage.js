import React from 'react';
import CreateTaskList from './CreateTaskList';
import ItemTypePage from './ItemTypePage';
import CreateViewsPage from './CreateViewsPage';
import CreateUsersPage from './CreateUsersPage';

import {
    Container,
    Segment,
    Tab,
  } from 'semantic-ui-react';


function SettingsPage() {
    const panes = [
        { menuItem: 'Create Task Lists', render: () => <Tab.Pane><CreateTaskList /></Tab.Pane> },
        { menuItem: 'Item Types', render: () => <Tab.Pane><ItemTypePage /></Tab.Pane> },
        { menuItem: 'Create Views', render: () => <Tab.Pane><CreateViewsPage /></Tab.Pane> },
        { menuItem: 'Create Users', render: () => <Tab.Pane><CreateUsersPage /></Tab.Pane> },
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

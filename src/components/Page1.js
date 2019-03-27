import React, { useState } from 'react';
import ViewsPage from './ViewsPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';

import {
    Segment,
    Menu,
    Grid,
  } from 'semantic-ui-react';

const tabs = {
    VIEWS_PAGE: 'View',
    COMPLETE_TASKS: 'Do',
    SETTINGS_PAGE: 'Settings',
};

function Page1() {
    const [ selectedTab, setSelectedTab ] = useState(tabs.VIEWS_PAGE);

    function getTab(tabName) {
        return(<Menu.Item key={tabName} name={tabName} active={selectedTab === tabName} onClick={()=> setSelectedTab(tabName)} />);
    }

    function getContent() {
        switch(selectedTab) {
            case tabs.VIEWS_PAGE:
                return(<ViewsPage />);
            case tabs.COMPLETE_TASKS:
                return(<TasksPage />);
            case tabs.SETTINGS_PAGE:
                return(<SettingsPage />);

            default:
                throw new Error('Component Not Found');
        }        
    }
    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    {getTab(tabs.COMPLETE_TASKS)}
                    {getTab(tabs.VIEWS_PAGE)}
                    {getTab(tabs.SETTINGS_PAGE)}
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                <Segment>
                    {getContent()}
                </Segment>
                </Grid.Column>
            </Grid>


        </>
    );
}

export default Page1;
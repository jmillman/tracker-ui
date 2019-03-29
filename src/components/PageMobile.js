import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Icon, Menu } from 'semantic-ui-react'
import ViewsPage from './ViewsPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import LoginUserForm from './LoginUserForm';

const tabs = {
    VIEWS_PAGE: 'View',
    COMPLETE_TASKS: 'Do',
    SETTINGS_PAGE: 'Settings',
    LOGIN: 'Login',
};


function PageMobile() {
    const [state , ,] = useContext(GlobalContext);

  const [ selectedTab, setSelectedTab ] = useState(tabs.VIEWS_PAGE);

  function getContent() {
    switch(selectedTab) {
        case tabs.VIEWS_PAGE:
            return(<ViewsPage />);
        case tabs.COMPLETE_TASKS:
            return(<TasksPage />);
        case tabs.SETTINGS_PAGE:
            return(<SettingsPage />);
        case tabs.LOGIN:
            return(<LoginUserForm />);

        default:
            throw new Error('Component Not Found');
    }        
}
function getLoggedInName() {
    if (state.loggedInUser) {
        return `Hi ${state.loggedInUser.name}!`;
    }
    return 'Please Login';
}

    return(
      <>
        <Menu size='huge'>
            <Menu.Item name='home'
                onClick={()=> setSelectedTab(tabs.SETTINGS_PAGE)} 
            //   onClick={handleShowClick}
            >
                <Icon name='setting' />
            </Menu.Item>
            <Menu.Item
                name='Do'
                onClick={()=> setSelectedTab(tabs.COMPLETE_TASKS)} 
            />
            <Menu.Item
                name='View'
                onClick={()=> setSelectedTab(tabs.VIEWS_PAGE)} 
            />
            <Menu.Menu position='right'>
                <Menu.Item key={tabs.LOGIN} name={getLoggedInName()} active={selectedTab === tabs.LOGIN} onClick={()=> setSelectedTab(tabs.LOGIN)} />
            </Menu.Menu>
        </Menu>
        {getContent()}
      </>
    )
}


export default PageMobile;
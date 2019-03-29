import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
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
  const [ visible, setVisible ] = useState(false);

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

  const handleShowClick = () => {
      console.error(visible);
      setVisible(!visible);
  }

    return(

      <div>
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

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='sidebar' />
              Home1
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='home' />
              Home2
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              {getContent()}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
}


export default PageMobile;
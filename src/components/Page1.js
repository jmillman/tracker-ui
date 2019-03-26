import React, { useState, useContext } from 'react';
import ItemCards from './ItemCards';
import AddItem from './AddItem';
import AddItemType from './AddItemType';
import AddMultiple from './AddMultiple';
import ItemTypesList from './ItemTypesList';
import CreateTaskList from './CreateTaskList';
import GlobalContext from '../store/GlobalContext';

import {
    Segment,
    Menu,
    Grid,
  } from 'semantic-ui-react';

const tabs = {
    LIST: 'LIST',
    ADD_SINGLE: 'ADD_SINGLE',
    ADD_MULTIPLE: 'ADD_MULTIPLE',
    ADD_ITEMTYPE: 'ADD_ITEMTYPE',
    ITEM_TYPES_LIST: 'ITEM_TYPES_LIST',
    CREATE_TASK_LIST: 'CREATE_TASK_LIST',
};

function Page1() {
    const [ selectedTab, setSelectedTab ] = useState(tabs.CREATE_TASK_LIST);
    const [state , ,] = useContext(GlobalContext);

    function getTab(tabName) {
        return(<Menu.Item key={tabName} name={tabName} active={selectedTab === tabName} onClick={()=> setSelectedTab(tabName)} />);
    }

    function getTaskListTabs() {
        return state.taskLists.map((taskList) => {
            const tabName = `${taskList.value} Task List`;
            const tabId = `taskList_${taskList.id}`;
            return(<Menu.Item key={tabId} name={tabName} active={selectedTab === tabId} onClick={()=> setSelectedTab(tabId)} />);
        });
    }

    function getContent() {
        if(selectedTab.includes('taskList_')){
            const id = selectedTab.split('_')[1];
            const taskList = state.taskLists.filter((taskList)=>taskList.id === id)[0];
            const itemsInList = taskList.notes.split(',');
            const itemTypes = state.itemTypes.filter((taskList)=>{return itemsInList.includes(taskList.id)});
            return(<AddMultiple itemTypes={itemTypes} title={taskList.value}/>);
        }

        switch(selectedTab) {
            case tabs.LIST:
                return(<ItemCards />);
            case tabs.ADD_MULTIPLE:
                return(<AddMultiple itemTypes={state.itemTypes} title='All Tasks'/>);
            case tabs.CREATE_ITEMTYPE:
                return(<AddItemType />);
            case tabs.ADD_SINGLE:
                return(<AddItem />);
            case tabs.ADD_ITEMTYPE:
                return(<AddItemType />);
            case tabs.ITEM_TYPES_LIST:
                return(<ItemTypesList />);
            case tabs.CREATE_TASK_LIST:
                return(<CreateTaskList />);

            default:
                throw new Error('Component Not Found');
        }        
    }
    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    {getTab(tabs.LIST)}
                    {getTab(tabs.ADD_SINGLE)}
                    {getTab(tabs.ADD_MULTIPLE)}
                    {getTab(tabs.ADD_ITEMTYPE)}
                    {getTab(tabs.ITEM_TYPES_LIST)}
                    {getTab(tabs.CREATE_TASK_LIST)}                    
                    {getTaskListTabs()}
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
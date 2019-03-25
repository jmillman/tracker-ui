import React, { useState } from 'react';
import ItemCards from './ItemCards';
import AddItem from './AddItem';
import AddItemType from './AddItemType';
import AddMultiple from './AddMultiple';
import ItemTypesList from './ItemTypesList';

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
    ITEM_TYPES_LIST: 'ITEM_TYPES_LIST'
};

function Page1() {
    const [ selectedTab, setSelectedTab ] = useState(tabs.ITEM_TYPES_LIST);

    function getTab(tabName) {
        return(<Menu.Item key={tabName} name={tabName} active={selectedTab === tabName} onClick={()=> setSelectedTab(tabName)} />);
    }
    function getContent() {
        switch(selectedTab) {
            case tabs.LIST:
                return(<ItemCards />);
            case tabs.ADD_MULTIPLE:
                return(<AddMultiple />);
            case tabs.CREATE_ITEMTYPE:
                return(<AddItemType />);
            case tabs.ADD_SINGLE:
                return(<AddItem />);
            case tabs.ADD_ITEMTYPE:
                return(<AddItemType />);
            case tabs.ITEM_TYPES_LIST:
                return(<ItemTypesList />);
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
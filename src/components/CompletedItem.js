import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
// import { debug } from '../utils';
import {
    Table,
    Icon,
    Button,
  } from 'semantic-ui-react';

function CompletedItem(props) {
    const [state, , api] = useContext(GlobalContext);
    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    function getItemTypeName(item) {
        if(state.itemTypes) {
            const itemTypeName = state.itemTypes[item.typeId];
            return itemTypeName ? itemTypeName.name: item.typeId;
        }
        return item.typeId;
    }

    function getItemDisplay(item) {
        return (
            <Table fluid definition key={item.id}>
                <Table.Body key={`ITEM_${item.id}`}>
                    <Table.Row>
                        <Table.Cell width={2}>Name</Table.Cell>
                        <Table.Cell>{getItemTypeName(item)}</Table.Cell>
                    </Table.Row>
                    {item.value ? 
                        <Table.Row>
                            <Table.Cell>Value</Table.Cell>
                            <Table.Cell>{item.value}</Table.Cell>
                        </Table.Row>
                    : null}
                    <Table.Row>
                    <Table.Cell>Dates</Table.Cell>
                    <Table.Cell>
                        {item.date}
                        <Button
                            icon
                            onClick={() => handleClickDelete(item.id)}
                            floated='right'
                        >
                            <Icon
                                color='red'
                                name='cancel'
                                key={item.i}
                            />   
                        </Button>                        
                    </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>            
        );
    }

    const item = props.item;
    return(
        <>
            {getItemDisplay(item)}
        </>
    );
}

export default CompletedItem;
import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import {
    Segment,
    Table,
    Icon,
    Button,
  } from 'semantic-ui-react';

function CompletedItem(props) {
    const [, , api] = useContext(GlobalContext);
    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    function getItemDisplay(item) {
        return (
            <Table definition key={item.id}>
                <Table.Body key={`ITEM_${item.id}`}>
                    <Table.Row>
                        <Table.Cell width={2}>Name</Table.Cell>
                        <Table.Cell>{api.getItemTypeName(item.typeId)}</Table.Cell>
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
        <Segment key={item.id}>
            {getItemDisplay(item)}
        </Segment>

    );
}

export default CompletedItem;
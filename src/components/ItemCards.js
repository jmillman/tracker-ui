import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import { DateInput } from 'semantic-ui-calendar-react';

import {
    Container,
    Button,
    Segment,
    Table,
  } from 'semantic-ui-react';

function ItemCard() {
    const [state, , api] = useContext(GlobalContext);
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));

    function handleChange(event, {name, value}) {
        setDate(value);
    }
    
    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    function getItemDisplay(item) {
        return (
            <Table definition key={item.id}>
                <Table.Body>
                    <Table.Row>
                    <Table.Cell width={2}>typeId</Table.Cell>
                    <Table.Cell>{api.getItemTypeName(item.typeId)}</Table.Cell>
                    </Table.Row>
                    {item.value ? 
                    <Table.Row>
                    <Table.Cell>Value</Table.Cell>
                    <Table.Cell>{item.value}</Table.Cell>
                    </Table.Row>
                    : null}
                    <Table.Row>
                    <Table.Cell>Date</Table.Cell>
                    <Table.Cell>{item.date}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>            
        );
    }


    return (
        <>
            <Container text>
                <Segment.Group>
                    {state.data && state.data.map(item => {
                        return (
                            <Segment key={item.id}>
                                {getItemDisplay(item)}
                                <Button negative
                                    key={item.i}
                                    onClick={() => handleClickDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </Segment>
                        );
                    })}
                    <Segment>
                        <DateInput
                            name="date"
                            placeholder="Date"
                            value={date}
                            iconPosition="left"
                            onChange={handleChange}
                        />
                    </Segment>
                </Segment.Group>
            </Container>
        </>
    );
}

export default ItemCard;
  
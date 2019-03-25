import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';


import {
    Container,
    Button,
    Segment,
    Table,
  } from 'semantic-ui-react';

function ItemCard() {
    const [state, , api] = useContext(GlobalContext);

    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    function getItemDisplay(item) {
        return (
            <Table definition key={item.id}>
                <Table.Body>
                    <Table.Row>
                    <Table.Cell width={2}>Type</Table.Cell>
                    <Table.Cell>{item.type}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Value</Table.Cell>
                    <Table.Cell>{item.value}</Table.Cell>
                    </Table.Row>
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
                </Segment.Group>
            </Container>
        </>
    );
}

export default ItemCard;
  
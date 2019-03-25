import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';

import {
    Container,
    Button,
    Segment,
    Table,
    Message,
  } from 'semantic-ui-react';

function ItemTypesList() {
    const [state, , api] = useContext(GlobalContext);
    const [formStatus, setFormStatus] = useState(null);

    async function callback(result) {
        if(result.status === 'error') {
            setFormStatus({status: result.status, message: result.message});
        }
    }

    function handleClickDelete(id) {
        api.deleteItemTypeFromApp(id, callback);
    }

    function getItemTypeDisplay(item) {
        return (
            <Table definition key={item.id}>
                <Table.Body>
                    <Table.Row>
                    <Table.Cell width={2}>Name</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>dataType_1</Table.Cell>
                    <Table.Cell>{item.dataType_1}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>dataName_1</Table.Cell>
                    <Table.Cell>{item.dataName_1}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>            
        );
    }

    return (
        <>
            <Container text>
                <Segment.Group>
                    {state.itemTypes && state.itemTypes.map(item => {
                        return (
                            <Segment key={item.id}>
                                {getItemTypeDisplay(item)}
                                <Button negative
                                    key={item.i}
                                    onClick={() => handleClickDelete(item.id)}
                                >
                                    Delete
                                </Button>
    
                                {formStatus && formStatus.status ? 
                                    <Message
                                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                                    content={formStatus && formStatus.message}
                                    />
                                : null}

                            </Segment>
                        );
                    })}
                </Segment.Group>
            </Container>
        </>
    );
}

export default ItemTypesList;
  
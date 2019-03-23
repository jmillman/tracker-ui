import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import { debug } from '../utils';

import {
    Container,
    Button,
    Segment,
  } from 'semantic-ui-react';

function ItemCard() {
    const [state, , api] = useContext(GlobalContext);

    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }
    return (
        <>
            <Container text>
                <Segment.Group>
                    {state.data && state.data.map(item => {
                        return (
                            <Segment key={item.id}>
                                {item.value} {item.type} {item.date}
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
  
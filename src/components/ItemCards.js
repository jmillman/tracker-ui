import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';

import {
    Container,
    Button,
    Segment,
    Header,
  } from 'semantic-ui-react';

function ItemCard() {
    const [state, , api] = useContext(GlobalContext);

    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    return (
        <>
            <Header as='h3' textAlign='center' content='Container' />
            <Container text>
                <Segment.Group>
                    <Segment>
                        <Button onClick={api.fetchItemsFromApp}>
                            Refresh
                        </Button>
                    </Segment>
                    {state.data && state.data.map(item => {
                        return (
                            <Segment key={item.id}>
                                {item.value}
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
  
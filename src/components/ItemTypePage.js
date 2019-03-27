import React from 'react';
import AddItemType from './AddItemType';
import ItemTypesList from './ItemTypesList';


import {
    Container,
    Segment,
  } from 'semantic-ui-react';

  
function ItemTypePage() {
    return (
        <Container>
            <Segment.Group>
                <Segment>
                    <AddItemType />
                </Segment>
                <Segment>
                    <ItemTypesList />
                </Segment>
            </Segment.Group>
        </Container>
    );
}

export default ItemTypePage;
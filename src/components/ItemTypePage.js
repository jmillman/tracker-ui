import React, { useState, useContext, useRef } from 'react';
import AddItem from './AddItem';
import GlobalContext from '../store/GlobalContext';
import AddItemType from './AddItemType';
import ItemTypesList from './ItemTypesList';


import {
    Container,
    Segment,
    Message,
    Checkbox,
    Form,
    Button
  } from 'semantic-ui-react';

  
function ItemTypePage() {
    const [state , , api] = useContext(GlobalContext);

    return (
        <Container text>
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
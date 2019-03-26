import React, { useState, useContext } from 'react';
import AddItem from './AddItem';


import {
    Container,
    Segment,
  } from 'semantic-ui-react';

  
function AddMultiple(props) {
    const [closedAddIds, setAddIds] = useState([]);

    // keep and array of the closedItems, and if they are closed, don't render
    function closeItem(itemId) {
        setAddIds(closedAddIds.concat(itemId));
    }
    return (
        <Container text>
            <Segment.Group>
                <Segment textAlign='center'>
                    {props.title}
                </Segment>
                <Segment>
                    {props.itemTypes.map((itemType) => {
                        if(!closedAddIds.includes(itemType.id)) {
                            return(<AddItem key={itemType.id} itemType={itemType} closeMe={closeItem}/>);
                        }
                        return null;
                    })}
                </Segment>
            </Segment.Group>
        </Container>
    );
}

export default AddMultiple;
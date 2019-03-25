import React, { useState, useContext } from 'react';
import AddItem from './AddItem';
import GlobalContext from '../store/GlobalContext';


import {
    Container,
    Segment,
  } from 'semantic-ui-react';

  
function AddMultiple() {
    const [closedAddIds, setAddIds] = useState([]);
    const [state , ,] = useContext(GlobalContext);

    // keep and array of the closedItems, and if they are closed, don't render
    function closeItem(itemId) {
        setAddIds(closedAddIds.concat(itemId));
    }

    return (
        <Container text>
            <Segment.Group>
                <Segment>
                    {state.itemTypes.map((itemType) => {
                        if(!closedAddIds.includes(itemType.name)) {
                            // debug({item});
                            return(<AddItem key={itemType.name} itemType={itemType} closeMe={closeItem}/>);
                        }
                        return null;
                    })}
                </Segment>
            </Segment.Group>
        </Container>
    );
}

export default AddMultiple;
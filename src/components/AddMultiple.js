import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddItem from './AddItem';


import {
    Container,
    Segment,
    Grid,
  } from 'semantic-ui-react';

  
function AddMultiple(props) {
    const [state , , ] = useContext(GlobalContext);
    const [closedAddIds, setAddIds] = useState([]);

    // keep and array of the closedItems, and if they are closed, don't render
    function closeItem(itemId) {
        setAddIds(closedAddIds.concat(itemId));
    }
    return (
        <Container>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Segment>{props.title}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    {Object.keys(props.itemTypes).map((itemTypeId) => {
                        const itemType = state.itemTypes[itemTypeId];
                        if(itemType && !closedAddIds.includes(itemType.id)) {
                            return(<AddItem key={itemType.id} itemType={itemType} callback={closeItem}/>);
                        }
                        return null;
                    })}
                </Grid>
        </Container>
    );
}

export default AddMultiple;
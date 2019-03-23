import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';

import {
    Container,
    Button,
    Header
  } from 'semantic-ui-react';

function AddItem() {
    const [ , , api] = useContext(GlobalContext);
    const [valueToAdd, setValueToAdd] = useState('');

    function handleClickCreate() {
        api.addItemFromApp(valueToAdd, 'GYM');
    }

    return (
        <>
            <Header as='h3' textAlign='center' content='Add Item' />
            <Container text>
                <input
                    type='text'
                    value={valueToAdd}
                    onChange={(e) => setValueToAdd(e.target.value)}
                />
                <Button positive
                    onClick={handleClickCreate}
                >
                    Add
                </Button>
            </Container>
        </>
    );
}

export default AddItem;
  
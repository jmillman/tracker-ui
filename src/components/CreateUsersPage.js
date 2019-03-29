import React, { useState, useContext, useRef } from 'react';
import GlobalContext from '../store/GlobalContext';

import {
    Container,
    Segment,
    Form,
    Button
  } from 'semantic-ui-react';

  
function CreateUsersPage() {
    const [ , , api] = useContext(GlobalContext);
    const [name, setName] = useState([]);
    const nameRef = useRef(null);

    function resetForm() {
        setName('')
        nameRef.current.focus();
    }
    
    async function callback(result) {
        console.error('CreateUsersPage result =%O', result);
    }

    function handleClickCreate() {
        api.createUserFromApp(name, callback);
    }

    return (
        <Container>
            <Form>
                <Segment.Group>
                    <Segment>
                        <Form.Field key={'AddButton'}>
                            <input
                                placeholder={'User name...'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                ref={nameRef}
                            />
                        </Form.Field>
                    </Segment>
                    <Segment>
                        <Form.Field key={'AddButton'}>
                            <Button positive onClick={handleClickCreate}>Add</Button>
                            <Button negative onClick={resetForm}>Cancel</Button>
                        </Form.Field>
                    </Segment>
                </Segment.Group>
            </Form>
        </Container>
    );
}

export default CreateUsersPage;
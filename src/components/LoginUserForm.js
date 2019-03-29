import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import SelectList from './SelectList';


import {
    Container,
    Segment,
    Form,
  } from 'semantic-ui-react';

  
function LoginUserForm() {
    const [state , , api] = useContext(GlobalContext);
    const [selectedUserId, setSelectedUserId] = useState('');

    function handleSelectUser(userId) {
        console.error('handleSelectUser userId=%O', userId);
        setSelectedUserId(userId)

        const user = state.users.find(({id}) => id === userId);
        api.loginUserFromApp(user);
    }

    return (
        <Container>
            <Form>
                <Segment.Group>
                    <Segment>
                        <SelectList
                            callback={handleSelectUser}
                            optionItems={state.users}
                            selected={selectedUserId}
                            placeholder={'Select a User...'}
                            textKey={'name'}
                        />
                    </Segment>
                </Segment.Group>
            </Form>
        </Container>
    );
}

export default LoginUserForm;
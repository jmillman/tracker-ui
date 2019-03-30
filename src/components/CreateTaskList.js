import React, { useState, useContext, useRef } from 'react';
import GlobalContext from '../store/GlobalContext';


import {
    Message,
    Segment,
    Checkbox,
    Form,
    Button
  } from 'semantic-ui-react';

  
function CreateTaskList() {
    const [state , , api] = useContext(GlobalContext);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [name, setName] = useState([]);
    const [formStatus, setFormStatus] = useState(null);
    const nameRef = useRef(null);

    function handleClickCheckbox(id, state) {
        if(state === true) {
            setCheckboxValues(checkboxValues.concat(id));
        }
        else{
            setCheckboxValues(checkboxValues.filter((value)=>value !== id));
        }
    }
    function resetForm() {
        setCheckboxValues([]);
        setName('')
        nameRef.current.focus();
    }
    
    async function callback(result) {
        if(result.status === 'success') {
            setFormStatus({status: 'success', message: 'Task List Saved'});
            setTimeout(resetForm, 1000);
        }
        else {
            // const obj = {status: result.status, message: result.message}
            setFormStatus({status: result.status, message: result.message});
        }
    }

    function handleClickCreate() {
        api.createListFromApp(name, checkboxValues, callback);
    }

    return (
        <Form>
            <Form.Field key={'AddButton'}>
                <input
                    placeholder={'Task list name...'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    ref={nameRef}
                />
            </Form.Field>
            {formStatus && formStatus.status ? 
                    <Message
                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                    content={formStatus && formStatus.message}
                    />
                : null}
            {Object.keys(state.itemTypes).map((itemTypeId) => {
                const itemType = state.itemTypes[itemTypeId];
                return(
                    <Segment key={itemType.id}>
                        <Checkbox
                            label={itemType.name}
                            onClick={(e, data)=>handleClickCheckbox(itemType.id, data.checked)}
                            checked={checkboxValues.includes(itemType.id)}
                            />
                    </Segment>
                    );
            })}
            <Form.Field key={'AddButton'}>
                <Button positive onClick={handleClickCreate}>Add</Button>
                <Button negative onClick={resetForm}>Cancel</Button>
            </Form.Field>
        </Form>
    );
}

export default CreateTaskList;
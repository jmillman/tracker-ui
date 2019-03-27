import React, { useState, useContext, useRef } from 'react';
import GlobalContext from '../store/GlobalContext';


import {
    Container,
    Segment,
    Checkbox,
    Form,
    Button
  } from 'semantic-ui-react';

  
function CreateTaskList() {
    const [state , , api] = useContext(GlobalContext);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [name, setName] = useState([]);
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
        console.error('CreateTaskList callback =%O', checkboxValues);
        // if (props.closeMe) {
        //     props.closeMe(selectedItemType);
        // } else {
        //     setSelectedItemType('');
        //     setValueToAdd('');
        // }
    }

    function handleClickCreate() {
        api.createListFromApp(name, checkboxValues, callback);
    }

    return (

        <Container text>
            <Form>
                <Segment.Group>
                    <Segment>
                            <Form.Field key={'AddButton'}>
                                <input
                                    placeholder={'Task list name...'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    ref={nameRef}
                                />
                            </Form.Field>
                    </Segment>
                    <Segment>
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
                    </Segment>
                    <Segment>
                        <Form.Field key={'AddButton'}>
                            <Button positive onClick={handleClickCreate}>Add</Button>
                            <Button negative onClick={resetForm}>Cancel</Button>
                        </Form.Field>
                    </Segment>
                    <Segment>
                        {JSON.stringify(checkboxValues)}
                    </Segment>
                </Segment.Group>
            </Form>
        </Container>
    );
}

export default CreateTaskList;
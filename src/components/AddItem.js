import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';

import { ItemDataTypes } from '../templates/itemTypes';

import {
    Button,
    Container,
    Form,
    Input,
    Segment,
    Select,
    Label,
  } from 'semantic-ui-react';

    // I have two different types of inputs, one you can type in, which is good for long lists
  const useTypingSelectionBox = false;

function AddItem(props) {
    const [state , , api] = useContext(GlobalContext);
    const [valueToAdd, setValueToAdd] = useState('');
    const [selectedItemType, setSelectedItemType] = useState(props.itemType ? props.itemType.id : '');
    
    async function closeMe() {
        if (props.closeMe) {
            props.closeMe(selectedItemType);
        } else {
            setSelectedItemType('');
            setValueToAdd('');
        }
    }

    function handleClickCreate() {
        api.addItemFromApp(valueToAdd, selectedItemType, closeMe);
    }

    function itemFormChooser() {
        const itemTypes = state.itemTypes;
        const itemTypeSelected = itemTypes.find(({id}) => id === selectedItemType);
        const returnArray = [];
        if(itemTypeSelected) {
            switch(itemTypeSelected.dataType_1) {
                case ItemDataTypes.NUMBER:
                    returnArray.push (
                        <Form.Field key={'EventType'}>
                            <input
                                placeholder={itemTypeSelected.dataName_1}
                                value={valueToAdd}
                                onChange={(e) => setValueToAdd(e.target.value)}
                            />
                        </Form.Field>
                    );
                    break;
                case ItemDataTypes.EVENT:
                default:
                        break;
            }

            returnArray.push(
                <Form.Field key={'AddButton'}>
                    <Button positive onClick={handleClickCreate}>Add</Button>
                    <Button negative onClick={closeMe}>Cancel</Button>
                </Form.Field>
            );
        }
        else if (selectedItemType !== '') {
            returnArray.push(
                <Label color='red' key='addNotFound'>
                    Item Type Not Found
                </Label>
            );
        }

    return returnArray;
    }

    function getSelectTypeChooser() {
        const itemTypes = state.itemTypes;
        if( useTypingSelectionBox ) {
            return (
                <Form.Field>
                    <Input
                        list='itemTypesList'
                        placeholder='Select a type to track...'
                        onChange={(e)=>{setSelectedItemType(e.target.value)}}
                    /> 
                    <datalist id='itemTypesList'>
                    {itemTypes.map((itemType) => {
                        return (
                            <option
                                value={itemType.name}
                                key={itemType.id}
                            />
                        );
                    })}
                    </datalist>
                </Form.Field> 
            );
        }

        const pulldownOptions = itemTypes.map((itemType) => {
            return {
                key: itemType.name,
                text: itemType.name,
                value: itemType.id,
            };
        });

        return (
            <Form.Field>
                    <Select
                        placeholder='Select a type to track...'
                        options={pulldownOptions}
                        value={selectedItemType}
                        onChange={(e, data)=>{
                            setSelectedItemType(data.value)
                        }}
                    />
            </Form.Field>
        );


    }

    return (
        <>
            <Container text>
                <Form>
                    {getSelectTypeChooser()}
                    {itemFormChooser()}
                </Form>
            </Container>
        </>
    );
}

export default AddItem;
  
import React, { useState, useEffect } from 'react';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 

import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const createItem = `mutation createItem($value: String!){
    createItem(input:{
      value: $value
    }){
      __typename
      id
      value
    }
  }`;
  const readItems = `query listItems{
    listItems{
      items{
        __typename
        id
        value
      }
    }
  }`;
  
  const deleteItem = `mutation deleteItem($id: ID!){
    deleteItem(input:{
      id: $id
    }){
      __typename
      id
      value
    }
  }`;

function App() {
    const [currentValue, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [triggerCreate, setTriggerCreate] = useState(null);
    const [triggerDelete, setTriggerDelete] = useState(null);

    async function listItems(){
        const items = await API.graphql(graphqlOperation(readItems));
        setItems(items.data.listItems.items);
    }

    function handleClickCreate() {
        setTriggerCreate(triggerCreate+1);
    }

    function handleClickDelete(id) {
        setTriggerDelete(id);
    }

    //empty array will make it run only once
    useEffect(() => {
        listItems();
    }, []);

    useEffect(() => {
        async function deleteItemEffect(id) {
            if(triggerDelete !== null) {
                console.error('handleDelete');
                const itemId = {"id":id};
                await API.graphql(graphqlOperation(deleteItem, itemId));
                listItems();
            }
        }
        deleteItemEffect(triggerDelete);
    }, [triggerDelete]);
  
    useEffect(() => {
        async function createItemEffect() {
            if(triggerCreate !== null) {
                console.error('createItemEffect triggerCreate=', triggerCreate);
                const item = {'value': currentValue}
                await API.graphql(graphqlOperation(createItem, item));
                listItems();
            }
        }
        createItemEffect();
      }, [triggerCreate]);

    return (
        <div>
            <input
                type='text'
                value={currentValue}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                onClick={handleClickCreate}
            >
                Add {triggerCreate}
            </button>
            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id}>
                            {item.value}
                            <button
                                key={item.i}
                                onClick={() => handleClickDelete(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default withAuthenticator(App, { includeGreetings: true });
  
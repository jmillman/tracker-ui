import React, { useState, useEffect, useReducer } from 'react';
import { apiReducer, ACTION_TYPES } from './api/restApi';


function App() {
    const [valueToAdd, setValueToAdd] = useState('test');
    const [items, setItems] = useState([]);
    const [, callApi] = useReducer(apiReducer);

    async function listItems(){
        callApi({type: ACTION_TYPES.FETCH, callback: setItems});
    }

    function handleClickCreate() {
        callApi({type: ACTION_TYPES.ADD, value: valueToAdd, callback: listItems});
    }

    function handleClickDelete(id) {
        callApi({type: ACTION_TYPES.DELETE, id, callback: listItems});
    }

    //empty array will make it run only once
    useEffect(() => {
        listItems();
    }, []);

    return (
        <div>
            <input
                type='text'
                value={valueToAdd}
                onChange={(e) => setValueToAdd(e.target.value)}
            />
            <button
                onClick={handleClickCreate}
            >
                Add
            </button>
            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id}>
                            {item.value} {item.date}
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

export default App;
  
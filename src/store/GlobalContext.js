// This is a wrapper to provide the application with global state, access the reducer to modify state
// exposes actions or api calls
// A component can access the context like this.... any updates to state will cause a rerender
// const [state, reducer, actions] = useContext(AppContext);
// The main app provides the context using this statement
// export default withGlobalContext(App);

import React, { useReducer, useEffect } from 'react';
import { createContext } from 'react';
import reducer from '../store/reducer';
import { fetchItems, deleteItem, addItemType, fetchUsers, fetchItemTypes, deleteItemType, AddItemInput, AddUserInput } from '../api/restApi';


const GlobalContext = createContext();
export default GlobalContext;

export function withGlobalContext(Component) {
    return function contextComponent(props) {
        const [state, callReducer] = useReducer(reducer, {data: [], taskLists: [], itemTypes: [], views: [], users: []});

        const fetchItemsFromApp = () => {
            fetchItems((result) => {
                const taskCompleted = result.filter((item)=>item.recordType === "taskCompleted");
                const taskLists = result.filter((item)=>item.recordType === "taskList");
                const views = result.filter((item)=>item.recordType === "view");
                callReducer({type: 'views', data: views})
                callReducer({type: 'taskLists', data: taskLists})
                callReducer({type: 'taskCompleted', data: taskCompleted})
            });
        };
    
                
        const fetchItemTypesFromApp = () => {
            fetchItemTypes((result) => callReducer({type: 'ITEMTYPES', itemTypes: result}));
        };
    
        const fetchUsersFromApp = () => {
            fetchUsers((result) => callReducer({type: 'USERS', users: result}));
        };
    
        // This will fetch all items, if necessary
        useEffect(() => {
            fetchItemsFromApp();
            fetchItemTypesFromApp();
            fetchUsersFromApp();
        }, []);

        const currentDate = new Date().toISOString().slice(0,10);
        
        const addItemTypeFromApp = (name, dataType_1, dataName_1, dataType_2, dataName_2, successCallback) => {
            addItemType(state.loggedInUser.id, name, dataType_1, dataName_1, dataType_2, dataName_2,
                (result) => {
                    successCallback(result);
                    fetchItemTypesFromApp();
                }   
            );
        };

        const createListFromApp = (name, checkboxValues, callback) => {
            const addItem = new AddItemInput(state.loggedInUser.id, 'taskList', name, currentDate, null, checkboxValues);
            addItem.save((result) => {
                fetchItemsFromApp();
                callback(result);
            });
        };
    
        
        const createUserFromApp = (userName, callback) => {
            const addUser = new AddUserInput(userName);

            addUser.save((result) => {
                callback(result);
                fetchUsersFromApp();
                    // fetchItemsFromApp();
                    // addSuccessCallback();
                }
            );
        };
    
        const addItemFromApp = (value, typeId, addSuccessCallback) => {
            const addItem = new AddItemInput(state.loggedInUser.id, 'taskCompleted', value, currentDate, typeId, null);

            addItem.save((result) => {
                    fetchItemsFromApp();
                    addSuccessCallback();
                }
            );
        };
    
        const addViewFromApp = (name, viewJson, callback) => {
            const addItem = new AddItemInput(state.loggedInUser.id, 'view', name, currentDate, null, viewJson);

            addItem.save((result) => {
                    fetchItemsFromApp();
                    callback(result);
                }
            );
        };
    
        const deleteItemFromApp = (id) => {
            deleteItem(id, (result) => {
                fetchItemsFromApp();
                }
            );
        };

        const deleteItemTypeFromApp = (id, callback) => {
            deleteItemType(id, (result) => {
                callback(result);
                fetchItemTypesFromApp();
                }
            );
        };

        const loginUserFromApp = (user) => {
            callReducer({type: 'loginUser', user: user})
        };
    
        const api = {
            addItemFromApp,
            fetchItemsFromApp,
            deleteItemFromApp,
            addItemTypeFromApp,
            deleteItemTypeFromApp,
            createListFromApp,
            addViewFromApp,
            createUserFromApp,
            loginUserFromApp,
        }

        return (
            <GlobalContext.Provider value={[state, callReducer, api]}>
                <Component {...props} />
            </GlobalContext.Provider>
        );
    }
}

//use to wrap vs using the variable declaration way which needs another wrapper
// export function GlobalContextWrapperComponent(props) {
//     return (
//         <div>GlobalContextWrapperComponent Component:{props.children}</div>
//     );
// }

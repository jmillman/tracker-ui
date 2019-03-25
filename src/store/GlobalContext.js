// This is a wrapper to provide the application with global state, access the reducer to modify state
// exposes actions or api calls
// A component can access the context like this.... any updates to state will cause a rerender
// const [state, reducer, actions] = useContext(AppContext);
// The main app provides the context using this statement
// export default withGlobalContext(App);

import React, { useReducer, useEffect } from 'react';
import { createContext } from 'react';
import reducer from '../store/reducer';
import { fetchItems, deleteItem, addItem, addItemType, fetchItemTypes, deleteItemType } from '../api/restApi';

const GlobalContext = createContext();
export default GlobalContext;

export function withGlobalContext(Component) {
    return function contextComponent(props) {
        const [state, callReducer] = useReducer(reducer, {data: []});

        const fetchItemsFromApp = () => {
            fetchItems((result) => callReducer({type: 'DATA', data: result}));
        };
    
        const fetchItemTypesFromApp = () => {
            fetchItemTypes((result) => callReducer({type: 'ITEMTYPES', itemTypes: result}));
        };
    
        // This will fetch all items, if necessary
        useEffect(() => {
            fetchItemsFromApp();
            fetchItemTypesFromApp();
        }, []);

        
        const addItemTypeFromApp = (name, dataType_1, dataName_1, dataType_2, dataName_2, successCallback) => {
            // addItem(value, itemType, date, (result) => callReducer({type: 'DATA', data: result}));
            addItemType(name, dataType_1, dataName_1, dataType_2, dataName_2,
                (result) => {
                    successCallback(result);
                    fetchItemTypesFromApp();
                }   
            );
        };

        const addItemFromApp = (value, itemType, addSuccessCallback) => {
            // addItem(value, itemType, date, (result) => callReducer({type: 'DATA', data: result}));
            addItem(value, itemType, (result) => {
                    fetchItemsFromApp();
                    addSuccessCallback();
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
        
    
        const api = {
            addItemFromApp,
            fetchItemsFromApp,
            deleteItemFromApp,
            addItemTypeFromApp,
            deleteItemTypeFromApp,
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

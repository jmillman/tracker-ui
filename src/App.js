import React from 'react';
import { withGlobalContext } from './store/GlobalContext';

import ItemCards from './components/ItemCards';
import AddItem from './components/AddItem';

function App() {
    
    return (
        <>
            <AddItem />
            <ItemCards />
        </>
    );
}

export default withGlobalContext(App);

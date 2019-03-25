import React from 'react';
import { withGlobalContext } from './store/GlobalContext';

import Page1 from './components/Page1';

function App() {

    return (
        <>
            <Page1 />
        </>
    );
}

export default withGlobalContext(App);

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../store/GlobalContext';
import CompletedItem from './CompletedItem';
import { ItemsFilter } from '../filters/ItemsFilter';



import {
    Segment,
  } from 'semantic-ui-react';


const itemsFilter = new ItemsFilter();
function ItemsArea(props) {

    const [state, ,] = useContext(GlobalContext);
    const [name, setName] = useState('');

    useEffect(() => {
        const item = state.views.filter(view=> { return view.id === props.viewId})[0];
        if(item) {
            itemsFilter.hydrateFromJson(item.notes);
            setName(item.value);
            }
    }, [state.views]);

    function getData() {
        return itemsFilter.filter(state.data);
    }

    return (
        <Segment.Group>
            <Segment>
                {props.title || name}
            </Segment>
            <Segment>
                {getData().map(item => {
                    return (
                        <CompletedItem item={item} key={item.id}/>
                    );
                })}
            </Segment>
        </Segment.Group>
    );
}

ItemsArea.propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export default ItemsArea;

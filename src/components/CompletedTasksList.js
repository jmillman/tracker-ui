import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import { DateInput } from 'semantic-ui-calendar-react';
import CompletedItem from './CompletedItem';
import { ItemsFilter } from '../filters/ItemsFilter';
import { dateCalendarToDB } from '../utils';

import {
    Container,
    Segment,
  } from 'semantic-ui-react';

const itemsFilter = new ItemsFilter();

function CompletedTasksList() {
    const [state, ,] = useContext(GlobalContext);
    const [date, setDate] = useState('');

        
    function handleChange(event, {name, value}) {
        itemsFilter.setDate(dateCalendarToDB(value));
        setDate(value);
    }

    function getData() {
        return itemsFilter.filter(state.data);
    }
    
    return (
        <>
            <Container text>
                <Segment.Group>
                    <Segment>
                            <DateInput
                                name="date"
                                placeholder="Date"
                                value={date}
                                iconPosition="left"
                                onChange={handleChange}
                            />
                    </Segment>
                    {getData().map(item => {
                        return (
                            <CompletedItem item={item} key={item.id}/>
                        );
                    })}
                </Segment.Group>
            </Container>
        </>
    );
}

export default CompletedTasksList;
  
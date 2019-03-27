import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import CompletedItem from './CompletedItem';
import ItemTypeCheckboxes from './ItemTypeCheckboxes';
import { ItemsFilter } from '../filters/ItemsFilter';
import { dateCalendarToDB } from '../utils';

import {
    Container,
    Grid,
  } from 'semantic-ui-react';

const itemsFilter = new ItemsFilter();

function CompletedTasksList() {
    const [state, ,] = useContext(GlobalContext);
    const [date, setDate] = useState('');
    const [selectedItemTypes, setSelectedItemTypes] = useState([]);

    function handleSetSelectedItemTypes(arrayOfIds) {
        setSelectedItemTypes(arrayOfIds);
        itemsFilter.setItemTypeIds(arrayOfIds);
    }

    function handleChange(event, {name, value}) {
        setDate(value);

        let [startDate, endDate] = value.split(' - ');

        startDate = startDate ? dateCalendarToDB(startDate) : '';
        endDate = endDate ? dateCalendarToDB(endDate) : '';

        itemsFilter.setDateStart(startDate);
        itemsFilter.setDateEnd(endDate);        
    }

    function getData() {
        return itemsFilter.filter(state.data);
    }
    
    return (
        <Grid
        columns='12'
        >
            <Grid.Column width={4}>
                <Container width='100%'>
                        <DatesRangeInput
                            inline
                            name="date"
                            placeholder="Date"
                            value={date}
                            iconPosition="left"
                            onChange={handleChange}
                            closable={true}
                            clearable
                        />
                        <ItemTypeCheckboxes callback={handleSetSelectedItemTypes} selectedItems={selectedItemTypes}/>
                </Container>
            </Grid.Column>
            <Grid.Column width={8}>
                {getData().map(item => {
                    return (
                        <CompletedItem item={item} key={item.id}/>
                    );
                })}
            </Grid.Column>
        </Grid>
    );
}

export default CompletedTasksList;
  
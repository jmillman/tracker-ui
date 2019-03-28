import React from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    Select,
  } from 'semantic-ui-react';

function ViewsSelectList(props) {
    const pulldownOptions = props.optionItems.map((item) => {
        return {
            key: item.id,
            text: item.value,
            value: item.id,
        };
    });

    return(
        <Form.Field>
                <Select
                    placeholder='Select a type to track...'
                    options={pulldownOptions}
                    value={props.selected}
                    onChange={(e, data)=>{
                        props.callback(data.value)
                    }}
                />
        </Form.Field>
    );
}

ViewsSelectList.propTypes = {
    callback: PropTypes.func.isRequired,
    optionItems: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default ViewsSelectList;
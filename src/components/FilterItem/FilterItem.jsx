import React from 'react';

const FilterItem = ({filter, changeFilterTodo, currentFilter}) => {
    return (
        <li onClick={(e) => changeFilterTodo(e)}>
            <button className={filter === currentFilter && 'selected'}>{filter}</button>
        </li>
    );
};

export default FilterItem;
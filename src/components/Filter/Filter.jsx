import React from 'react';
import { FilterInput, FilterLabel } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { selectFilterValue } from 'redux/selectors';

const Filter = () => {
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleFilterChange = event => {
    dispatch(changeFilter(event.currentTarget.value));
  };

  return (
    <FilterLabel htmlFor="filter">
      Find contacts by name
      <FilterInput
        name="filter"
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
      />
    </FilterLabel>
  );
};

export default Filter;

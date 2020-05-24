import React, { useEffect, useRef } from 'react';
import SelectComponent from 'react-select'
import { useField } from '@unform/core';
import { makeStyles } from '@material-ui/core';
import {FaChevronCircleDown} from 'react-icons/fa'

import { countries } from '../../constants/countries'

export const Select = ({
   label = String,
   name = String,
   isMulti = false,
   optionValue = 'value',
   optionLabel = 'label',
   ...props
}) => {
   const classes = useStyles()

   const { fieldName, defaultValue, registerField, error } = useField(name);

   const selectRef = useRef(null);


   useEffect(() => {
      registerField({
         name: fieldName,
         ref: selectRef.current,
         path: 'state.value',
         getValue: (ref) => {
            if (isMulti) {
               if (!ref.state.value) {
                  return [];
               }

               return ref.state.value.map((option) => option[optionValue]);
            } else {
               if (!ref.state.value) {
                  return '';
               }

               return ref.state.value[optionValue];
            }
         },
      });
   }, [fieldName, registerField, isMulti]);

   return (
      <div className={classes.container}>
         <sapan className={classes.label}>{label}</sapan>

         <SelectComponent
            defaultValue={defaultValue}
            ref={selectRef}
            autoFocus={false}
            
            noOptionsMessage={() => 'Nenhuma opção encontrada'}
            options={countries}
            getOptionLabel={(option) => option[optionLabel]}
            getOptionValue={(option) => option[optionValue]}
            isSearchable={true}
            placeholder='Selecione...'
            isClearable={true}
            isMulti={isMulti}
            loadingMessage={() => 'Carregando...'}
            isLoading={false}
            maxMenuHeight={300}
            styles={{
               clearIndicator: (provided, state) => ({
                  ...provided,
                  color: '#878787',
                  cursor: 'pointer',
                  '&:hover':{
                     color: '#616161',
                  }
               }),
               indicatorSeparator: (provided, state) => ({
                  ...provided,
                  backgroundColor: !state.hasValue ? 'transparent' : 'grey',
                  marginRight: 11
               }),
               option: (provided, state) => ({
                  ...provided,
               }),
               menu: (provided, state) => ({
                  ...provided,
                  marginTop: 0,
                  borderRadius: 10
               }),
               container: (provided, state) => ({
                  ...provided,
                  width: '100%',
               }),
               control: (provided, state) => ({
                  ...provided,
                  fontSize: 14,
                  boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10em',
                  color: '#4E444C',
                  borderWidth: state.isFocused ? 2 : 1,
               }),
               multiValue: (provided, state) => ({
                  ...provided,
                  borderRadius: '10em',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#4A2D9C',
                  color: 'white',
                  overflow: 'hidden'
               }),
               multiValueLabel: (provided, state) => ({
                  ...provided,
                  color: 'white',
                  fontWeight: 'bold',
               }),
               multiValueRemove: (provided, state) => ({
                  ...provided,
                  color: 'white',
                  '&:hover':{
                     color: 'rgba(255,0,0, .7)',
                     backgroundColor: 'transparent',
                     cursor: 'pointer'
                  }
               }),

            }}
            theme={theme => ({
               ...theme,
               colors: {
                  ...theme.colors,
                  primary: '#4A2D9C',
                  primary25: '#e8e0ff',
                  neutral20: error ? 'red' : 'transparent',
                  neutral30: '#953385',
               }
            })}
            components={{
               DropdownIndicator: (props) => 
                  <FaChevronCircleDown
                     className={
                        props.selectProps.menuIsOpen
                        ? classes.upDropdownIndicator
                        : classes.defaultDropdownIndicator
                     }
                     {...props}
                  />
            }}
            {...props}
         />

         {error && <sapan className={classes.errorText}>{error}</sapan>}
      </div>
   )
}

const useStyles = makeStyles(() => ({
   container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
   },
   label: {
      color: '#953385',
      fontSize: 15,
      marginBottom: '1em',
      fontWeight: 'bold'
   },
   errorText:{
      color: '#f44336',
      margin: '3px 14px 0px 14px',
      fontSize: 12,
   },
   defaultDropdownIndicator:{
      fontSize: 15,
      color: '#4A2D9C',
      marginRight: 10, 
      cursor: 'pointer'
   },
   upDropdownIndicator:{
      fontSize: 15,
      color: '#4A2D9C',
      marginRight: 10, 
      cursor: 'pointer',
      transform: 'rotate(0.5turn)',
   }
}))
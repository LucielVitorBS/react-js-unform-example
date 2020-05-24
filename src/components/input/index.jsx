import React, { useEffect, useRef } from 'react';

import {
   withStyles,
   TextField,
   makeStyles,
} from '@material-ui/core'

import { useField } from '@unform/core'

export const InputText = ({
   name = String,
   label = String,
   onChange = false,
   ...props
}) => {
   const inputRef = useRef(null)
   
   const { registerField, fieldName, defaultValue, error, clearError } = useField(name)

   const classes = useStyles()

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      })
   }, [fieldName, registerField])

   

   return (
      <div className={classes.container}>
         <sapan className={classes.label}>{label}</sapan>

         <CustomInput
            inputProps={{
               ref: inputRef,
               defaultValue,
               id: fieldName,
               onChange: e => {
                  onChange && onChange(e)

                  clearError()
               }
            }}
            variant='outlined'
            {...props}
            error={error}
            helperText={error}
            fullWidth
         />
      </div>
   )
}

const useStyles = makeStyles(() => ({
   container:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
   },
   label: {
      color: '#953385',
      fontSize: 15,
      marginBottom: '1em',
      fontWeight: 'bold'
   }
}))

const CustomInput = withStyles(theme => ({
   root: {
      '& label.Mui-focused': {
         color: 'green',
      },
      '& .MuiInput-underline:after': {
         borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-input': {
         padding: 10,
         fontSize: 14,
         boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
         borderRadius: '10em',
         color: '#4E444C',
         backgroundColor: 'white'
      },
      '& .MuiOutlinedInput-root': {
         
         '& fieldset': {
            borderColor: 'transparent',
            borderRadius: '10em',
         },
         '&:hover fieldset': {
            borderColor: '#953385',
         },
         '&.Mui-focused fieldset': {
            borderColor: '#4A2D9C',
         },
      },
   },
}))(TextField);
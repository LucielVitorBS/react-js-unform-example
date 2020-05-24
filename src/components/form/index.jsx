import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup'
import { Form as FormUnform } from "@unform/web";

export const Form = ({
   onSubmit = Function,
   formRef: propRef,
   initialData,
   validationSchema : schema,
   children,
   ...props
}) => {
   const formRef = useRef(null)

   useEffect(() => {
   }, [formRef])

   const handleSubmit = async (data, { reset }) => {
      try {

         await schema.validate(data, {
            abortEarly: false,
         })

         formRef.current.setErrors({})

         onSubmit(data, {reset})
      } catch (err) {
         if(err instanceof Yup.ValidationError){
            const errorMessages = {}

            err.inner.forEach(error => {
               errorMessages[error.path] = error.message
            })

            formRef.current.setErrors(errorMessages)
         }
      }
   }

   return(
      <FormUnform 
         onSubmit={handleSubmit}
         initialData={initialData}
         ref={element => {
            formRef.current = element
            if(propRef) propRef.current = element
         }}
         {...props}
      >
         {children}
      </FormUnform>
   )
}
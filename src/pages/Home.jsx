import React, { useRef } from 'react';
import { Form, InputText, Select } from '../components';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

const initialData = {
   name: 'Luciel',
   address:{
      counties: [
         {codigo: '076', nome: 'Brasil'},
         {codigo: '078', nome: 'Brasil'},
      ]
   },
   quantity:{
      numMin: 5,
      numMax: 10
   }
}

export const Home = () => {
   const formRef = useRef(null)

   const handleSubmit = (data, { reset }) => {
      formRef.current.setData({password: 'Eroooow'})

      console.log(data)
      // reset()
   }

   const schema = Yup.object().shape({
      name: Yup.string()
         .required('Campo obrigatório'),
      email: Yup.string()
         .email('Insria um email válido'),

      address: Yup.object().shape({
         city: Yup.string(),
         country: Yup.string()
            .required('Campo obrigatório'),
         counties: Yup.array()
            .required('Campo obrigatório'),
      }),

      quantity: Yup.object().shape({
         numMin: Yup.number()
         .typeError('Deve ser um número')
         .max(Yup.ref('numMax'), 'Deve ser menor que a quantidade máxima'),

         numMax: Yup.number()
         .typeError('Deve ser um número')
         .min(Yup.ref('numMin'), 'Deve ser maior que a quantidade mínima')
      })
   })

   const onChange = e => console.log(e.target.value)

   return(
      <div>
         <h1>Home</h1>

         <Form
            onSubmit={handleSubmit}
            initialData={initialData}
            formRef={formRef}
            validationSchema={schema}
         >

            <InputText label='Nome' name='name' />
            
            <InputText label='Email' type='email' name='email' />
            
            <InputText label='Senha' type='password' name='password' />

            <Scope path='address'>
               <InputText label='CEP' name='cep' onChange={onChange} />

               <InputText label='Bairro' name='neighborhood' />

               <InputText label='Cidade' name='city' />
               
               <InputText label='Estado' name='state' />

               <Select
                  label='País'
                  name='country'
                  optionLabel='nome'
                  optionValue='codigo'
               />

               <Select
                  label='Países'
                  name='counties'
                  optionLabel='nome'
                  optionValue='codigo'
                  isMulti
               />
            </Scope>

            <Scope path='quantity'>
               <InputText label='Quantidade mímina' name='numMin' type='number' />

               <InputText label='Quantidade máxima' name='numMax' type='number' />
            </Scope>

            

            <button type='submit'>Enviar</button>
         </Form>
      </div>
   )
}
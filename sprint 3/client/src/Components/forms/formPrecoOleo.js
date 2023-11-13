import React from 'react';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';
import axios from 'axios';

const handleDefinirPreco = (values) => {
  axios.post('http://localhost:3001/definirPreco', {
    preco: values.preco,
    tipo: values.tipo 
  })
  .then((response) => {
    Swal.fire({
      icon: 'success',
      title: 'Preço definido!',
      showConfirmButton: false, 
      timer: 1500, 
    });
  })
  .catch((error) => {
    let errorMessage = 'Erro ao definir o preço.';
    let confirmButtonColor = 'red'; 

    Swal.fire({
      icon: 'error',
      text: errorMessage,
      iconColor: 'red',
      confirmButtonColor: confirmButtonColor
    });
  });
};

function FormDefinirPreco() {
  const validationOilPrice = yup.object().shape({
    preco: yup
      .number()
      .typeError('Deve ser um número')
      .positive('O preço deve ser maior que zero')
      .required('Preço é obrigatório'),
    tipo: yup.string() 
  });

  return (
    <div className="setOilPriceForm">
      <h2 id="tituloDefinirPreco">Definir Preço do Óleo</h2>
      <Formik
        initialValues={{ preco: '', tipo: '' }}
        onSubmit={handleDefinirPreco}
        validationSchema={validationOilPrice}
      >
        {({ errors, touched }) => (
          <Form className="formSetOilPrice">
            <div className="inputWrapper">
              <Field
                name="preco"
                type="number"
                step="0.01"
                placeholder="Preço do Óleo"
                className="form-field"
              />
            </div>
            <div className="inputWrapper">
              <Field
                name="tipo"
                as="select"
                className="form-field"
              >
                <option value="" disabled>
                  Selecione o tipo de óleo
                </option>
                <option value="novo">Novo</option>
                <option value="usado">Usado</option>
              </Field>
            </div>

            {errors.preco && touched.preco && (
              <span className="form-error">{errors.preco}</span>
            )}
            {errors.tipo && touched.tipo && (
              <span className="form-error">{errors.tipo}</span>
            )}

            <button id="botaoDefinirPreco" type="submit">Definir Preço</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormDefinirPreco;
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import { Input } from '../../components/Forms';
import Button from '../../components/Button';
import { useStore, useActions } from 'easy-peasy';

const StyledOrderForm = styled.div`
  margin-top: 1rem;
  h2 {
    margin-top: ${({ theme }) => theme.spacingXL};
    margin-bottom: ${({ theme }) => theme.spacingL};
  }
`;

const StyledCustomerShipping = styled.div``;

const StyledPaymentDetails = styled(Form)`
  .rccs {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacingXL};
  }

  > div:last-child {
  }
`;

/* const OrderFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  shippingAddress: Yup.string().required('Required'),
  shippingCity: Yup.string().required('Required'),
  shippingCountry: Yup.string().required('Required'),
  shippingZipcode: Yup.string().required('Required')
});

const CreditCardSchema = Yup.object().shape({
  number: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  expiry: Yup.string().required('Required'),
  cvc: Yup.string().required('Required')
}); */

const OrderForm = ({ setOrderInfo, cartId }) => {
  const [focusedField, setFocusedField] = useState(null);
  const { isAuthenticated, authenticatedUser } = useStore(state => state.auth);
  const { setModalOpen } = useActions(actions => actions.auth);
  return (
    <StyledOrderForm>
      <h1>Order</h1>
      <h2>Payment Details</h2>
      <Formik
        initialValues={{
          Number: '',
          Name: '',
          Expiry: '',
          CVC: ''
        }}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, values }) => (
          <StyledPaymentDetails>
            <Cards
              number={values.Number}
              name={values.Name}
              expiry={values.Expiry}
              cvc={values.CVC}
              focused={focusedField}
            />
            <div>
              <Input
                name="Number"
                type="text"
                onFocus={() => setFocusedField('number')}
              />
              <Input
                name="Name"
                type="text"
                onFocus={() => setFocusedField('name')}
              />
              <Input
                name="Expiry"
                type="text"
                onFocus={() => setFocusedField('expiry')}
              />
              <Input
                name="CVC"
                type="text"
                onFocus={() => setFocusedField('cvc')}
              />
            </div>
          </StyledPaymentDetails>
        )}
      </Formik>

      <h2>Customer & Shipping Info</h2>
      <Formik
        initialValues={{
          firstName: 'Elias',
          lastName: 'Johansson',
          email: 'elias_johansson@hotmail.se',
          shippingAddress: 'Lärdomsgatan 3',
          shippingCountry: 'Sweden',
          shippingZipcode: '417 56',
          shippingCity: 'Göteborg'
        }}
        onSubmit={values => {
          setOrderInfo({
            ...values,
            cartId: cartId,
            customerName: isAuthenticated
              ? `${authenticatedUser.firstname} ${authenticatedUser.lastname}`
              : `${values.firstName} ${values.lastName}`,
            customerEmail: isAuthenticated
              ? authenticatedUser.email
              : values.email
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {!isAuthenticated ? (
              <>
                <p>Login to skip some steps</p>
                <Button
                  style={{ marginBottom: '1rem' }}
                  onClick={e => {
                    e.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  Login
                </Button>
                <Input name="firstName" label="First name" type="text" />
                <Input name="lastName" label="Last name" type="text" />
                <Input name="email" label="E-mail" type="text" />
              </>
            ) : (
              <p>
                You are logged in as{' '}
                <b>
                  {authenticatedUser.firstname} {authenticatedUser.lastname}
                </b>
                . The order will be made in that name.
              </p>
            )}

            <Input name="shippingCountry" label="Country" type="text" />
            <Input name="shippingCity" label="City" type="text" />
            <Input name="shippingAddress" label="Address" type="text" />
            <Input name="shippingZipcode" label="Zipcode" type="text" />

            <Button type="submit">Continue</Button>
          </Form>
        )}
      </Formik>
    </StyledOrderForm>
  );
};

export default OrderForm;

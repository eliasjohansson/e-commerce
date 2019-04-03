import React from 'react';
import styled from 'styled-components';
import { Input } from './Forms';
import { Form, Formik } from 'formik';
import Button from './Button';
import { useStore, useActions } from 'easy-peasy';

const StyledAuthModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: 0.3s ease;

  form {
    background-color: ${({ theme }) => theme.colorWhite};
    padding: ${({ theme }) => theme.spacingXL};
    width: 500px;
    z-index: 1010;
  }

  .tint {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const AuthModal = props => {
  const { modalOpen, isAuthenticated } = useStore(state => state.auth);
  const { setModalOpen, setToken, setLoading, tokenAuthenticate } = useActions(
    actions => actions.auth
  );

  return (
    <StyledAuthModal open={!isAuthenticated && modalOpen}>
      <div className="tint" onClick={() => setModalOpen(false)} />
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={async values => {
          try {
            const res = await fetch(
              `${process.env.REACT_APP_API_URI}/users/login`,
              {
                method: 'POST',
                body: JSON.stringify({
                  username: values.username,
                  password: values.password
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }
            );
            const { token, user } = await res.json();
            localStorage.setItem('access_token', token);
            setToken(token);
            setLoading(true);
            tokenAuthenticate();
            setModalOpen(false);
          } catch ({ response: res }) {
            console.log(res);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Input name="username" label="Username" type="text" />
            <Input name="password" label="Password" type="password" />

            <Button type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </StyledAuthModal>
  );
};

export default AuthModal;

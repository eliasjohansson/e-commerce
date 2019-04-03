import React, { useState } from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colorWhite};
  border-bottom: 2px solid ${({ theme }) => theme.colorSecondary};
  margin-bottom: ${({ theme }) => theme.spacingL};

  label {
    padding: ${({ theme }) => theme.spacingS};
    font-size: 14px;
    color: ${({ focused, theme }) => (focused ? theme.colorSecondary : 'grey')};
  }

  input {
    padding: ${({ theme }) => theme.spacingS};
    background: none;
    border: none;
    outline: 0;
  }

  .error {
    height: 25px;
  }
`;

export const Input = ({ type, name, label, onFocus }) => {
  const [focused, setFocused] = useState(false);
  return (
    <StyledInput focused={focused}>
      <label htmlFor={name}>{label || name}</label>
      <Field
        type={type}
        name={name}
        onBlur={() => setFocused(false)}
        onFocus={e => {
          setFocused(true);
          onFocus && onFocus();
        }}
      />
      {/*  <ErrorMessage name={name} /> */}
    </StyledInput>
  );
};

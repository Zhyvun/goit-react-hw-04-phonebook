// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { validationSchema } from '../UI/validationForm';
import {
  FormBox,
  FormEl,
  FormLabel,
  FormInput,
  FormButton,
  AlertForUser,
} from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForms }) => {
    onSubmit({ ...values });
    resetForms();
  };

  /*CLASS
export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit({ ...values });
    resetForm();
  };
*/

  return (
    <FormBox>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <FormEl>
            <FormLabel htmlFor="name">
              Name
              <FormInput
                type="text"
                name="name"
                placeholder="Please enter your name
                  ..."
                value={values.name}
                onChange={handleChange}
              />
              <AlertForUser name="name" component="div" />
            </FormLabel>
            <FormLabel htmlFor="number">
              Number
              <FormInput
                type="tel"
                name="number"
                placeholder="Please enter s phone number ..."
                value={values.number}
                onChange={handleChange}
              />
              <AlertForUser name="number" component="div" />
            </FormLabel>
            <FormButton type="submit"> Add contact </FormButton>
          </FormEl>
        )}
      </Formik>
    </FormBox>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

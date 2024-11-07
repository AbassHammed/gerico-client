/* eslint-disable space-before-function-paren */
'use client';

import { useReducer } from 'react';

import { FormikConfig, useFormik } from 'formik';

import { FormContextProvider } from './FormContext';

interface Props extends Omit<FormikConfig<any>, 'validateOnMount' | 'validateOnChange'> {
  children: React.ReactNode;
  handleIsSubmitting?: any;
  handleIsValidating?: any;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

function errorReducer(state: any, action: any) {
  if (!action.error) {
    const payload = { ...state };
    delete payload[action.key];
    return payload;
  }
  return {
    ...state,
    [action.key]: action.error,
  };
}

export default function Form({ validate, ...props }: Props) {
  const [fieldLevelErrors, dispatchErrors] = useReducer(errorReducer, {});

  const formik = useFormik({
    validateOnBlur: true,
    ...props,
    validationSchema: props.validationSchema,
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate:
      validate ||
      function () {
        return fieldLevelErrors;
      },
  });

  return (
    <form
      id={props.id}
      name={props.name}
      onSubmit={formik.handleSubmit}
      className={props.className}
      style={props.style}
      method="POST">
      <FormContextProvider
        values={formik.values}
        errors={formik.errors}
        formContextOnChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched}
        fieldLevelValidation={(key: any, error: string) => dispatchErrors({ key, error })}>
        {props.children}
      </FormContextProvider>
    </form>
  );
}

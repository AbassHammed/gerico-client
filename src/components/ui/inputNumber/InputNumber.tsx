/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React, { forwardRef, useEffect } from 'react';

import { useFormContext } from '../form/FormContext';
import { FormLayout } from '../layouts/formLayout/formLayout';
import InputErrorIcon from '../layouts/InputErrorIcon';
import InputIconContainer from '../layouts/InputIconContainer';
import styleHandler from '../theme/style-handler';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  defaultValue?: string | number;
  descriptionText?: string | React.ReactNode;
  error?: string;
  icon?: any;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string | React.ReactNode;
  actions?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  validation?: (x: any) => void;
}

const InputNumber = forwardRef<HTMLInputElement, Props>(
  (
    {
      descriptionText,
      error,
      icon,
      label,
      afterLabel,
      beforeLabel,
      labelOptional,
      layout,
      value = undefined,
      actions,
      size = 'medium',
      validation,
      id = '',
      name = '',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const __styles = styleHandler('inputNumber');

    const { formContextOnChange, values, errors, handleBlur, touched, fieldLevelValidation } =
      useFormContext();

    if (values && !value) {
      value = values[id || name];
    }

    function handleBlurEvent(e: React.FocusEvent<HTMLInputElement>) {
      if (handleBlur) {
        handleBlur(e);
      }
      if (props.onBlur) {
        props.onBlur(e);
      }
    }

    if (!error) {
      if (errors && !error) {
        error = errors[id || name];
      }
      error = touched && touched[id || name] ? error : undefined;
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (props.onChange) {
        props.onChange(e);
      }
      // update form
      if (formContextOnChange) {
        formContextOnChange(e);
      }
      // run field level validation
      if (validation) {
        fieldLevelValidation(id, validation(e.target.valueAsNumber));
      }
    }

    useEffect(() => {
      if (validation) {
        fieldLevelValidation(id, validation(value));
      }
    }, []);

    const inputClasses = [__styles.base];

    if (error) {
      inputClasses.push(__styles.variants.error);
    }
    if (!error) {
      inputClasses.push(__styles.variants.standard);
    }
    if (icon) {
      inputClasses.push(__styles.with_icon);
    }
    if (size) {
      inputClasses.push(__styles.size[size]);
    }
    if (props.disabled) {
      inputClasses.push(__styles.disabled);
    }

    return (
      <div className={className}>
        <FormLayout
          label={label}
          afterLabel={afterLabel}
          beforeLabel={beforeLabel}
          labelOptional={labelOptional}
          layout={layout}
          id={id}
          error={error}
          descriptionText={descriptionText}
          style={style}
          size={size}>
          <div className={__styles.container}>
            <input
              data-size={size}
              id={id}
              name={name}
              onChange={onInputChange}
              onBlur={handleBlurEvent}
              type="number"
              ref={ref}
              value={value}
              className={inputClasses.join(' ')}
              {...props}
            />

            {icon && <InputIconContainer size={size} icon={icon} />}
            {error || actions ? (
              <div className={__styles.actions_container}>
                {error && <InputErrorIcon size={size} />}
                {actions && actions}
              </div>
            ) : null}
          </div>
        </FormLayout>
      </div>
    );
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;

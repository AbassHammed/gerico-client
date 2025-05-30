/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useFormContext } from './form/FormContext';
import { FormLayout } from './layouts/formLayout/formLayout';
import styleHandler from './theme/style-handler';

interface Props extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'size'> {
  name?: string;
  disabled?: boolean;
  layout?: 'horizontal' | 'vertical' | 'flex';
  error?: string;
  descriptionText?: string | React.ReactNode;
  label?: string | React.ReactNode;
  afterLabel?: string | React.ReactNode;
  beforeLabel?: string;
  labelOptional?: string;
  className?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  align?: 'right' | 'left';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  labelLayout?: 'horizontal' | 'vertical';
  validation?: (x: any) => void;
}

function Toggle({
  disabled,
  id = '',
  name = '',
  layout = 'flex',
  error,
  descriptionText,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  onChange,
  onBlur,
  defaultChecked,
  checked,
  className,
  align = 'left',
  size = 'medium',
  validation,
  labelLayout,
  ...props
}: Props) {
  const __styles = styleHandler('toggle');

  const { formContextOnChange, values, errors, handleBlur, touched, fieldLevelValidation } =
    useFormContext();

  if (values && !checked) {
    checked = values[id || name];
  }

  const [intChecked, setIntChecked] = useState((defaultChecked || checked) ?? false);

  // check if toggle checked is true or false
  // if neither true or false the toggle will rely on component state internally
  const active = checked ?? intChecked;

  useEffect(() => {
    setIntChecked(active);
  }, []);

  function handleBlurEvent(e: React.FocusEvent<HTMLButtonElement>) {
    setTimeout(() => {
      if (handleBlur) {
        handleBlur(e);
      }
    }, 100);
    if (onBlur) {
      onBlur(e);
    }
  }

  if (!error) {
    if (errors && !error) {
      error = errors[id || name];
    }
    error = touched && touched[id || name] ? error : undefined;
  }

  function onClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (onChange) {
      onChange(e);
    }

    setIntChecked(!intChecked);

    /*
     * Create change event for formik
     * formik expects an input change event
     */
    const event: any = {};
    event.target = {
      type: 'checkbox',
      name: name,
      id: id,
      value: !active,
      checked: !active,
    };

    // update form
    if (formContextOnChange) {
      formContextOnChange(event);
    }
    // run field level validation
    if (validation) {
      fieldLevelValidation(id, validation(!intChecked));
    }
  }

  const toggleClasses = [__styles.base, __styles.handle_container[size]];
  if (active) {
    toggleClasses.push(__styles.active);
  }

  const handleClasses = [__styles.handle['base'], __styles.handle[size]];
  if (active) {
    handleClasses.push(__styles.handle_active[size]);
  }

  return (
    <FormLayout
      className={className}
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      layout={layout}
      id={id}
      error={error}
      align={align}
      descriptionText={descriptionText}
      size={size}
      labelLayout={labelLayout}
      nonBoxInput>
      <button
        type="button"
        id={id}
        name={name}
        className={clsx(...toggleClasses, disabled && 'opacity-50 cursor-default')}
        onClick={onClick}
        disabled={disabled}
        onBlur={handleBlurEvent}
        {...props}>
        <span aria-hidden="true" className={handleClasses.join(' ')}></span>
      </button>
    </FormLayout>
  );
}

export default Toggle;

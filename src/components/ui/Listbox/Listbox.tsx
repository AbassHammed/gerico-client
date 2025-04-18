/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { flatten } from 'lodash';
import { Check } from 'lucide-react';

import { useFormContext } from '../form/FormContext';
import { FormLayout } from '../layouts/formLayout/formLayout';
import InputErrorIcon from '../layouts/InputErrorIcon';
import InputIconContainer from '../layouts/InputIconContainer';
import styleHandler from '../theme/style-handler';
import { SelectContext } from './SelectContext';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLButtonElement>, 'size'> {
  className?: string;
  buttonClassName?: string;
  children: React.ReactNode;
  descriptionText?: string | React.ReactNode;
  error?: string;
  icon?: any;
  id?: string;
  label?: string | React.ReactNode;
  labelOptional?: string;
  layout?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  value?: any;
  reveal?: boolean;
  actions?: React.ReactNode;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  defaultValue?: any;
  validation?: (x: any) => void;
  optionsWidth?: number;
  // override the button prop for onchange we only return a single value
  // rather than a ChangeEvent<HTMLButtonElement>
  onChange?: (x: any) => void;
}

function Listbox({
  children,
  className,
  buttonClassName,
  descriptionText,
  error,
  icon,
  id = '',
  name = '',
  label,
  labelOptional,
  layout,
  value = undefined,
  onChange,
  onFocus,
  onBlur,
  style,
  size = 'medium',
  defaultValue,
  validation,
  disabled,
  optionsWidth,
}: Props) {
  const [selected, setSelected] = useState(undefined);
  const [selectedNode, setSelectedNode] = useState<any>({});

  const __styles = styleHandler('listbox');

  const triggerRef = useRef<HTMLButtonElement>(null);

  const { formContextOnChange, values, errors, handleBlur, touched, fieldLevelValidation } =
    useFormContext();

  if (values && !value) {
    value = values[id || name];
    defaultValue = values[id || name];
  }

  function handleBlurEvent(e: React.FocusEvent<HTMLButtonElement>) {
    if (handleBlur) {
      handleBlur(e);
    }
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

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    function handleResize() {
      document.documentElement.style.setProperty(
        '--width-listbox',
        `${optionsWidth ? optionsWidth : triggerRef.current?.offsetWidth}px`,
      );
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const data: any = children;
    const content: any = flatten(data);

    function findNode(_value: any) {
      return content.find((node: any) => node.props.value === _value);
    }

    if (value) {
      setSelected(value);
      const node: any = findNode(value);
      setSelectedNode(node?.props ? node.props : undefined);
      return;
    }

    if (selected) {
      const node: any = findNode(selected);
      setSelectedNode(node?.props ? node.props : undefined);
      return;
    } else if (defaultValue) {
      setSelected(defaultValue);
      const node: any = findNode(selected);
      setSelectedNode(node?.props ? node.props : undefined);
      return;
    } else {
      setSelectedNode(content[0]?.props);
      return;
    }
  }, [selected]);

  function handleOnChange(value: any) {
    if (onChange) {
      onChange(value);
    }
    setSelected(value);

    const event: any = {};
    event.target = {
      type: 'select',
      name: name,
      id: id,
      value: value,
      checked: undefined,
    };

    if (formContextOnChange) {
      formContextOnChange(event);
    }
    if (validation) {
      fieldLevelValidation(id, validation(value));
    }
  }

  const selectClasses = [__styles.container, __styles.base, buttonClassName];
  const addonBeforeClasses = [__styles.addOnBefore];

  if (error) {
    selectClasses.push(__styles.variants.error);
  }
  if (!error) {
    selectClasses.push(__styles.variants.standard);
  }
  if (icon) {
    addonBeforeClasses.push(__styles.with_icon);
  }
  if (size) {
    selectClasses.push(__styles.size[size]);
  }
  if (disabled) {
    selectClasses.push(__styles.disabled);
  }

  return (
    <FormLayout
      label={label}
      labelOptional={labelOptional}
      layout={layout}
      id={id}
      error={error}
      descriptionText={descriptionText}
      className={className}
      style={style}
      size={size}>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild disabled={disabled}>
          <button
            data-size={size}
            ref={triggerRef}
            className={cn(selectClasses)}
            onBlur={handleBlurEvent}
            onFocus={onFocus}
            name={name}
            id={id}>
            <span className={cn(addonBeforeClasses)}>
              {icon && <InputIconContainer size={size} icon={icon} />}
              {selectedNode?.addOnBefore && <selectedNode.addOnBefore />}
              <span className={__styles.label}>{selectedNode?.label}</span>
            </span>
            <span className={__styles.chevron_container}>
              <svg
                className={__styles.chevron}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {error && (
              <div className={__styles.actions_container}>
                {error && <InputErrorIcon size={size} />}
              </div>
            )}
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Content
          sideOffset={6}
          loop={true}
          side={'bottom'}
          align="center"
          className={__styles.options_container}>
          <div>
            <SelectContext.Provider value={{ onChange: handleOnChange, selected }}>
              {children}
            </SelectContext.Provider>
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
    </FormLayout>
  );
}

interface OptionProps {
  id?: string;
  value: any;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode | (({ active, selected }: any) => React.ReactNode);
  className?: string;
  addOnBefore?: ({ active, selected }: any) => React.ReactNode;
}

function SelectOption({
  id,
  value,
  disabled = false,
  children,
  className = '',
  addOnBefore,
}: OptionProps) {
  const __styles = styleHandler('listbox');

  return (
    <SelectContext.Consumer>
      {({ onChange, selected }) => {
        const active = selected === value ? true : false;

        return (
          <DropdownMenuPrimitive.Item
            key={id}
            className={cn(
              __styles.option,
              active ? __styles.option_active : ' ',
              disabled ? __styles.option_disabled : ' ',
              className,
            )}
            onSelect={() => (!disabled ? onChange(value) : {})}>
            <div className={__styles.option_inner}>
              {addOnBefore && addOnBefore({ active, selected })}
              <span>
                {typeof children === 'function' ? children({ active, selected }) : children}
              </span>
            </div>

            {active ? (
              <span
                className={cn(__styles.option_check, active ? __styles.option_check_active : '')}>
                <Check className={__styles.option_check_icon} aria-hidden="true" />
              </span>
            ) : null}
          </DropdownMenuPrimitive.Item>
        );
      }}
    </SelectContext.Consumer>
  );
}

Listbox.Option = SelectOption;

export default Listbox;

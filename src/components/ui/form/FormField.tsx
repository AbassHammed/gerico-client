/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useEffect, useState } from 'react';

import type { Enum } from '@/types';
import { Button, DatePickerV2, Input, InputNumber, Listbox, TextArea, Toggle } from '@ui';
import { Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface FormFieldProps {
  name: string;
  properties: any;
  formValues: any;
  setFieldValue: (field: string, v: any) => any;
  disabled?: boolean;
  className?: string;
}

const FormField = ({
  name,
  properties,
  formValues,
  disabled = false,
  setFieldValue,
  className,
}: FormFieldProps) => {
  const [hidden, setHidden] = useState(!!properties.isSecret);
  const [dateAsText, setDateAsText] = useState('');

  const updateDateDisplay = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        setDateAsText(
          new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(date),
        );
      } else {
        setDateAsText('');
      }
    } else {
      setDateAsText('');
    }
  };

  useEffect(() => {
    updateDateDisplay(formValues[name]);
  }, [formValues[name]]);

  useEffect(() => {
    if (properties.show && properties.show.key && !formValues[properties.show.key]) {
      setFieldValue(name, '');
      setDateAsText('');
    }
  }, [properties.show, formValues, name, setFieldValue]);

  if (properties.show) {
    if (properties.show.matches) {
      if (!properties.show.matches.includes(formValues[properties.show.key])) {
        return null;
      }
    } else if (!formValues[properties.show.key]) {
      return null;
    }
  }

  switch (properties.type) {
    case 'datetime':
      return (
        <Input
          size="small"
          layout="vertical"
          id={name}
          name={name}
          type="text"
          value={dateAsText}
          className={className}
          readOnly
          label={properties.title}
          labelOptional={
            properties.descriptionOptional ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.descriptionOptional}
              </ReactMarkdown>
            ) : null
          }
          descriptionText={
            properties.description ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
          actions={
            <DatePickerV2
              hideTime
              onChange={date => {
                if (date) {
                  setFieldValue(name, date.toISOString());
                  updateDateDisplay(date.toISOString());
                } else {
                  setDateAsText('');
                  setFieldValue(name, '');
                }
              }}>
              <span>Choisir</span>
            </DatePickerV2>
          }
        />
      );

    case 'string':
      return (
        <Input
          size="small"
          layout="vertical"
          id={name}
          name={name}
          className={className}
          disabled={disabled}
          type={hidden ? 'password' : 'text'}
          label={properties.title}
          labelOptional={
            properties.descriptionOptional ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.descriptionOptional}
              </ReactMarkdown>
            ) : null
          }
          descriptionText={
            properties.description ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
          actions={
            properties.isSecret ? (
              <Button
                icon={hidden ? <Eye /> : <EyeOff />}
                type="default"
                onClick={() => setHidden(!hidden)}
              />
            ) : (
              <span className="mr-3 text-foreground-lighter">
                {properties.units ? (
                  <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                    {properties.units}
                  </ReactMarkdown>
                ) : null}
              </span>
            )
          }
        />
      );
    case 'multiline-string':
      return (
        <TextArea
          size="small"
          layout="vertical"
          className={className}
          id={name}
          name={name}
          disabled={disabled}
          type={hidden ? 'password' : 'text'}
          label={properties.title}
          labelOptional={
            properties.descriptionOptional ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.descriptionOptional}
              </ReactMarkdown>
            ) : undefined
          }
          descriptionText={
            properties.description ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
          actions={
            properties.isSecret ? (
              <Button
                icon={hidden ? <Eye /> : <EyeOff />}
                type="default"
                onClick={() => setHidden(!hidden)}
              />
            ) : (
              <span className="mr-3 text-scale-900">
                {properties.units ? (
                  <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                    {properties.units}
                  </ReactMarkdown>
                ) : null}
              </span>
            )
          }
        />
      );
    case 'number':
      return (
        <InputNumber
          size="small"
          layout="vertical"
          id={name}
          className={className}
          name={name}
          disabled={disabled}
          label={properties.title}
          labelOptional={
            properties.descriptionOptional ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.descriptionOptional}
              </ReactMarkdown>
            ) : null
          }
          descriptionText={
            properties.description ? (
              <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
          actions={
            <span className="mr-3 text-foreground-lighter">
              {properties.units ? (
                <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
                  {properties.units}
                </ReactMarkdown>
              ) : null}
            </span>
          }
        />
      );

    case 'boolean':
      return (
        <Toggle
          size="small"
          id={name}
          name={name}
          className={className}
          disabled={disabled}
          label={properties.title}
          descriptionText={
            properties.description ? (
              <ReactMarkdown
                unwrapDisallowed
                disallowedElements={['p']}
                className="form-field-markdown">
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
        />
      );

    case 'select':
      return (
        <Listbox
          // size="small"
          name={name}
          className={className}
          disabled={disabled}
          label={properties.title}
          descriptionText={
            properties.description ? (
              <ReactMarkdown
                unwrapDisallowed
                disallowedElements={['p']}
                className="form-field-markdown">
                {properties.description}
              </ReactMarkdown>
            ) : null
          }
          defaultValue={properties.enum[0]}>
          {properties.enum.map((option: Enum) => (
            <Listbox.Option
              id={option.value}
              key={option.value}
              label={option.label}
              value={option.value}>
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox>
      );

    default:
      break;
  }

  return <></>;
};

export default FormField;

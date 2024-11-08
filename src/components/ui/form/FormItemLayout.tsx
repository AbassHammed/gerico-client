import { ElementRef, forwardRef } from 'react';

import { FormItem_Shadcn } from '@ui';

import { FormLayout } from '../layouts/FormLayoutV2';

const FormItemLayout = forwardRef<
  ElementRef<typeof FormLayout>,
  React.ComponentPropsWithoutRef<typeof FormLayout> // Use any as placeholder types
>(({ ...props }, ref) => (
  <FormItem_Shadcn>
    <FormLayout ref={ref} isReactForm {...props}>
      {props.children}
    </FormLayout>
  </FormItem_Shadcn>
));

FormItemLayout.displayName = 'FormItemLayout';

export { FormItemLayout };

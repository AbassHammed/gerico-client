/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const defaults = {
  bg: {
    brand: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-200',
    },
  },
  text: {
    brand: 'text-purple-600',
    body: 'text-foreground-light',
    title: 'text-foreground',
  },
  border: {
    brand: 'border-brand-600',
    primary: 'border-default',
    secondary: 'border-secondary',
    alternative: 'border-alternative',
  },
  placeholder: 'placeholder-foreground-muted',
  focus: `
    outline-none
    focus:ring-current focus:ring-2
  `,
  'focus-visible': `
    outline-none
    transition-all
    outline-0
    focus-visible:outline-4
    focus-visible:outline-offset-1
  `,
  size: {
    // buttons, inputs, input labels use these sizes
    text: {
      tiny: 'text-xs',
      small: 'text-sm leading-4',
      medium: 'text-sm',
      large: 'text-base',
      xlarge: 'text-base',
    },
    // buttons, inputs, input labels use these sizes
    padding: {
      tiny: 'px-2.5 py-1',
      small: 'px-3 py-2',
      medium: 'px-4 py-2',
      large: 'px-4 py-2',
      xlarge: 'px-6 py-3',
    },
  },
  overlay: {
    base: `absolute inset-0 bg-background opacity-50`,
    container: `fixed inset-0 transition-opacity`,
  },
};

const default__padding_and_text = {
  tiny: `${defaults.size.text.tiny} ${defaults.size.padding.tiny}`,
  small: `${defaults.size.text.small} ${defaults.size.padding.small}`,
  medium: `${defaults.size.text.medium} ${defaults.size.padding.medium}`,
  large: `${defaults.size.text.large} ${defaults.size.padding.large}`,
  xlarge: `${defaults.size.text.xlarge} ${defaults.size.padding.xlarge}`,
};

const default___animations = {
  accordion: {
    enter: 'transition-max-height ease-in-out duration-700 overflow-hidden',
    enterFrom: 'max-h-0',
    enterTo: 'max-h-screen',
    leave: 'transition-max-height ease-in-out duration-300 overflow-hidden',
    leaveFrom: 'max-h-screen',
    leaveTo: 'max-h-0',
  },
};

/*
 * Main tailwind utility classes output
 *
 */

export default {
  accordion: {
    variants: {
      default: {
        base: `
          flex flex-col
          space-y-3
        `,
        container: `
          group
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
          overflow-hidden
          will-change-transform
        `,
        trigger: `
          flex flex-row
          gap-3
          items-center
          w-full
          text-left
          cursor-pointer

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light
        `,
        content: `
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,
        panel: `
          py-3
        `,
      },
      bordered: {
        base: `
          flex flex-col
          -space-y-px
        `,
        container: `
          group
          border
          border-default

          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,
        trigger: `
          flex flex-row
          items-center
          px-6 py-4
          w-full
          text-left
          cursor-pointer

          font-medium
          text-base
          bg-transparent

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light

          transition-colors
          hover:bg-background

          overflow-hidden

          group-first:rounded-tl-md group-first:rounded-tr-md
          group-last:rounded-bl-md group-last:rounded-br-md
        `,
        content: `
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,
        panel: `
          px-6 py-3
          border-t border-strong
          bg-background
        `,
      },
    },
    justified: `justify-between`,
    chevron: {
      base: `
        text-foreground-lighter
        rotate-0
        group-state-open:rotate-180
        group-data-[state=open]:rotate-180
        ease-&lsqb;cubic-bezier(0.87,_0,_0.13,_1)&rsqb;
        transition-transform duration-300
        duration-200
      `,
      align: {
        left: 'order-first',
        right: 'order-last',
      },
    },
    animate: {
      ...default___animations.accordion,
    },
  },
  /*
   * Alert
   *
   */

  alert: {
    base: `
      relative rounded-md border py-4 px-6
      flex space-x-4 items-start
    `,
    header: 'block text-sm font-normal mb-1',
    description: `text-xs`,
    variant: {
      danger: {
        base: `bg-red-200 text-red-1200 border-red-700`,
        icon: `text-red-900`,
        header: `text-red-1200`,
        description: `text-red-1100`,
      },
      warning: {
        base: `bg-amber-200 border-amber-700`,
        icon: `text-amber-900`,
        header: `text-amber-1200`,
        description: `text-amber-1100`,
      },
      info: {
        base: `bg-alternative border`,
        icon: `text-foreground-lighter`,
        header: `text-foreground`,
        description: `text-foreground-light`,
      },
      success: {
        base: `bg-brand-300 border-brand-400`,
        icon: `text-brand`,
        header: `text-brand-600`,
        description: `text-brand-600`,
      },
      neutral: {
        base: `bg-surface-100 border-default`,
        icon: `text-foreground-muted`,
        header: `text-foreground`,
        description: `text-foreground-light`,
      },
    },
    close: `
      absolute
      right-6 top-4
      p-0 m-0
      text-foreground-muted
      cursor-pointer transition ease-in-out
      bg-transparent border-transparent focus:outline-none
      opacity-50 hover:opacity-100`,
  },

  /*
   * Input
   */

  input: {
    base: `
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${defaults.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${defaults.placeholder}
      group
    `,
    variants: {
      standard: `
        bg-foreground/[.026]
        border border-control
        `,
      error: `
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `,
    },
    container: 'relative',
    with_icon: 'pl-10',
    size: {
      ...default__padding_and_text,
    },
    disabled: 'opacity-50',
    actions_container: 'absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center',
    textarea_actions_container: 'absolute inset-y-1.5 right-0 pl-3 pr-1 flex space-x-1 items-start',
    textarea_actions_container_items: 'flex items-center',
  },

  /*
   * Select
   */

  select: {
    base: `
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${defaults.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${defaults.placeholder}

      appearance-none
      bg-none
    `,
    variants: {
      standard: `
        bg-background
        border border-strong
        `,
      error: `
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `,
    },
    container: 'relative',
    with_icon: 'pl-10',
    size: {
      ...default__padding_and_text,
    },
    disabled: 'opacity-50',
    actions_container: 'absolute inset-y-0 right-0 pl-3 pr-1 mr-5 flex items-center',
    chevron_container: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
    chevron: 'h-5 w-5 text-foreground-lighter',
  },

  /*
   * Input Number
   */

  inputNumber: {
    base: `
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${defaults.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${defaults.placeholder}

      appearance-none
      bg-none
    `,
    variants: {
      standard: `
        bg-control
        border border-strong
      `,
      error: `
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `,
    },
    disabled: 'opacity-50',
    container: 'relative',
    with_icon: 'pl-10',
    size: {
      ...default__padding_and_text,
    },
    actions_container: 'absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center',
  },

  listbox: {
    base: `
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      text-foreground
      border
      focus-visible:shadow-md
      ${defaults.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${defaults.placeholder}
      indent-px
      transition-all
      bg-none
    `,
    container: 'relative',
    label: `truncate`,
    variants: {
      standard: `
        bg-control
        border border-control

        aria-expanded:border-foreground-muted
        aria-expanded:ring-border-muted
        aria-expanded:ring-2
        `,
      error: `
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `,
    },
    options_container_animate: `
      transition
      data-open:animate-slide-down
      data-open:opacity-1
      data-closed:animate-slide-up
      data-closed:opacity-0
    `,
    options_container: `
      bg-overlay
      shadow-lg
      border border-solid
      border-overlay max-h-60
      rounded-md py-1 text-base
      sm:text-sm z-10 overflow-hidden overflow-y-scroll

      origin-dropdown
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,
    with_icon: 'pl-2',
    addOnBefore: `
      w-full flex flex-row items-center space-x-3
    `,
    size: {
      ...default__padding_and_text,
    },
    disabled: `opacity-50`,
    actions_container: 'absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center',
    chevron_container: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
    chevron: 'h-5 w-5 text-foreground-muted',
    option: `
      w-listbox
      transition cursor-pointer select-none relative py-2 pl-3 pr-9
      text-foreground-light
      text-sm
      hover:bg-border-overlay
      focus:bg-border-overlay
      focus:text-foreground
      border-none
      focus:outline-none
    `,
    option_active: `text-foreground bg-selection`,
    option_disabled: `cursor-not-allowed opacity-60`,
    option_inner: `flex items-center space-x-3`,
    option_check: `absolute inset-y-0 right-0 flex items-center pr-3 text-brand`,
    option_check_active: `text-brand`,
    option_check_icon: `h-5 w-5`,
  },

  toggle: {
    base: `
      p-0 relative
      inline-flex flex-shrink-0
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors ease-in-out duration-200
      ${defaults.focus}
      focus:!ring-border
      bg-foreground-muted/40

      hover:bg-foreground-muted/60
    `,
    active: `
      !bg-brand
      !hover:bg-brand
    `,
    handle_container: {
      tiny: 'h-4 w-7',
      small: 'h-6 w-11',
      medium: 'h-6 w-11',
      large: 'h-7 w-12',
      xlarge: 'h-7 w-12',
    },
    handle: {
      base: `
        inline-block h-5 w-5
        rounded-full
        bg-white
        shadow ring-0
        transition
        ease-in-out duration-200
      `,
      tiny: '!h-3 !w-3',
      small: '!h-5 !w-5',
      medium: '!h-5 !w-5',
      large: '!h-6 !w-6',
      xlarge: '!h-6 !w-6',
    },
    handle_active: {
      tiny: ' translate-x-3 dark:bg-white',
      small: 'translate-x-5 dark:bg-white',
      medium: 'translate-x-5 dark:bg-white',
      large: 'translate-x-5 dark:bg-white',
      xlarge: 'translate-x-5 dark:bg-white',
    },
    disabled: 'opacity-75 cursor-not-allowed',
  },

  sidepanel: {
    base: `
      z-50
      bg-dash-sidebar
      flex flex-col
      fixed
      inset-y-0
      h-full lg:h-screen
      border-l
      shadow-xl
    `,
    header: `
      space-y-1 py-4 px-4 bg-dash-sidebar sm:px-6
      border-b
    `,
    contents: `
      relative
      flex-1
      overflow-y-auto
    `,
    content: `
      px-4 sm:px-6
    `,
    footer: `
      flex justify-end gap-2
      p-4 bg-overlay
      border-t
    `,
    size: {
      medium: `w-screen max-w-md h-full`,
      large: `w-screen max-w-2xl h-full`,
      xlarge: `w-screen max-w-3xl h-full`,
      xxlarge: `w-screen max-w-4xl h-full`,
      xxxlarge: `w-screen max-w-5xl h-full`,
      xxxxlarge: `w-screen max-w-6xl h-full`,
    },
    align: {
      left: `
        left-0
        data-open:animate-panel-slide-left-out
        data-closed:animate-panel-slide-left-in
      `,
      right: `
        right-0
        data-open:animate-panel-slide-right-out
        data-closed:animate-panel-slide-right-in
      `,
    },
    separator: `
      w-full
      h-px
      my-2
      bg-border
    `,
    overlay: `
      z-50
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,
    // this is to reset the button
    // it is advised not to change this
    trigger: `
      border-none bg-transparent p-0 focus:ring-0
    `,
  },

  /*
   *  Form Layout
   */

  form_layout: {
    container: 'grid gap-2',

    flex: {
      left: {
        base: 'flex flex-row gap-6',
        content: ``,
        labels: 'order-2',
        data_input: 'order-1',
      },
      right: {
        base: 'flex flex-row gap-6 justify-between',
        content: `order-last`,
        labels: '',
        data_input: 'text-right',
      },
    },

    responsive: 'md:grid md:grid-cols-12',
    non_responsive: 'grid grid-cols-12 gap-2',

    labels_horizontal_layout: 'flex flex-row space-x-2 justify-between col-span-12',
    labels_vertical_layout: 'flex flex-col space-y-2 col-span-4',

    data_input_horizontal_layout: 'col-span-12',

    non_box_data_input_spacing_vertical: 'my-3',
    non_box_data_input_spacing_horizontal: 'my-3 md:mt-0 mb-3',

    data_input_vertical_layout: 'col-span-8',

    data_input_vertical_layout__align_right: 'text-right',

    label: {
      base: 'inline-block text-foreground-light',
      size: {
        ...defaults.size.text,
      },
    },
    label_optional: {
      base: 'text-foreground-lighter',
      size: {
        ...defaults.size.text,
      },
    },
    description: {
      base: 'mt-2 text-foreground-lighter leading-normal',
      size: {
        ...defaults.size.text,
      },
    },
    label_before: {
      base: 'text-foreground-lighter ',
      size: {
        ...defaults.size.text,
      },
    },
    label_after: {
      base: 'text-foreground-lighter',
      size: {
        ...defaults.size.text,
      },
    },
    error: {
      base: `
        text-red-900
        transition-all
        data-show:mt-2
        data-show:animate-slide-down-normal
        data-hide:animate-slide-up-normal
      `,
      size: {
        ...defaults.size.text,
      },
    },
    size: {
      tiny: 'text-xs',
      small: 'text-sm leading-4',
      medium: 'text-sm',
      large: 'text-base',
      xlarge: 'text-base',
    },
  },

  inputErrorIcon: {
    base: `
      flex items-center
      right-3 pr-2 pl-2
      inset-y-0
      pointer-events-none
      text-red-900
    `,
  },

  inputIconContainer: {
    base: `
    absolute inset-y-0
    left-0 pl-3 flex
    items-center pointer-events-none
    text-foreground-light
    [&_svg]:stroke-[1.5]
    `,
    size: {
      tiny: '[&_svg]:h-[14px] [&_svg]:w-[14px]',
      small: '[&_svg]:h-[18px] [&_svg]:w-[18px]',
      medium: '[&_svg]:h-[20px] [&_svg]:w-[20px]',
      large: '[&_svg]:h-[20px] [&_svg]:w-[20px]',
      xlarge: '[&_svg]:h-[24px] [&_svg]:w-[24px]',
      xxlarge: '[&_svg]:h-[30px] [&_svg]:w-[30px]',
      xxxlarge: '[&_svg]:h-[42px] [&_svg]:w-[42px]',
    },
  },

  // Icon

  icon: {
    container: `flex-shrink-0 flex items-center justify-center rounded-full p-3`,
  },

  loading: {
    base: `relative`,
    content: {
      base: `transition-opacity duration-300`,
      active: `opacity-40`,
    },
    spinner: `
      absolute
      text-brand animate-spin
      inset-0
      m-auto
    `,
  },
};

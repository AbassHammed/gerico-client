/*
 * Globlal Variables
 *
 */

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

/*
 * Main tailwind utility classes output
 *
 */

export default {
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
      base: 'block text-foreground-light',
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

// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'w-full leading-tight text-white bg-grey-0 focus:border-grey-40',
    status: {
      none: 'border-grey-0',
      valid: 'border-green-0',
      error: 'border-red-500',
      disabled: 'border-grey-0 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: 'border rounded',
      dashed: 'border-dashed border-b',
    },
  },
  light: {
    base: 'w-full leading-tight text-grey-0 bg-white focus:border-grey-40',
    status: {
      none: 'border-grey-0',
      valid: 'border-green-0',
      error: 'border-red-500',
      disabled: 'border-grey-0 opacity-50',
    },
    icon: 'text-grey-0 text-opacity-50',
    mode: {
      normal: 'border rounded-lg',
      dashed: 'border-dashed border-b',
    },
  },
};

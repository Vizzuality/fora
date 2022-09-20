// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'bg-grey-0 border rounded-full text-blue-500',
    status: {
      none: 'border-grey-0',
      valid: 'border-green-800',
      error: 'border-red-500',
      disabled: 'border-grey-0 opacity-50',
    },
  },
  light: {
    base: 'bg-white border rounded-full text-blue-500',
    status: {
      none: 'border-grey-0',
      valid: 'border-green-800',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-grey-0 opacity-50',
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'text-grey-0 text-base border-2 boder-grey-0 focus:border-grey-0',
    status: {
      none: 'border-grey-0',
      valid: 'border-grey-0',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-grey-60 opacity-50',
    },
  },
  light: {
    base: 'bg-white text-base focus:border-grey-0',
    status: {
      none: 'border-grey-0',
      valid: 'border-grey-0',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-grey-0 opacity-50',
    },
  },
};

export const THEME = {
  dark: {
    container:
      'ring-1 ring-grey-40 relative flex items-center justify-between text-white bg-transparent rounded-3xl w-full py-1 px-4',
    menu: 'ring-2 ring-blue-0 bg-grey-0 rounded-2xl overflow-y-auto overflow-x-hidden',
    category: 'px-4 my-5 text-white opacity-50',

    item: {
      base: 'flex items-center space-x-2.5 px-6 py-3 text-left transition duration-150 ease-out rounded-sm cursor-pointer focus:bg-blue-0 outline-0 min-h-4',
      unchecked: 'bg-grey-0 text-white',
      checked: 'bg-blue-0 text-white',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  light: {
    container:
      'ring-1 ring-grey-40 relative flex items-center justify-between text-grey-0 bg-transparent rounded-3xl w-full py-1 px-4',
    menu: 'ring-2 ring-blue-0 bg-white rounded-2xl overflow-y-auto overflow-x-hidden',
    category: 'px-4 my-5 text-grey-0 opacity-50',

    item: {
      base: 'flex items-center space-x-2.5 px-6 py-3 text-left transition duration-150 ease-out rounded-sm cursor-pointer focus:bg-blue-0 outline-0 min-h-4',
      unchecked: 'bg-white text-grey-0',
      checked: 'bg-blue-0 text-white',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
};

export const SIZE = {
  sm: 'px-2 py-1',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

export default THEME;

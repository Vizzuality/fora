const THEME = {
  dark: {
    container: 'text-white text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-grey-0 rounded-lg',
    menu: 'bg-transparent',
    item: {
      base: 'text-sm text-white',
      active: 'bg-black text-white',
      selected: 'bg-black/50 text-white',
      disabled: 'opacity-40 text-white',
    },
    open: {
      button: 'bg-transparent',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  light: {
    container: 'text-gray-600 text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-grey-0 rounded-lg',
    menu: 'bg-white',
    item: {
      base: 'text-sm',
      active: 'bg-black/30 text-black',
      selected: 'bg-black/40 text-black',
      disabled: 'opacity-40 text-black',
    },
    open: {
      button: 'bg-transparent',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  none: {
    container: 'w-auto inline-flex',
    button: 'pr-8 font-semibold',
    menu: 'bg-white',
    item: {
      base: '',
      active: 'bg-grey-60 text-black',
      selected: 'bg-black/10 text-black',
      disabled: 'opacity-40 text-black',
    },
    open: {
      button: '',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
    none: '',
  },
};

export default THEME;

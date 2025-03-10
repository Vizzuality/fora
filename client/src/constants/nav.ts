type NavItem = {
  label: string;
  href: string;
  filled?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  auth?: boolean;
  footer?: boolean;
};

export const NAV: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    footer: true,
  },
  {
    label: 'Funders',
    href: '/funders',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Action Map',
    href: '/action-map',
  },
  {
    label: 'Dashboards',
    href: '/dashboards',
  },
  {
    label: 'About',
    href: 'https://forainitiative.org/about/',
    footer: true,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    label: 'Contact',
    href: 'https://forainitiative.org/contact/',
    filled: true,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    label: 'Log In',
    href: '/auth/signin',
    className: 'border border-grey-0 rounded-lg bg-white',
    auth: true,
  },
];

export const NAV_AUTH: NavItem[] = [
  {
    label: 'My details',
    href: '/auth/details',
  },
  {
    label: 'My projects',
    href: '/auth/projects',
  },
  {
    label: 'My investments',
    href: '/auth/investments',
  },
];

export const POLICIES = [
  {
    label: 'Privacy policy',
    href: '/privacy-policy',
  },
  {
    label: 'Terms of use',
    href: '/terms-of-use',
  },
];

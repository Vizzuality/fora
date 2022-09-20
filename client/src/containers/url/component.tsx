import { useEffect } from 'react';

export interface UrlProps {
  pathname: string;
  state: any;
  sync: (pathname: string, state: any) => void;
}

const Url = ({ pathname, state, sync }: UrlProps) => {
  useEffect(() => {
    sync(pathname, state);
  }, [pathname, state, sync]);

  return null;
};

export default Url;

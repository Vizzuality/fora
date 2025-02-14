import cx from 'classnames';

import { useRouter } from 'next/router';

import Footer from 'containers/footer';
import Header from 'containers/header';

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (props: ApplicationLayoutProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <div
      className={cx({
        'flex flex-col lg:min-h-screen bg-grey-60': true,
        'bg-grey-60': pathname.includes('/auth'),
      })}
    >
      <Header />

      <main className="flex flex-col grow">
        {/* Content */}
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationLayout;

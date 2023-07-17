import Footer from 'containers/footer';
import Header from 'containers/header';

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (props: ApplicationLayoutProps) => {
  const { children } = props;

  return (
    <div className="flex flex-col lg:min-h-screen">
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

import { useParams } from 'next/navigation';

import ChangePassword from 'containers/auth/change-password';

import { withAuth } from 'hoc/auth';

const SignupPage = () => {
  const params = useParams<{ token: string } | null>();

  return <ChangePassword token={params?.token} isSignUp />;
};

export const getServerSideProps = withAuth();

export default SignupPage;

import { useParams } from 'next/navigation';

import ChangePassword from 'containers/auth/change-password';

const SignupPage = () => {
  const params = useParams<{ token: string } | null>();

  return <ChangePassword token={params?.token} />;
};

export default SignupPage;

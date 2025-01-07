import { useCallback } from 'react';

import { Form as FormRFF, Field as FieldRFF } from 'react-final-form';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { FORM_ERROR } from 'final-form';
import { getServerSession } from 'next-auth/next';
import { signIn } from 'next-auth/react';

import { AuthWrapper } from 'containers/wrapper/component';

import Button from 'components/button';
import { Input } from 'components/forms/input/component';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const SignInPage: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (res?.ok) {
          router.push('/projects');
        } else {
          throw new Error(res?.error || 'Failed to login');
        }
      } catch (err) {
        return {
          [FORM_ERROR]: err instanceof Error ? err.message : 'An unexpected error occurred',
        };
      }
    },
    [router]
  );

  return (
    <AuthWrapper>
      <FormRFF onSubmit={handleFormSubmit} initialValues={{ email: '', password: '' }}>
        {({ submitError, handleSubmit }) => (
          <form className="space-y-5 mb-10" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="text-3xl text-center font-normal">Log in</h2>
            <div>
              <label>Username</label>
              <FieldRFF name="email" type="email">
                {({ input }) => <Input {...input} />}
              </FieldRFF>
            </div>
            <div>
              <label>Password</label>
              <FieldRFF name="password" type="password">
                {({ input }) => <Input {...input} />}
              </FieldRFF>
              <Link href="/auth/forgot-password" className="text-sm text-green-0 hover:underline">
                Forgot password?
              </Link>
            </div>
            {submitError && <div className="text-red-0">{submitError}</div>}
            <div className="flex justify-center">
              <Button theme="green" size="base" type="submit">
                Connect
              </Button>
            </div>
          </form>
        )}
      </FormRFF>
      <div className="flex gap-4">
        <p>Don’t have an account, but you are a FORA member?</p>
        <Link
          href="https://forainitiative.org/contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-green-0 hover:underline"
        >
          Contact us
        </Link>
      </div>
    </AuthWrapper>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default SignInPage;

import { useCallback } from 'react';

import { Form as FormRFF, Field as FieldRFF, useFormState } from 'react-final-form';

import { FORM_ERROR } from 'final-form';

import { AuthWrapper } from 'containers/wrapper/component';

import Button from 'components/button';
import LinkButton from 'components/button/component';
import { Input } from 'components/forms';
import { withAuth } from 'hoc/auth';

import authenticationService from 'services/authentication';

const SuccessMessage = () => {
  const formState = useFormState();
  const emailValue = formState.values?.email;

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-3xl font-normal">Check your inbox</h2>
      <p className="text-center">
        We&apos;ve sent a link to {emailValue}. Please check your email to reset your password. If
        you don&apos;t see it, check your spam or junk folder.
      </p>
      <LinkButton theme="green" size="base" href="/auth/signin">
        Ok
      </LinkButton>
    </div>
  );
};

const ForgotPasswordPage = () => {
  const handleFormSubmit = useCallback(async ({ email }: { email: string }) => {
    try {
      await authenticationService.forgotPassword(email);
    } catch (err) {
      return {
        [FORM_ERROR]: err instanceof Error ? err.message : 'An unexpected error occurred',
      };
    }
  }, []);

  return (
    <AuthWrapper>
      <FormRFF onSubmit={handleFormSubmit} initialValues={{ email: '' }}>
        {({ submitError, handleSubmit, submitSucceeded }) => (
          <>
            {submitSucceeded ? (
              <SuccessMessage />
            ) : (
              <form className="space-y-5 mb-10" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="text-3xl text-center font-normal">Forgot password?</h2>
                <p>Enter your email and we&apos;ll send you a link back to your account.</p>
                <div>
                  <label>Email</label>
                  <FieldRFF name="email" type="email">
                    {({ input }) => <Input {...input} />}
                  </FieldRFF>
                </div>
                {submitError && <div className="text-red-0">{submitError}</div>}
                <div className="flex justify-between gap-3">
                  <LinkButton theme="outline" className="flex-1" href="/auth/signin">
                    Cancel
                  </LinkButton>
                  <Button theme="green" size="base" className="flex-1" type="submit">
                    Send link
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </FormRFF>
    </AuthWrapper>
  );
};

export const getServerSideProps = withAuth();

export default ForgotPasswordPage;

import { FC, useCallback } from 'react';

import { Form as FormRFF, Field as FieldRFF } from 'react-final-form';

import { useRouter } from 'next/navigation';

import { FORM_ERROR } from 'final-form';

import { AuthWrapper } from 'containers/wrapper/component';

import LinkButton, { Button } from 'components/button/component';
import Input from 'components/forms/input/component';

import authenticationService from 'services/authentication';

const ChangePassword: FC<{ token: string | undefined }> = ({ token }) => {
  const router = useRouter();

  const handleFormSubmit = useCallback(
    async ({
      password,
      passwordConfirmation,
    }: {
      password: string;
      passwordConfirmation: string;
    }) => {
      try {
        const res = await authenticationService.changePassword(
          token,
          password,
          passwordConfirmation
        );

        if (res?.status === 200) {
          router.push('/auth/signin');
        } else {
          throw new Error('Failed to change password');
        }
      } catch (err) {
        return {
          [FORM_ERROR]: err instanceof Error ? err.message : 'An unexpected error occurred',
        };
      }
    },
    [router, token]
  );

  return (
    <AuthWrapper>
      <FormRFF
        onSubmit={handleFormSubmit}
        initialValues={{ password: '', passwordConfirmation: '' }}
      >
        {({ submitError, handleSubmit }) => (
          <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="text-3xl text-center font-normal">Change password</h2>
            <div>
              <label>New password</label>
              <FieldRFF name="password" type="password">
                {({ input }) => <Input {...input} />}
              </FieldRFF>
            </div>
            <div>
              <label>Confirm password</label>
              <FieldRFF name="passwordConfirmation" type="password">
                {({ input }) => <Input {...input} />}
              </FieldRFF>
            </div>
            {submitError && <div className="text-red-0">{submitError}</div>}
            <div className="flex justify-between gap-3">
              <LinkButton theme="outline" className="flex-1" href="/auth/signin">
                Cancel
              </LinkButton>
              <Button theme="green" size="base" className="flex-1" type="submit">
                <span>Reset password</span>
              </Button>
            </div>
          </form>
        )}
      </FormRFF>
    </AuthWrapper>
  );
};

export default ChangePassword;

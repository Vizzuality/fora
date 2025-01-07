import axios from 'axios';

class AuthenticationService {
  private api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: { 'Content-Type': 'application/json' },
  });

  private handleApiError(err: unknown, defaultMessage: string) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.errors[0]?.title || defaultMessage);
    }
    throw err;
  }

  async signIn(email: string, password: string) {
    try {
      const response = await this.api.request({
        url: '/member/sign_in',
        method: 'POST',
        data: { email, password },
      });
      return response;
    } catch (err) {
      this.handleApiError(err, 'Failed to sign in');
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await this.api.post('/reset_password', { data: { email } });
      return response;
    } catch (err) {
      this.handleApiError(err, 'Failed to process password reset');
    }
  }

  async changePassword(token: string, password: string, passwordConfirmation: string) {
    try {
      return await this.api.put('/reset_password', {
        password,
        password_confirmation: passwordConfirmation,
        reset_password_token: token,
      });
    } catch (err) {
      this.handleApiError(err, 'Failed to change password');
    }
  }
}

export default new AuthenticationService();

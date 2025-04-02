// export interface ApplicationStatus {
//   id: string;
//   name: string;
// }

export enum ApplicationStatus {
  DoesNotProvideFunding = 'does_not_provide_funding',
  InvitationOnly = 'invitation_only',
  OpenInvitation = 'open_invitation',
}

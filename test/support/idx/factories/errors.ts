import { Factory } from 'fishery';
import { RawIdxResponse, IdxMessage, IdxMessages } from '../../../../lib/idx/types/idx-js';

export const RawIdxErrorFactory = Factory.define<RawIdxResponse>(() => {
  return {
    version: '1.0.0',
    stateHandle: 'unknown-stateHandle'
  };
});



export const IdxErrorMessageFactory = Factory.define<IdxMessage>(() => {
  return {
    class: 'ERROR',
    i18n: {
      key: 'unknown'
    },
    message: 'Default error message'
  };
});

interface IdxErrorNoAccountWithUsernameTransientParams {
  username?: string;
}

export const IdxErrorNoAccountWithUsernameFactory = Factory.define<IdxMessage, IdxErrorNoAccountWithUsernameTransientParams>(({
  transientParams
}) => {
  return {
    message: `There is no account with the Username ${transientParams.username}.`,
    i18n: {
        key: 'idx.unknown.user',
        params: []
    },
    class: 'INFO'
  };
});

export const IdxErrorMessagesFactory = Factory.define<IdxMessages>(() => {
  return {
    type: 'array',
    value: null
  };
});

export const IdxErrorAccessDeniedFactory = RawIdxErrorFactory.params({
  messages: IdxErrorMessagesFactory.build({
    value: [
      IdxErrorMessageFactory.build({
        i18n: { key: 'security.access_denied' },
        message: 'You do not have permission to perform the requested action.'
      })
    ]
  })
});

export const IdxErrorIncorrectPassword = RawIdxErrorFactory.params({
  messages: IdxErrorMessagesFactory.build({
    value: [
      IdxErrorMessageFactory.build({
        i18n: { key: 'incorrectPassword' },
        message: 'Password is incorrect'
      })
    ]
  })
});

export const IdxErrorUserNotAssignedFactory = RawIdxErrorFactory.params({
  messages: IdxErrorMessagesFactory.build({
    value: [
      IdxErrorMessageFactory.build({
        message: 'User is not assigned to this application'
      })
    ]
  })
});

export const IdxErrorAuthenticationFailedFactory = RawIdxErrorFactory.params({
  messages: IdxErrorMessagesFactory.build({
    value: [
      IdxErrorMessageFactory.build({
        i18n: { key: 'errors.E0000004' },
        message: 'Authentication failed'
      })
    ]
  })
});

export const IdxErrorResetPasswordNotAllowedFactory = RawIdxErrorFactory.params({
  messages: IdxErrorMessagesFactory.build({
    value: [
      IdxErrorMessageFactory.build({
        message: 'Reset password is not allowed at this time. Please contact support for assistance.'
      })
    ]
  })
});

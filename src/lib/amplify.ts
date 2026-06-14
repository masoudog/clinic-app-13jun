import { Amplify } from 'aws-amplify';

export function initializeAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
        userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
        identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
      },
    },
  });
}

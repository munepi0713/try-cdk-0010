const awsExports = {
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOLID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USERPOOLWEBCLIENTID,
};

export default awsExports;

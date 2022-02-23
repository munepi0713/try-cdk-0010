import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(
      this,
      "UserPool",
      {
        selfSignUpEnabled: true,
        standardAttributes: {
          email: {required: true, mutable: true},
          phoneNumber: {required: false}
        },
        signInCaseSensitive: false,
        autoVerify: {
          email: true,
        },
        signInAliases: {
          email: true,
          username: false,
        },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    )

    const userPoolDomain = userPool.addDomain(
      "Domain",
      {
        cognitoDomain: {
          domainPrefix: "try-cdk-0010"
        }
      }
    )

    const userPoolClient1 = userPool.addClient(
      "Client1",
      {
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
            implicitCodeGrant: true,
          },
          callbackUrls:[
            "https://www.example.com/cb",

          ],
          logoutUrls: [
            "https://www.example.com/signout"
          ]
          ,
          scopes: [
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.PROFILE,
          ]
          
        }
      }
    )

    const userPoolClient2 = userPool.addClient(
      "Client2",
      {
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
            implicitCodeGrant: true,
          },
          callbackUrls:[
            "https://www.example.com/cb",

          ],
          logoutUrls: [
            "https://www.example.com/signout"
          ]
          ,
          scopes: [
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.PROFILE,
          ]
          
        }
      }
    )

    new CfnOutput(this, "OutputUserPoolId", {
      value: userPool.userPoolId
    })
    new CfnOutput(this, "OutputUserPoolClientId1", {
      value: userPoolClient1.userPoolClientId
    })
    new CfnOutput(this, "OutputUserPoolClientId2", {
      value: userPoolClient2.userPoolClientId
    })
    new CfnOutput(this, "OutputUserPoolDomain", {
      value: userPoolDomain.domainName
    })
  }
}

import aws, { Credentials, S3, SES, STS } from 'aws-sdk';
import { SdkClient } from './sdkClient';
import { EmailAddresses } from '../lib/constants';

interface IAwsClient {
    sesV2: aws.SESV2
    ses: aws.SES
}

interface ISendEmailRequest {
    senderEmail?: aws.SESV2.EmailAddress;
    recipientEmail: aws.SESV2.EmailAddress;
    replyToAddresses: aws.SESV2.EmailAddressList;
    template: string;
    subject: string;
    senderName?: string;
}

export class AwsClient extends SdkClient {
    _client: IAwsClient;

    constructor() {
        super('AWS');
    }

    protected _init() {
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-south-1',
        });

        this._client = {
            sesV2: new aws.SESV2({ apiVersion: '2019-09-27' }),
            ses: new aws.SES()
        };
    }

    sendMail = ({
        emailTemplate,
        userData,
        subject,
        senderEmail
    }: any) => {
        const params = {
            Destination: {
                ToAddresses: [userData.email]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: emailTemplate,
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: senderEmail
        };
        try {
            const result = this._client.ses.sendEmail(params).promise();
            // console.log('Email sent successfully:', result);
            return
        } catch (err) {
            console.error('Error sending email:', err);
        }
    }

}
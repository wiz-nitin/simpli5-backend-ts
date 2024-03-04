"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsClient = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sdkClient_1 = require("./sdkClient");
class AwsClient extends sdkClient_1.SdkClient {
    constructor() {
        super('AWS');
        this.sendMail = ({ emailTemplate, userData, subject, replyToAddresses, senderEmail }) => {
            const params = {
                Destination: {
                    CcAddresses: replyToAddresses,
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
                Source: senderEmail,
                ReplyToAddresses: replyToAddresses
            };
            try {
                const result = this._client.ses.sendEmail(params).promise();
                // console.log('Email sent successfully:', result);
                return;
            }
            catch (err) {
                console.error('Error sending email:', err);
            }
        };
    }
    _init() {
        aws_sdk_1.default.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-south-1',
        });
        this._client = {
            sesV2: new aws_sdk_1.default.SESV2({ apiVersion: '2019-09-27' }),
            ses: new aws_sdk_1.default.SES()
        };
    }
}
exports.AwsClient = AwsClient;

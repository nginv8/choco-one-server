import { Strapi } from '@strapi/strapi';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default ({ env }: { env: Strapi['config']['get'] }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT'),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: env('SMTP_USER'),
        defaultReplyTo: env('SMTP_USER'),
      },
    },
  },
});

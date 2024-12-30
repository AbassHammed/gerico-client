'use server';

import * as crypto from 'crypto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.NEXT_PUBLIC_DO_ENDPOINT!,
  region: process.env.NEXT_PUBLIC_DO_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DO_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_DO_SECRET_KEY!,
  },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { signedUrl: string; fileUrl: string } }
  | { failure: string; success?: undefined }
>;

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  dir: 'payslips' | 'documents';
};

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
  dir = 'payslips',
}: GetSignedURLParams): SignedURLResponse => {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: 'Invalid file type' };
  }

  const fileName = generateFileName();
  const filePath = `${dir}/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_DO_BUCKET_NAME!,
    Key: filePath,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    ACL: 'public-read',
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
    return { success: { signedUrl, fileUrl: signedUrl.split('?')[0] } };
  } catch (error: any) {
    console.error(error);
    return { failure: error.message };
  }
};

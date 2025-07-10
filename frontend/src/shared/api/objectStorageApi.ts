import {
    S3Client,
    DeleteObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
} from '@aws-sdk/client-s3';

const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
const ENDPOINT = import.meta.env.VITE_endpoint;

const s3 = new S3Client({
    region: import.meta.env.VITE_region,
    requestChecksumCalculation: 'WHEN_REQUIRED',
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_ACCESS_S_KEY,
    },
    endpoint: ENDPOINT,
});

export const objectStorageApi = {
    async uploadImage(file: File): Promise<string> {
        const fileName = `${Date.now()}_${file.name}`;
        const url = `${ENDPOINT}/${BUCKET_NAME}/${fileName}`;
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: file,
            ContentType: file.type,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);

        return url;
    },

    async deleteImage(urlOrKey: string): Promise<void> {
        let key = urlOrKey;
        if (urlOrKey.startsWith('http')) {
            const url = new URL(urlOrKey);
            key = url.pathname.replace(`/${BUCKET_NAME}/`, '');
        }
        await s3.send(
            new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: key,
            }),
        );
    },

    async listImages(): Promise<string[]> {
        const result = await s3.send(
            new ListObjectsV2Command({
                Bucket: BUCKET_NAME,
            }),
        );
        return result.Contents?.map((obj) => `${ENDPOINT}/${BUCKET_NAME}/${obj.Key}`) || [];
    },

    getImageUrl(key: string): string {
        return `${ENDPOINT}/${BUCKET_NAME}/${key}`;
    },
};

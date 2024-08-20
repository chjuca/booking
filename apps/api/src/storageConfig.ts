import { Storage } from '@google-cloud/storage';
import { settings } from 'data/credentials/settings';

export const storage = new Storage({
  projectId: settings.storage.project_id,
  keyFilename: settings.storage.keyfile,
});

export const bucketName = settings.storage.bucket;
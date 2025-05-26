/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Dropbox } from 'dropbox';
import { createRequire } from 'module'
import { DROPBOX_API_ACCESS_TOKEN } from './env.js';

const require = createRequire(import.meta.url);

export const dbx = new Dropbox({ accessToken : DROPBOX_API_ACCESS_TOKEN, fetch : require('isomorphic-fetch') });
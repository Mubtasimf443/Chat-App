/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { readFileSync } from "fs";
import { dbx } from "../config/dropbox.js";
import {randomBytes, randomUUID} from 'crypto'
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";


const __dirname = fileURLToPath(import.meta.url);


export default async function uploadFile(fileName , ext ) {
    let data = readFileSync(path.join(__dirname , `../../../uploads/`+fileName));
      
    let response =await dbx.filesUpload({
        contents :data ,
        mute : true ,
        mode: { '.tag': 'overwrite' }, // Options: 'add', 'overwrite', 'update'
        autorename: false,
        path : '/' + randomUUID() + ext,
        
    });

    const link = await dbx.sharingCreateSharedLinkWithSettings({
      path : response.result.path_display
    });

    return {
        path : response.result.path_display,
        url : link.result.url.replace('?dl=0', '?raw=1')
    }
}
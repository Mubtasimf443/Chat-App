/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Namespace } from "socket.io";
import { socketAuthMiddleware } from "../common/middlewares/auth.middlewares";

export default function initMessageSerive(io = new Namespace()) {
    io.use(socketAuthMiddleware);

    io.on('connection' , (socket) => {

        socket.on('server:room:init', (data) => {});
        socket.on('server:room:open', (data) => {});
        socket.on('server:room:message', (data) => {});
        socket.on('server:room:message:image', (data) => {});
        socket.on('server:room:message:pdf', (data) => {});
        

    });
}
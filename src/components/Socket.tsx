import * as Types from "../types";

interface SocketProps {
    socket: Types.SocketDefinition;
}

export default function Socket({socket}: SocketProps) {
    return socket.type({
        x: socket.x,
        y: socket.y,
        angle: socket.angle || 0,
        size: 6,
        cprops: {
            className: "rw-socket"
        }
    });
};
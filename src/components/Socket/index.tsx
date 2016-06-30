import * as Types from "../../types";
import "./index.css";

interface SocketProps {
    key: string;
    socket: Types.SocketDefinition;
}

export default function Socket({socket}: SocketProps) {
    return socket.type({
        x: socket.x,
        y: socket.y,
        angle: socket.angle || 0,
        size: 6,
        cprops: {
            className: "rw-Socket"
        }
    });
};
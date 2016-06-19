import * as Types from "../types";
import { getState, setState } from "../store";

export default function (jack: Types.JackDefinition, x: number, y: number) {
    const {sockets, activeBox} = getState();

    let newSocket: Types.SocketDefinition;
    let dist = Infinity;

    // find nearest socket
    sockets.forEach((socket) => {
        if (socket.box === activeBox && socket.type === jack.type) {
            const dx = x - socket.x;
            const dy = y - socket.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < dist) {
                dist = d;
                newSocket = socket;
            }
        }
    });

    jack.socket = newSocket;
    if (!newSocket) {
        jack.x = x;
        jack.y = y;
    }

    setState({});
};
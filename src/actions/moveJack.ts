import * as Types from "../types";
import { getState, setState } from "../store";

export default function (jack: Types.JackDefinition, x: number, y: number) {
    const { activeBox } = getState();

    let newSocket: Types.SocketDefinition;
    let dist = Infinity;

    // find nearest socket
    if (activeBox) {
        activeBox.sockets.forEach((socket) => {
            if (socket.type === jack.type) {
                const dx = x - socket.x;
                const dy = y - socket.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < dist) {
                    dist = d;
                    newSocket = socket;
                }
            }
        });
    }

    jack.socket = newSocket;
    if (!newSocket) {
        jack.x = x;
        jack.y = y;
    }

    setState({ animatingJack: jack });
};
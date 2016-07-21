import * as React from "react";
import { SocketDefinition } from "../types";
import "./Socket.css";

interface Props {
    key: string;
    socket: SocketDefinition;
}

type Component = React.StatelessComponent<Props>;

const component: Component = ({ socket }) => {
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

component.displayName = "Socket";
export default component;
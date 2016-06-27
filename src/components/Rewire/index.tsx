import * as React from "react";
import * as Types from "../../types";
import { initialiseStore } from "../../store";
import BoxContainer from "../BoxContainer";
import WireContainer from "../WireContainer";
import clearAll from "../../actions/clearAll";
import nextKey from "../../util/nextKey";
import "./index.css";

interface RewireProps {
    heading: string;
    height: number;
    width: number;
    initialBoxes?: Types.BoxDefinition[];
    initialWires?: Types.WireDefinition[];
}

export default class Rewire extends React.Component<RewireProps, Types.State> {
    constructor(props: RewireProps) {
        super(props);

        const boxes = new Set(props.initialBoxes);
        const wires = new Set(props.initialWires);

        this.state = { boxes, wires };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        this.state.boxes.forEach(initBox);
        this.state.wires.forEach(initWire);

        return (
            <div className="rw-Rewire">
                <h1>{this.props.heading}</h1>
                <div className="rw-Rewire-container"
                    style={{ height: this.props.height, width: this.props.width }}
                    onMouseMove={this.state.onMouseMove}>
                    <WireContainer wires={this.state.wires}
                        boxes={this.state.boxes}
                        animatingJack={this.state.animatingJack} />
                    <BoxContainer boxes={this.state.boxes}
                        activeBox={this.state.activeBox} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}

const initBox = (box: Types.BoxDefinition) => {
    if (!box.key) { box.key = nextKey(); }
    box.sockets.forEach((socket) => initSocket(box, socket));
};

const initSocket = (box: Types.BoxDefinition, socket: Types.SocketDefinition) => {
    if (!socket.key) { socket.key = nextKey(); }

    const pos = socket.pos ? socket.pos + 0.5 : 0.5;

    switch (socket.side) {
        case "top":
            socket.angle = 180;
            socket.x = (box.x + (pos * box.width));
            socket.y = box.y;
            break;
        case "right":
            socket.angle = 270;
            socket.x = box.x + box.width;
            socket.y = (box.y + (pos * box.height));
            break;
        case "bottom":
            socket.angle = 0;
            socket.x = (box.x + box.width - (pos * box.width));
            socket.y = box.y + box.height;
            break;
        default:
            socket.angle = 90;
            socket.x = box.x;
            socket.y = (box.y + box.height - (pos * box.height));
            break;
    }
};

const initWire = (wire: Types.WireDefinition) => {
    if (!wire.key) { wire.key = nextKey(); }

    initJack(wire.jack1);
    initJack(wire.jack2);
};

const initJack = (jack: Types.JackDefinition) => {
    if (!jack.key) { jack.key = nextKey(); }

    if (jack.socket) {
        jack.x = jack.socket.x;
        jack.y = jack.socket.y;
        jack.angle = jack.socket.angle;
    }
    if (jack.x === undefined) { jack.x = 0; }
    if (jack.y === undefined) { jack.y = 0; }
    if (jack.angle === undefined) { jack.angle = 0; }
};
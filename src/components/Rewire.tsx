import * as React from "react";
import { BoxDefinition, WireDefinition, SocketDefinition, JackDefinition, State } from "../types";
import { initialiseStore } from "../store";
import BoxContainer from "./BoxContainer";
import WireContainer from "./WireContainer";
import clearAll from "../actions/clearAll";
import nextKey from "../util/nextKey";
import { mod } from "../util/mathUtil";
import "./Rewire.css";

interface Props {
    height: number;
    width: number;
    initialBoxes?: BoxDefinition[];
    initialWires?: WireDefinition[];
}

export default class Rewire extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { width, height } = props;
        const boxes = new Set(props.initialBoxes);
        const wires = new Set(props.initialWires);

        this.state = { width, height, boxes, wires };

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
                <div className="rw-Rewire-container"
                    style={{ height: this.state.height, width: this.state.width }}
                    onMouseMove={this.state.onMouseMove}
                    onMouseUp={this.state.onMouseUp}
                    onTouchMove={this.state.onTouchMove}
                    onTouchEnd={this.state.onTouchEnd}>
                    <WireContainer wires={this.state.wires}
                        boxes={this.state.boxes}
                        activeWire={this.state.activeWire}
                        activeJack={this.state.activeJack}
                        movingItem={this.state.movingItem} />
                    <BoxContainer boxes={this.state.boxes}
                        activeBox={this.state.activeBox}
                        movingItem={this.state.movingItem} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}

const initBox = (box: BoxDefinition) => {
    if (!box.key) { box.key = nextKey(); }
    box.sockets.forEach((socket) => initSocket(box, socket));
};

const initSocket = (box: BoxDefinition, socket: SocketDefinition) => {
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

const initWire = (wire: WireDefinition) => {
    if (!wire.key) { wire.key = nextKey(); }

    initJack(wire.jack1);
    initJack(wire.jack2);
};

const initJack = (jack: JackDefinition) => {
    if (!jack.key) { jack.key = nextKey(); }

    if (jack.socket) {
        jack.x = jack.socket.x;
        jack.y = jack.socket.y;

        const origangle = jack.angle | 0;
        const newangle = jack.socket.angle;
        let changeangle = newangle - mod(origangle, 360);
        if (changeangle > 180) {
            changeangle -= 360;
        } else if (changeangle < -180) {
            changeangle += 360;
        }
        if (changeangle !== 0) {
            // console.debug(`o=${origangle} c=${changeangle} n=${origangle + changeangle}`);
            jack.angle = origangle + changeangle;
        }
    }

    if (jack.x === undefined) { jack.x = 0; }
    if (jack.y === undefined) { jack.y = 0; }
    if (jack.angle === undefined) { jack.angle = 0; }
};
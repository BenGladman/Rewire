import * as React from "react";
import * as Types from "../../types";
import { initialiseStore } from "../../store";
import BoxContainer from "../BoxContainer";
import WireContainer from "../WireContainer";
import clearAll from "../../actions/clearAll";
import "./index.css";

interface RewireProps {
    heading: string;
    height: number;
    width: number;
    initialBoxes?: Types.BoxDefinition[];
    initialSockets?: Types.SocketDefinition[];
    initialJacks?: Types.JackDefinition[];
    initialWires?: Types.WireDefinition[];
}

export default class Rewire extends React.Component<RewireProps, Types.State> {
    constructor(props: RewireProps) {
        super(props);

        const boxes = new Set(props.initialBoxes);
        const sockets = new Set(props.initialSockets);
        const jacks = new Set(props.initialJacks);
        const wires = new Set(props.initialWires);

        this.state = { boxes, sockets, jacks, wires };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        this.state.sockets.forEach(initSocket);
        this.state.jacks.forEach(initJack);

        return (
            <div className="rw-Rewire">
                <h1>{this.props.heading}</h1>
                <div className="rw-Rewire-container"
                    style={{ height: this.props.height, width: this.props.width }}
                    onMouseMove={this.state.onMouseMove}>
                    <WireContainer wires={this.state.wires}
                        jacks={this.state.jacks}
                        sockets={this.state.sockets} />
                    <BoxContainer boxes={this.state.boxes}
                        activeBox={this.state.activeBox} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}

function initSocket(socket: Types.SocketDefinition) {
    const box = socket.box;
    if (box) {
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
    }
}

function initJack (jack: Types.JackDefinition) {
    if (jack.socket) {
        jack.x = jack.socket.x;
        jack.y = jack.socket.y;
        jack.angle = jack.socket.angle;
    }
}
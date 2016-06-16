import * as React from "react";
import * as Types from "../types";
import { initialiseStore } from "../store";
import BoxContainer from "./BoxContainer";
import WireContainer from "./WireContainer";
import clearAll from "../actions/clearAll";

interface RewireProps {
    heading: string;
    height: number;
    width: number;
    initialJacks?: Types.JackDefinition[];
    initialBoxes?: Types.BoxDefinition[];
    initialWires?: Types.WireDefinition[];
}

export default class Rewire extends React.Component<RewireProps, Types.State> {
    constructor(props: RewireProps) {
        super(props);

        const jacks = new Set(props.initialJacks);
        const boxes = new Set(props.initialBoxes);
        const wires = new Set(props.initialWires);

        this.state = { boxes, jacks, wires };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        this.state.jacks.forEach(initJack);

        return (
            <div className="rw-app">
                <h1>{this.props.heading}</h1>
                <div className="rw-container"
                    style={{ height: this.props.height, width: this.props.width }}
                    onMouseMove={this.state.onMouseMove}>
                    <WireContainer wires={this.state.wires} />
                    <BoxContainer boxes={this.state.boxes} activeBox={this.state.activeBox} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}

function initJack(jack: Types.JackDefinition) {
    const box = jack.box;
    if (box) {
        const pos = box.pos ? box.pos + 0.5 : 0.5;

        switch (box.side) {
            case "top":
                jack.angle = 180;
                jack.x = (box.box.x + (pos * box.box.width));
                jack.y = box.box.y;
                break;
            case "right":
                jack.angle = 270;
                jack.x = box.box.x + box.box.width;
                jack.y = (box.box.y + (pos * box.box.height));
                break;
            case "bottom":
                jack.angle = 0;
                jack.x = (box.box.x + box.box.width - (pos * box.box.width));
                jack.y = box.box.y + box.box.height;
                break;
            default:
                jack.angle = 90;
                jack.x = box.box.x;
                jack.y = (box.box.y + box.box.height - (pos * box.box.height));
                break;
        }
    }
}
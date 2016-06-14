import * as React from "react";
import * as Types from "../types";
import { initialiseStore } from "../store";
import BoxContainer from "./BoxContainer";
import LineContainer from "./LineContainer";
import clearAll from "../actions/clearAll";

interface ReplumbProps {
    heading: string;
    height: number;
    width: number;
    initialEndpoints?: Types.EndpointDefinition[];
    initialBoxes?: Types.BoxDefinition[];
    initialLines?: Types.LineDefinition[];
}

export default class Replumb extends React.Component<ReplumbProps, Types.State> {
    constructor(props: ReplumbProps) {
        super(props);

        const endpoints = new Set(props.initialEndpoints);
        const boxes = new Set(props.initialBoxes);
        const lines = new Set(props.initialLines);

        this.state = { boxes, endpoints, lines };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        this.state.endpoints.forEach(initEndpoint);

        return (
            <div className="pb-app">
                <h1>{this.props.heading}</h1>
                <div className="pb-container"
                    style={{ height: this.props.height, width: this.props.width }}
                    onMouseMove={this.state.onMouseMove}>
                    <LineContainer lines={this.state.lines} />
                    <BoxContainer boxes={this.state.boxes} activeBox={this.state.activeBox} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}

function initEndpoint(endpoint: Types.EndpointDefinition) {
    const box = endpoint.box;
    if (box) {
        const pos = box.pos ? box.pos + 0.5 : 0.5;

        switch (box.side) {
            case "top":
                endpoint.angle = 180;
                endpoint.x = (box.box.x + (pos * box.box.width));
                endpoint.y = box.box.y;
                break;
            case "right":
                endpoint.angle = 270;
                endpoint.x = box.box.x + box.box.width;
                endpoint.y = (box.box.y + (pos * box.box.height));
                break;
            case "bottom":
                endpoint.angle = 0;
                endpoint.x = (box.box.x + box.box.width - (pos * box.box.width));
                endpoint.y = box.box.y + box.box.height;
                break;
            default:
                endpoint.angle = 90;
                endpoint.x = box.box.x;
                endpoint.y = (box.box.y + box.box.height - (pos * box.box.height));
                break;
        }
    }
}
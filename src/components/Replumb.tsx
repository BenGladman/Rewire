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
    initialBoxes: Types.BoxDefinition[];
    initialLines: Types.LineDefinition[];
}

export default class Replumb extends React.Component<ReplumbProps, Types.State> {
    constructor(props: ReplumbProps) {
        super(props);

        this.state = {
            boxes: new Set(props.initialBoxes),
            lines: props.initialLines
        };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        return (
            <div className="pb-app">
                <h1>{this.props.heading}</h1>
                <div className="pb-container"
                    style={{ height: this.props.height, width: this.props.width }}
                    onMouseMove={this.state.onMouseMove}>
                    <LineContainer lines={this.state.lines} />
                    <BoxContainer boxes={this.state.boxes} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}
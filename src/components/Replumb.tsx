import * as React from "react";
import * as Types from "../types";
import { initialiseStore } from "../store";
import Container from "./Container";
import clearAll from "../actions/clearAll";

interface ReplumbProps {
    heading: string;
    height: number;
    width: number;
    initialLines: Types.LineDefinition[];
}

export default class Replumb extends React.Component<ReplumbProps, Types.State> {
    constructor(props: ReplumbProps) {
        super(props);
        this.state = { lines: props.initialLines };

        initialiseStore(
            () => this.state,
            (state) => this.setState(state)
        );
    }

    render() {
        return (
            <div className="pb-app">
                <h1>{this.props.heading}</h1>
                <div style={{ height: this.props.height, width: this.props.width }} onMouseMove={this.state.onMouseMove}>
                    <Container lines={this.state.lines} />
                </div>
                <button onClick={clearAll}>Clear All</button>
            </div>
        );
    }
}
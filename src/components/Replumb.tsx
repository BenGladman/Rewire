import * as React from "react";
import dispatcher from "../dispatcher";
import Container from "./Container";

interface ReplumbProps {
    heading: string;
    height: number;
    width: number;
    initialLines: any[];
}

export default class Replumb extends React.Component<ReplumbProps, any> {
    constructor(props: ReplumbProps) {
        super(props);
        this.state = { lines: props.initialLines };

        dispatcher.dispatch = (action, parameters) => {
            const lines = this.state.lines;

            switch (action) {
                case "endpoint-move":
                    const lineId = parameters.last ? lines.length - 1 : parameters.lineId;
                    lines[lineId][`x${parameters.lineEnd}`] = parameters.newX;
                    lines[lineId][`y${parameters.lineEnd}`] = parameters.newY;
                    this.setState({ lines: lines });
                    break;

                case "line-add":
                    lines.push({
                        x1: parameters.x1, y1: parameters.y1, angle1: 270, endpointType1: "arrow",
                        x2: parameters.x2, y2: parameters.y2, angle2: 270, endpointType2: "arrow"
                    });
                    this.setState({ lines: lines });
                    break;

                case "mousemove-set":
                    const mouseMoveFunc = (ev: React.MouseEvent) => {
                        if (!(ev.buttons & 1)) {
                            // left button released
                            this.setState({ onMouseMove: null});
                            return;
                        }
                        parameters.func(ev);
                        // prevent text selection
                        ev.preventDefault();
                    };
                    this.setState({ onMouseMove: mouseMoveFunc });
                    break;
            }
        };
    }

    render() {
        return (
            <div className="pb-app" onMouseMove={this.state.onMouseMove}>
                <h1>{this.props.heading}</h1>
                <div style={{ height: this.props.height, width: this.props.width } }>
                    <Container lines={this.state.lines} />
                </div>
            </div>
        );
    }
}
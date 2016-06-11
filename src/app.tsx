import * as React from "react";
import * as ReactDOM from "react-dom";
import Replumb from "./components/Replumb";

const initData = {
    heading: "myHeading",
    height: 300,
    width: 300,
    initialLines: [
        { x1: 10, y1: 10, endpointType1: "square", x2: 50, y2: 50, endpointType2: "arrow" },
        { x1: 100, y1: 10, angle1: 0, endpointType1: "circle", x2: 50, y2: 150, angle2: 90, endpointType2: "arrow" }
    ]
};

ReactDOM.render(<Replumb {...initData} />, document.getElementById("PbApp"));
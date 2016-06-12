import * as React from "react";

export type EndpointType = "none" | "circle" | "square" | "arrow";

export interface LineDefinition {
    x1: number;
    y1: number;
    angle1?: number;
    endpointType1?: EndpointType;
    x2: number;
    y2: number;
    angle2?: number;
    endpointType2?: EndpointType;
}

export interface State {
    lines?: LineDefinition[];
    onMouseMove?: (ev: React.MouseEvent) => void;
}
import * as React from "react";

export type BoxSide = "top" | "right" | "bottom" | "left";

export interface BoxDefinition {
    key: string;
    title?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: JSX.Element;
}

export type EndpointType = "none" | "circle" | "square" | "arrow";

export interface EndpointDefinition {
    key: string;
    box?: {
        box: BoxDefinition;
        side?: BoxSide;
        pos?: number;
    };
    x?: number;
    y?: number;
    angle?: number;
    endpointType?: EndpointType;
    size?: number;
}

export interface LineDefinition {
    key: string;
    endpoint1: EndpointDefinition;
    endpoint2: EndpointDefinition;
}

export interface State {
    boxes?: Set<BoxDefinition>;
    endpoints?: Set<EndpointDefinition>;
    lines?: Set<LineDefinition>;
    onMouseMove?: (ev: React.MouseEvent) => void;
    activeBox?: BoxDefinition;
}
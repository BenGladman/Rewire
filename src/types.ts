import * as React from "react";

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
    x: number;
    y: number;
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
    boxes?: Map<string, BoxDefinition>;
    lines?: LineDefinition[];
    onMouseMove?: (ev: React.MouseEvent) => void;
}
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

export type JackType = "none" | "circle" | "square" | "arrow";

export interface JackDefinition {
    key: string;
    box?: {
        box: BoxDefinition;
        side?: BoxSide;
        pos?: number;
    };
    x?: number;
    y?: number;
    angle?: number;
    type?: JackType;
    size?: number;
}

export interface WireDefinition {
    key: string;
    jack1: JackDefinition;
    jack2: JackDefinition;
}

export interface State {
    boxes?: Set<BoxDefinition>;
    jacks?: Set<JackDefinition>;
    wires?: Set<WireDefinition>;
    onMouseMove?: (ev: React.MouseEvent) => void;
    activeBox?: BoxDefinition;
}
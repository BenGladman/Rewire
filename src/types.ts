import * as React from "react";

export type BoxSide = "top" | "right" | "bottom" | "left";

export interface BoxDefinition {
    key?: string;
    title?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    content: JSX.Element;
    sockets: SocketDefinition[];
}

export interface JackTypeProps {
    x: number;
    y: number;
    angle: number;
    size: number;
    cprops: {
        className?: string;
        onMouseDown?: (ev: React.MouseEvent) => void;
        onMouseEnter?: (ev: React.MouseEvent) => void;
        onMouseLeave?: (ev: React.MouseEvent) => void;
    };
}

export type JackType = (props: JackTypeProps) => JSX.Element;

export interface SocketDefinition {
    key?: string;
    side: BoxSide;
    pos: number;
    x?: number;
    y?: number;
    angle?: number;
    type: JackType;
}

export interface JackDefinition {
    key?: string;
    socket?: SocketDefinition;
    x?: number;
    y?: number;
    angle?: number;
    type: JackType;
}

export interface WireDefinition {
    key?: string;
    jack1: JackDefinition;
    jack2: JackDefinition;
}

export type mouseHandler = (ev: React.MouseEvent) => void;
export type touchHandler = (ev: React.TouchEvent) => void;

export interface State {
    width?: number;
    height?: number;
    boxes?: Set<BoxDefinition>;
    wires?: Set<WireDefinition>;
    onMouseMove?: mouseHandler;
    onMouseUp?: mouseHandler;
    onTouchMove?: touchHandler;
    onTouchEnd?: touchHandler;
    activeBox?: BoxDefinition;
    activeWire?: WireDefinition;
    activeJack?: JackDefinition;
    movingItem?: BoxDefinition | JackDefinition;
}
import * as Types from "../types";
import { setState } from "../store";

export default function (endpoint: Types.EndpointDefinition, x: number, y: number) {
    endpoint.x = x;
    endpoint.y = y;
    setState({});
};
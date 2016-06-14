export default function (x1: number, y1: number, x2: number, y2: number) {
    const rad2deg = 180 / Math.PI;
    return (Math.atan2(x1 - x2, y2 - y1) * rad2deg) + 180;
}
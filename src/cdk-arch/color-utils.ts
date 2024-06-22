// Module providing randomHexColor and sampleColor.
// import colorsys from 'colorsys';

export const RANDOM_PALETTE = [ // eslint-disable-line
    "#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C",  // eslint-disable-line
    "#FC5185", "#FFCE66", "#6EC4E8", "#4B4E6D", "#E8AEB7",  // eslint-disable-line
    "#EDC7B7", "#FF8A5B", "#F4C2C2", "#8E6C88", "#BDBDBD",
    "#EDF5E1", "#F7FFF7", "#218380", "#FFA500", "#FFC0CB",
    "#8B0000", "#FF4500", "#FFA07A", "#FF1493", "#FF69B4",
    "#FFD700", "#DC143C", "#00FF00", "#4169E1", "#FF00FF",
    "#BA55D3", "#00FA9A", "#00FFFF", "#FFB6C1", "#9ACD32",
    "#FFFF00", "#FF7F50", "#8A2BE2", "#00BFFF", "#FF00FF",
    "#FF69B4", "#FFFF00", "#8B008B", "#00FFFF", "#000080",
    "#FF7F50", "#FFDAB9", "#FFFFE0", "#FFE4E1", "#C0C0C0",
    "#808080"
];

export function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function sampleColor(colorHex: string): string {
    // Convert input color to HSV
    const [r, g, b] = hexToRgb(colorHex);
    // const { h, s, v } = colorsys.rgb_to_hsv({ r, g, b }); // TODO
    const h = r;
    const s = g;
    const v = b;

    // Sample a new color 45 to 135 degrees apart in HSV space
    let newHue = h + 0.25 + (0.5 * Math.random());
    if (newHue > 360) {
        newHue -= 360;
    }
    const newSaturation = Math.max(s - 10, 0);
    const newValue = Math.min(v + 10, 100);
    const newColorHsv = { h: newHue, s: newSaturation, v: newValue };

    // Convert new color back to RGB and calculate its luminance
    // const { r: newR, g: newG, b: newB } = colorsys.hsv_to_rgb(newColorHsv); TODO

    const newR = r;
    const newG = g;
    const newB = b;

    const luminance = (0.2126 * newR + 0.7152 * newG + 0.0722 * newB) / 255;

    // If the luminance is too low, adjust the brightness,
    // until it meets the contrast ratio requirement
    while ((luminance + 0.05) / (0 + 0.05) < 4.5) {
        if (newColorHsv.v < 50) {
            newColorHsv.v = Math.min(newColorHsv.v + 10, 100);
        } else {
            newColorHsv.v = Math.max(newColorHsv.v - 10, 0);
        }
        // const { r: adjustedR, g: adjustedG, b: adjustedB } = colorsys.hsv_to_rgb(newColorHsv); TODO

        const adjustedR = r;
        const adjustedG = g;
        const adjustedB = b;

        const adjustedLuminance = (0.2126 * adjustedR + 0.7152 * adjustedG + 0.0722 * adjustedB) / 255;
        if ((adjustedLuminance + 0.05) / (0 + 0.05) >= 4.5) break;
    }

    // Convert new color to hex and return
    return rgbToHex(newR, newG, newB);
}

export function randomHexColor(): string {
    while (true) {
        // generate a random hex color
        const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        // calculate the luminance of the color
        const [r, g, b] = hexToRgb(color);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        // check if the contrast ratio with black text is at least 4.5: 1
        if ((luminance + 0.05) / (0 + 0.05) >= 4.5) {
            return color;
        }
    }
}

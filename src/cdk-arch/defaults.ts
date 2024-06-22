import * as path from 'path';

// Settings for Rectangle, Ellipse, Diamond
const EPSILON = 1e-9;

const BOX_DEFAULTS = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    angle: 0,
    strokeColor: "#000000",
    backgroundColor: "#ffffff",
    fillStyle: "hachure",
    strokeStyle: "solid",
    strokeWidth: 1,
    roughness: 1,
    opacity: 100,
    groupIds: [],
    roundness: { type: 3 },
    version: 1,
    versionNonce: 0,
    isDeleted: false,
    boundElements: [],
    updated: 0,
    link: null,
    locked: false,
};

// Quick extension to solid with some color
const BOX_SOLID_DEFAULTS = { ...BOX_DEFAULTS, fillStyle: "solid", backgroundColor: "#e64980", roundness: null };

// Keys to export
const BOX_EXPORT_KEYS = Object.keys(BOX_DEFAULTS);

// Extra properties for Text
const textDefaults = {
    text: "default text",
    fontSize: 20,
    fontFamily: 1,
    textAlign: "left",
    verticalAlign: "top",
    baseline: 18,
    containerId: null,
    originalText: "default text",
    roundness: null,
};

const TEXT_DEFAULTS = { ...BOX_DEFAULTS, ...textDefaults };

// Quick extension to code text
const CODE_TEXT = { ...TEXT_DEFAULTS, fontFamily: 3 };

// Additional Text keys to export
const TEXT_EXPORT_KEYS = Object.keys(TEXT_DEFAULTS);

// Font family for estimating font size
const currentFileDir = path.dirname(__filename);
const FONT_FAMILY: { [key: number]: string } = {
    1: "fonts/Virgil.ttf",
    2: "fonts/Assistant-VariableFont.ttf",
    3: "fonts/CascadiaCode.ttf",
};

Object.keys(FONT_FAMILY).forEach(key => {
    FONT_FAMILY[parseInt(key)] = path.join(currentFileDir, FONT_FAMILY[parseInt(key)]);
});

// Line defaults
const lineDefaults = {
    points: [[0, 0], [100, 100]],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: null,
    roundness: { type: 2 }, // It has only two configurations None and type 2
};

const LINE_DEFAULTS = { ...BOX_DEFAULTS, ...lineDefaults };
const LINE_EXPORT_KEYS = Object.keys(LINE_DEFAULTS);

const ARROW_DEFAULTS = { ...LINE_DEFAULTS, endArrowhead: "arrow" };

const additionalKeys = ["type", "id", "seed"];
const updateList = [BOX_EXPORT_KEYS, TEXT_EXPORT_KEYS, LINE_EXPORT_KEYS];
updateList.forEach(keylist => {
    keylist.push(...additionalKeys);
});

export {
    ARROW_DEFAULTS, BOX_DEFAULTS, BOX_EXPORT_KEYS, BOX_SOLID_DEFAULTS, CODE_TEXT, EPSILON, FONT_FAMILY,
    LINE_DEFAULTS, LINE_EXPORT_KEYS, TEXT_DEFAULTS, TEXT_EXPORT_KEYS
};


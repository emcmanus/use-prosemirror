"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prosemirror_state_1 = require("prosemirror-state");
function useProseMirror(config) {
    return react_1.useState(() => prosemirror_state_1.EditorState.create(config));
}
exports.default = useProseMirror;

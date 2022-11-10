"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const prosemirror_view_1 = require("prosemirror-view");
exports.default = react_1.forwardRef(function ProseMirror(props, ref) {
    var _a, _b;
    const root = react_1.useRef(null);
    const initialProps = react_1.useRef(props);
    const viewRef = react_1.useRef(null);
    // If this is a non-initial render, update the editor view with
    // the React render.
    // - First update editor state using `EditorView#updateState()`.
    // - Then update other props using `EditorView#setProps()`.
    // If we update state with other props together using
    // `setProps()`, scroll-into-view will not occur due to:
    // https://github.com/ProseMirror/prosemirror-view/blob/13b046a834b489530a98dd362fa55703e52e076d/src/index.js#L183-L195
    const { state } = props, restProps = __rest(props, ["state"]);
    (_a = viewRef.current) === null || _a === void 0 ? void 0 : _a.updateState(state);
    (_b = viewRef.current) === null || _b === void 0 ? void 0 : _b.setProps(buildProps(restProps));
    react_1.useEffect(() => {
        // Bootstrap the editor on first render. Note: running
        // non-initial renders inside `useEffect` produced glitchy
        // behavior.
        const { editorViewFactory: factory } = initialProps.current;
        const config = Object.assign({ state: initialProps.current.state }, buildProps(initialProps.current));
        const view = (factory === null || factory === void 0 ? void 0 : factory(root.current, config, initialProps.current)) ||
            new prosemirror_view_1.EditorView(root.current, config);
        viewRef.current = view;
        return () => {
            view.destroy();
        };
    }, []);
    react_1.useImperativeHandle(ref, () => ({
        get view() {
            return viewRef.current;
        },
    }));
    return (react_1.default.createElement("div", { ref: root, style: props.style, className: props.className }));
    function buildProps(props) {
        return Object.assign(Object.assign({}, props), { dispatchTransaction: transaction => {
                // `dispatchTransaction` takes precedence.
                if (props.dispatchTransaction) {
                    props.dispatchTransaction(transaction);
                }
                else if (props.onChange && viewRef.current) {
                    props.onChange(viewRef.current.state.apply(transaction));
                }
            } });
    }
});

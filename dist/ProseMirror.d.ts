import React, { CSSProperties } from 'react';
import { EditorView, EditorProps, DirectEditorProps } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
export interface Handle {
    view: EditorView | null;
}
interface PropsBase extends EditorProps {
    state: EditorState;
    style?: CSSProperties;
    className?: string;
    editorViewFactory?: (el: HTMLDivElement, editorProps: DirectEditorProps, props: Props) => EditorView;
}
interface PropsWithOnChange {
    onChange: (state: EditorState) => void;
    dispatchTransaction?: never;
}
interface PropsWithDispatchTransaction {
    dispatchTransaction: (transaction: Transaction) => void;
    onChange?: never;
}
declare type Props = PropsBase & (PropsWithOnChange | PropsWithDispatchTransaction);
declare const _default: React.ForwardRefExoticComponent<(PropsBase & PropsWithOnChange & React.RefAttributes<Handle>) | (PropsBase & PropsWithDispatchTransaction & React.RefAttributes<Handle>)>;
export default _default;

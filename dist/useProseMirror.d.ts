import { SetStateAction, Dispatch } from 'react';
import { EditorState } from 'prosemirror-state';
declare type Config = Parameters<typeof EditorState.create>[0];
export default function useProseMirror(config: Config): [EditorState, Dispatch<SetStateAction<EditorState>>];
export {};

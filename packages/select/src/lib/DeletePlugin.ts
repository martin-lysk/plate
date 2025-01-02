import {
  type PluginConfig,
  type QueryNodeOptions,
  BaseParagraphPlugin,
  createTSlatePlugin,
  getAboveNode,
  isBlockAboveEmpty,
  isSelectionExpanded,
  queryNode,
  removeNodes,
} from '@udecode/plate-common';

export type DeleteConfig = PluginConfig<
  'delete',
  {
    query?: QueryNodeOptions;
  }
>;

export const DeletePlugin = createTSlatePlugin<DeleteConfig>({
  key: 'delete',
  options: {
    query: {
      allow: [BaseParagraphPlugin.key],
    },
  },
}).extendEditorTransforms(({ editor, getOptions, tf: { deleteForward } }) => ({
  deleteForward(options) {
    if (!editor.selection) return;

    const { query } = getOptions();

    const isValidNode = !query || queryNode(getAboveNode(editor), query);

    if (
      !isSelectionExpanded(editor) &&
      isBlockAboveEmpty(editor) &&
      isValidNode
    ) {
      // Cursor is in query blocks and line is empty
      removeNodes(editor as any);
    } else {
      // When the line is not empty or other conditions are not met, fall back to default behavior
      deleteForward(options);
    }
  },
}));

"use babel";

import { CompositeDisposable } from "atom";

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "atom-import-to-require:convertToRequire": () => this.convertToRequire()
      })
    );
  },

  desactivate() {
    this.subscriptions.dispose();
  },

  convertToRequire() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const selection = editor.getSelectedText();
    // const extraxtText = string => {
    //   if (string.includes("defaultMessage"))
    //     return string.match(/defaultMessage: '([^']+)'/)[1];
    //   return string;
    // };
    return editor.insertText(selection + "TOTO");
  }
};

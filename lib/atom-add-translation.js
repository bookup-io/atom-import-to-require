'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-add-translation:convert': () => this.convert(),
      'atom-add-translation:convertFirst': () => this.convertFirst(),
      'atom-add-translation:convertAll': () => this.convertAll(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const selection = editor.getSelectedText();
    const lowercaseFirst = str => typeof str === 'string' && `${str.substr(0, 1).toLowerCase()}${str.substr(1)}`;
    const extraxtText = (string) => {
      if (string.includes('defaultMessage')) return (string.match(/defaultMessage: '([^']+)'/))[1];
      return string;
    }
    const removeFirstUnderscore = str => (typeof str === 'string' && str[0]  === '_') ? str.substr(1) : str;
    const splitIfTooLong = (string, selection) => {
      if (string.length > 50) {
        const intlId = extraxtText(selection)
        .replace('messages.', '')
        .replace(/'/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/\\/g, '\\\'');

        return `${string.substr(0, 50)}', '${intlId}`;
      }
      return string;
    }
    const intlId = lowercaseFirst(extraxtText(selection))
      .replace('messages.', '')
      .replace(/'/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/([A-Z])/g, ($1) => "_"+$1.toLowerCase())
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/__/g, '_')
      .replace(/\\/g, '');
    return editor.insertText(`{intl.formatMessage(text('${splitIfTooLong(removeFirstUnderscore(intlId), selection)}'))}`);
  },

  convertFirst() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const selection = editor.getSelectedText();
    const lowercaseFirst = str => typeof str === 'string' && `${str.substr(0, 1).toLowerCase()}${str.substr(1)}`;
    const extraxtText = (string) => {
      if (string.includes('defaultMessage')) return (string.match(/defaultMessage: '([^']+)'/))[1];
      return string;
    }
    const removeFirstUnderscore = str => (typeof str === 'string' && str[0]  === '_') ? str.substr(1) : str;
    const splitIfTooLong = (string, selection) => {
      if (string.length > 50) {
        const intlId = extraxtText(selection)
        .replace('messages.', '')
        .replace(/'/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/\\/g, '\\\'');

        return `${string.substr(0, 50)}', '${intlId}`;
      }
      return string;
    }
    const intlId = lowercaseFirst(extraxtText(selection))
      .replace('messages.', '')
      .replace(/'/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/([A-Z])/g, ($1) => "_"+$1.toLowerCase())
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/__/g, '_')
      .replace(/\\/g, '');
    return editor.insertText(`{uppercaseFirst(intl.formatMessage(text('${splitIfTooLong(removeFirstUnderscore(intlId), selection)}')))}`);
  },

  convertAll() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const selection = editor.getSelectedText();
    const lowercaseFirst = str => typeof str === 'string' && `${str.substr(0, 1).toLowerCase()}${str.substr(1)}`;
    const extraxtText = (string) => {
      if (string.includes('defaultMessage')) return (string.match(/defaultMessage: '([^']+)'/))[1];
      return string;
    }
    const removeFirstUnderscore = str => (typeof str === 'string' && str[0]  === '_') ? str.substr(1) : str;
    const splitIfTooLong = (string, selection) => {
      if (string.length > 50) {
        const intlId = extraxtText(selection)
        .replace('messages.', '')
        .replace(/'/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/\\/g, '\\\'');

        return `${string.substr(0, 50)}', '${intlId}`;
      }
      return string;
    }
    const intlId = lowercaseFirst(extraxtText(selection))
      .replace('messages.', '')
      .replace(/'/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/([A-Z])/g, ($1) => "_"+$1.toLowerCase())
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/__/g, '_')
      .replace(/\\/g, '');
    return editor.insertText(`{uppercaseEveryWord(intl.formatMessage(text('${splitIfTooLong(removeFirstUnderscore(intlId), selection)}')))}`);
  },

};

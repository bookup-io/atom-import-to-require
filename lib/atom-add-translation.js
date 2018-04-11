'use babel';

import AtomAddTranslationView from './atom-add-translation-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAddTranslationView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomAddTranslationView = new AtomAddTranslationView(state.atomAddTranslationViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomAddTranslationView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-add-translation:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAddTranslationView.destroy();
  },

  serialize() {
    return {
      atomAddTranslationViewState: this.atomAddTranslationView.serialize()
    };
  },

  toggle() {
    console.log('AtomAddTranslation was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

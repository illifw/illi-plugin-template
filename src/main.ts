import {
	Plugin
} from 'obsidian';

import {
	ISettings
} from './PluginSettings/ISettings';

import {
	DEFAULT_SETTINGS
} from './PluginSettings/DEFAULT_SETTINGS';

import {
	Form
} from './PluginSettings/Setup/Form';

export default class MyPlugin extends Plugin {
	settings: ISettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new Form(this.app, this));
	}

	onunload(): void {

	}

	async loadSettings(): Promise<this> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		return this;
	}

	async saveSettings(): Promise<this> {
		await this.saveData(this.settings);
		return this;
	}
}

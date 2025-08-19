//#region imports
import {
	App,
	Plugin,
	PluginManifest
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
//#endregion imports

//#region exports
export default class ILLIPluginTemplate extends Plugin {
	settings: ISettings;
		constructor(
		app: App,
		manifest: PluginManifest
	) {
		super(
			app,
			manifest
		);
		
		this.settings = DEFAULT_SETTINGS;
	}

	async onload(

	): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new Form(this));
	}

	onunload(

	): void {

	}

	async loadSettings(

	): Promise<this> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);

		return this;
	}

	async saveSettings(

	): Promise<this> {
		await this.saveData(this.settings);
		return this;
	}
}
//#endregion exports

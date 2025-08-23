//#region imports
import {
	type App,
	type PluginManifest,
	Plugin,
	TextComponent
} from 'obsidian';

import {
	type IDefaults
} from './PluginSettings/IDefaults';

import {
	type ISettings
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

	override async onload(

	): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new Form(this));
	}

	override onunload(

	): void {

	}

	private async loadSettings(

	): Promise<this> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);

		return this;
	}

	private async saveSettings(

	): Promise<this> {
		await this.saveData(this.settings);
		return this;
	}

	async update(
		newValue: string,
		settingKey: keyof IDefaults,
		field: TextComponent
	): Promise<this>;
	
	async update(
		newValue: string,
		settingKey: keyof IDefaults,
		field: TextComponent
	): Promise<this> {
		return this.updateDefault(newValue, settingKey as keyof IDefaults, field);
	}

	private async updateDefault(
		newValue: string,
		settingKey: keyof IDefaults,
		field: TextComponent
	): Promise<this> {
		const oldValue: string = this.settings[settingKey];
		//const defaultValue: string = DEFAULT_SETTINGS[settingKey];

		newValue = newValue.trim();

		if (0 === newValue.length) {
			newValue = oldValue;
			field.setValue(newValue);
		}

		if (newValue === oldValue) {
			return this;
		}

		this.settings[settingKey] = newValue;
		await this.saveSettings();

		return this;
	}
}
//#endregion exports

//#region imports
import {
	PluginSettingTab,
	Setting
} from 'obsidian';

import ILLIPluginTemplate from '../../main';
//#endregion imports

//#region exports
export class Form extends PluginSettingTab {
	plugin: ILLIPluginTemplate;

	constructor(
		plugin: ILLIPluginTemplate
	) {
		super(
			plugin.app,
			plugin
		);

		this.plugin = plugin;
	}

	display(

	): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.update(
						value,
						'mySetting',
						text
					);
				}));
	}
}
//#endregion exports

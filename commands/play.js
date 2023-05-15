
const { SlashCommandBuilder } = require('discord.js');


const command = new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music')
		.addStringOption(option => 
			option.setName('url')
				.setDescription('URL of the Youtube song')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
        const url = interaction.options.getString('url');
	},
};
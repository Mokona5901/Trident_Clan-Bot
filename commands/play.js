
const { SlashCommandBuilder } = require('discord.js');


const command = new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music with YouTube URL')
		.addStringOption(option => 
			option.setName('url')
				.setDescription('URL of the YouTube video')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
        const url = interaction.options.getString('url');
	},
};
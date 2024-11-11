const { SlashCommandBuilder } = require('discord.js');


const command = new SlashCommandBuilder()
	.setName('ai')
	.setDescription('Talk to OpenAI ChatGPT')
	.addStringOption(option =>
		option.setName('query')
			.setDescription('The query to ask to ChatGPT')
			.setRequired(true),
	);
module.exports = {
	data: command,
	async execute(interaction) {
		const query = interaction.options.getString('query');

		await interaction.reply('ChatGPT is thinking...');
	},
};
const { SlashCommandBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option => 
			option.setName('user')
				.setDescription('User you want to see informations')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
	await interaction.reply(`This command was run by ${interaction.user}, who joined on ${interaction.member}.`);
	},
};
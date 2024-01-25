const { SlashCommandBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
		.setName('count-messages')
		.setDescription('Counts the amount of messages until a specific message of a user')
		.addUserOption(option => 
			option.setName('user')
				.setDescription('User you count messages')
				.setRequired(true)
			)
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Base message ID')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
	await interaction.reply(`Number of messages : `);
	},
};
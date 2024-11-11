const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('show-event-points')
		.setDescription('Show points for each user');

module.exports = {
		data: command,
		async execute(interaction) {
				// Your logic to calculate team points and reply with the information
				// Assuming the calculateTeamPoints function is accessible here
				const userPoints = calculateUserPoints();
				await interaction.reply(`Team Points:\n${userPoints}`);
		},
};
const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('show-team-points')
		.setDescription('Show points for each house');

module.exports = {
		data: command,
		async execute(interaction) {
				// Your logic to calculate team points and reply with the information
				// Assuming the calculateTeamPoints function is accessible here
				const teamPoints = calculateTeamPoints();
				await interaction.reply(`Team Points:\n${teamPoints}`);
		},
};
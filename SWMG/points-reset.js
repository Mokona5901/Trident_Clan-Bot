const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

const command = new SlashCommandBuilder()
		.setName('points-reset')
		.setDescription('Reset points for all teams');

module.exports = {
		data: command,
		async execute(interaction) {
				const resetTeamPoints = () => {
						teamsJSON.forEach(team => {
								team.points = team.points.map(() => ''); // Set points to empty string for each team
						});

						fs.writeFileSync('teamPoints.json', JSON.stringify(teamsJSON, null, 2));

						return 'Points have been reset for all teams.';
				};

				const resetMessage = resetTeamPoints();

				await interaction.reply(resetMessage);
		},
};

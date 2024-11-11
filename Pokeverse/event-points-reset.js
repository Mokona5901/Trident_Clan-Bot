const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

const command = new SlashCommandBuilder()
		.setName('event-points-reset')
		.setDescription('Reset points for all users');

module.exports = {
		data: command,
		async execute(interaction) {
				const resetUserPoints = () => {
						usersJSON.forEach(user => {
								user.points = user.points.map(() => ''); // Set points to empty string for each team
						});

						fs.writeFileSync('eventPoints.json', JSON.stringify(usersJSON, null, 2));

						return 'Points have been reset for all teams.';
				};

				const resetMessage = resetUserPoints();

				await interaction.reply(resetMessage);
		},
};

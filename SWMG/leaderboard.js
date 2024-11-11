const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Display leaderboard of teams by points');

module.exports = {
		data: command,
		async execute(interaction) {
				const calculateTeamPoints = () => {
					let result = teamsJSON.map(team => ({
						team: team.team,
						totalPoints: team.points.reduce((acc, curr) => acc + curr, 0)
					}));

					result.sort((a, b) => b.totalPoints - a.totalPoints);

					return result;
				};

				const leaderboardData = calculateTeamPoints();

				const embed = new EmbedBuilder()
						.setTitle('Leaderboard')
						.setColor([52, 152, 219]) // Set color (Poké Catcher blue in this example)
						.setDescription('Leaderboard of teams by points');

				leaderboardData.forEach((team, index) => {
						embed.addField(`${index + 1}. ${team.team}`, `Points: ${team.totalPoints}`, true);
				});

				await interaction.reply({ embeds: [embed] });
		},
};
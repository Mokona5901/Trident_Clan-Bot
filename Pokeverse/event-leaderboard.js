const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('event-leaderboard')
		.setDescription('Display leaderboard of users by points');

module.exports = {
		data: command,
		async execute(interaction) {
				const calculateUserPoints = () => {
					let result = usersJSON.map(team => ({
						user: user.user,
						totalPoints: user.points.reduce((acc, curr) => acc + curr, 0)
					}));

					result.sort((a, b) => b.totalPoints - a.totalPoints);

					return result;
				};

				const leaderboardData = calculateUserPoints();

				const embed = new EmbedBuilder()
						.setTitle('Event leaderboard')
						.setColor([52, 152, 219]) // Set color (Poké Catcher blue in this example)
						.setDescription('Leaderboard of users by points');

				leaderboardData.forEach((user, index) => {
						embed.addField(`${index + 1}. ${user.user}`, `Points: ${user.totalPoints}`, true);
				});

				await interaction.reply({ embeds: [embed] });
		},
};
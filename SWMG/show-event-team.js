const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('show-event-teams')
		.setDescription('Display list of teams with their users');

module.exports = {
		data: command,
		async execute(interaction) {
				const lightTeamUsers = [];
				const darkTeamUsers = [];

				try {
						const eventPoints = require('./eventPoints.json');
						eventPoints.forEach(entry => {
								if (entry.team === 'Light') {
										lightTeamUsers.push(entry.username);
								} else if (entry.team === 'Dark') {
										darkTeamUsers.push(entry.username);
								}
						});

						const eventEmbed = new EmbedBuilder()
								.setTitle('Event Teams')
								.setColor([52, 152, 219]); // Set color (Poké Catcher blue in this example)

						if (lightTeamUsers.length > 0) {
								eventEmbed.addField('Light Team', lightTeamUsers.join('\n'), true);
						}

						if (darkTeamUsers.length > 0) {
								eventEmbed.addField('Dark Team', darkTeamUsers.join('\n'), true);
						}

						await interaction.reply({ embeds: [eventEmbed] });
				} catch (error) {
						console.error('Error reading eventPoints.json:', error);
						await interaction.reply('An error occurred while fetching event teams.');
				}
		},
};

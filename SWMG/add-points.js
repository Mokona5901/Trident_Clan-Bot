const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
		.setName('add-points')
		.setDescription('Add points to a certain team')
		.addStringOption(option =>
				option.setName('team')
						.setDescription('Team to add points to')
						.setRequired(true)
		)
		.addNumberOption(option =>
				option.setName('points')
						.setDescription('Points to add')
						.setRequired(true)
		);

module.exports = {
	data: command,
		async execute(interaction) {
				const team = interaction.options.getString('team');
				const pointsToAdd = interaction.options.getNumber('points');  // Changed to getNumber to accept float numbers

				// Your logic to add points to the specified team
				// Example:
				// teamPoints[team] += pointsToAdd;

				await interaction.reply(`Points added! ${pointsToAdd} points added to ${team}.`);
		},
};
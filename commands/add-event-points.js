const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
	.setName('add-event-points')
	.setDescription('Add points to a certain user')
	.addStringOption(option =>
		option.setName('user')
			.setDescription('User to add points to')
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
		const user = interaction.options.getString('user');
		const pointsToAdd = interaction.options.getNumber('points');  // Changed to getNumber to accept float numbers

		// Your logic to add points to the specified team
		// Example:
		// teamPoints[team] += pointsToAdd;

		await interaction.reply(`Points added! ${pointsToAdd} points added to ${user}.`);
	},
};
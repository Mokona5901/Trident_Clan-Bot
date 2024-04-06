const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
	.setName('add-user-event-team')
	.setDescription('Assign a user to a team')
	.addUserOption(option => 
		option.setName('user')
			.setDescription('User you want to assign to a team')
			.setRequired(true),
	)
	.addStringOption(option =>
		option.setName('team')
			.setDescription('Team to assign to the user')
			.setRequired(true)
			.addChoices(
				{ name: 'Light', value: 'Light' },
				{ name: 'Dark', value: 'Dark' })
	);

module.exports = {
	data: command,
	async execute(interaction) {
		const userToAdd = interaction.options.getString('user');
		const team = interaction.options.getNumber('team');  

		await interaction.reply(`${userToAdd} is now assigned to ${team} team.`);
	},
};

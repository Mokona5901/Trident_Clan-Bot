const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
	.setName("add-user-to-event")
	.setDescription("Add a user to the event")
	.addUserOption((option) =>
		option
			.setName("user")
			.setDescription("User you want to add to the event")
			.setRequired(true),
	)
	.addBooleanOption((option) =>
		option
			.setName("patreon")
			.setDescription("Is the user a patreon user?")
			.setRequired(true),
	);

module.exports = {
	data: command,
	async execute(interaction) {
		const user = interaction.options.getString("user");
		const patreon_user = interaction.options.getBoolean("patreon");

		await interaction.reply(`${userToAdd} is now added to the event`);
	},
};

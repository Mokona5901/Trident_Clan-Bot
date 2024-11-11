const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Sends a meme!")
		.addStringOption(option => 
			option.setName('type')
					.setDescription('Choose a type of meme')
					.setRequired(true)
					.addChoices(
						{ name: 'GIF', value: 'gif' },
						{ name: 'Picture', value: 'picture' }
					)),
	async execute(interaction) {
		await interaction.reply("Epic meme appears!");
	},
};

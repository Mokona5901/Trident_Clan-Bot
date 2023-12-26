const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('tournament')
	.setDescription('DM owner with tournament message');

module.exports = {
	data: command,
	async execute(interaction) {
		const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
		if (interaction.member.roles.cache.has(ownerRole.id)) {
			const ping = "<@&1111273420395655278>\n";
			const title = "## 🔱 members Poké Catcher Tournament #8 :\n";
			const description = "Hello members, today I announce you a new tournament, to revive dead server, it is an Anything Goes tournament !\n";
			const startTime = "Tournament will take place the <t:1696939200:F>\n\n";
			const rules = "__TOURNAMENT RULES__\n > You can use any Pokémon\n > You can't use the same Pokémon twice\n\n";
			const prizes = "__PRIZES__\n > 1st Good IV Legendary + 100k\n > 2nd Mid IV Legendary +50k\n\n";
			const DM = "Don't forget to submit your team by DM";
			const userId = interaction.user.id;
			const user = client.users.cache.get(userId); // Ensure you define 'client' and 'userId' somewhere.
			user.send(ping + title + description + startTime + rules + prizes + DM);
			await interaction.reply('Message sent');
		} else {
			await interaction.reply('You do not have permission to use this command!');
		}
	},
};

/*const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
	.setName('tournament')
	.setDescription('DM owner with tournament message')
	.addStringOption(option => option
		.setName('titles')
		.setDescription('The title of the tournament')
		.setRequired(true))
	.addStringOption(option => option
		.setName('description')
		.setDescription('The description of the tournament')
		.setRequired(true))
	.addStringOption(option => option
		.setName('startTime')
		.setDescription('The start time of the tournament')
		.setRequired(true))
	.addStringOption(option => option
		.setName('rules')
		.setDescription('The rules of the tournament')
		.setRequired(true))
	.addStringOption(option => option
		.setName('prizes')
		.setDescription('The prizes of the tournament')
		.setRequired(true));*/

/*module.exports = {
	data: command,
	async execute(interaction, client) {
		const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
		if (interaction.member.roles.cache.has(ownerRole.id)) {
			const ping = "<@&1111273420395655278>\n";
			const title = interaction.options.getString('titles');
			const description = interaction.options.getString('description');
			const startTime = interaction.options.getString('startTime');
			const rules = interaction.options.getString('rules');
			const prizes = interaction.options.getString('prizes');
			const DM = "Don't forget to submit your team by DM";
			const userId = interaction.user.id;
			const user = client.users.cache.get(userId); // Ensure you define 'client' and 'userId' somewhere.
			user.send(ping + title + description + startTime + rules + prizes + DM);
			await interaction.reply('Message sent');
		} else {
			await interaction.reply('You do not have permission to use this command!');
		}
	},
};*/
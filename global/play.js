
/*const { SlashCommandBuilder } = require('discord.js');


const command = new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music with YouTube URL')
		.addStringOption(option => 
			option.setName('url')
				.setDescription('URL of the YouTube video')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
        const url = interaction.options.getString('url');
	},
};*/

const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		)
				.addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a playlist from YT")
				.addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Plays a single song from YT")
				.addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
		),
}
const {
	Client,
	Events,
	GatewayIntentBits,
	ActivityType,
	MessageSelectMenu,
	StringSelectMenuOptionBuilder,
	PermissionsBitField,
	Partials,
} = require("discord.js");
//const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder } = require("@discordjs/builders");
const {
	token,
	tenor_api,
	humor_api,
	openai_api,
	main_token
} = require("./private/config.json");
const http = require("http");
const fs = require("fs");
const { createReadStream } = require("fs");
const ytdl = require("ytdl-core");
const contestants = "0";
const tournament_timestamp = "<t:1696939200:F>";
const status = "when clan will revive";
const Mee6LevelsApi = require("mee6-levels-api");
const SWMG_guildId = "1029760958698102934";
const express = require("express");
const app = express();
const { joinVoiceChannel } = require("@discordjs/voice");
const { Player, QueryType } = require("discord-player");
const {
	YouTubeExtractor,
	BridgeProvider,
	BridgeSource,
} = require("@discord-player/extractor");
const statusFile = "badges.json";
const axios = require("axios");

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Map to track active AI conversations
const activeConversations = new Map();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	console.log(
		`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels`,
	);
});
//client.user.setStatus('dnd');
//client.user.setActivity('you', { type: "WATCHING" });
/*client.user.setActivity(`${contestants} contestants`, {
	type: ActivityType.Watching,
	});*/
client.on("ready", () => {
	client.user.setActivity(status, { type: ActivityType.Watching });
});

// Log in to Discord with your client's token
client.login(main_token);

	//const port = process.env.PORT || 3000;

	//let lastPingStatus = 'Ping status unknown';

	// Define a route for the root URL ("/")
	//app.get('/', (req, res) => {
	//	res.send('Bot is running'); // You can customize this response
	//});

	// Define a route for responding with "Alive"
	//app.get('/ping', (req, res) => {
	//	console.log('Sending "Alive" response');
	//	res.send('Alive');
	//});

	// Define a route to get the last ping status
	//app.get('/ping-status', (req, res) => {
	//	res.send(lastPingStatus);
	//});

	// Your other routes and application logic go here

	// Start the server
	//app.listen(port, () => {
	//	console.log(`Server is running on port ${port}`);
	//});

	// Simulate sending "Ping failed" every minute
	//setInterval(() => {
	//	lastPingStatus = 'Ping failed';
	//}, 60 * 1000); // 60,000 milliseconds = 1 minute

	//app.all('/', (req, res) => {
	//		res.status(200).send('heartbeat');
	//});

	//function keepAlive() {
	//		app.listen(3000, () => {
	//				console.log(`Server is ready!`)
	//		})
	//};

//client.on('ready', () => {
//		keepAlive(); // Call the keepAlive function when the bot is ready
//	});
//keepAlive();

// Health check endpoint
app.get("/health", (req, res) => {
	// Implement your logic to determine health status
	//const isOnline;/* Your logic to determine if the app is online */

		// Update the JSON file with the current status
		updateStatusFile(isOnline);

	// Return the current status as a response
	res.json({ status: isOnline ? "online" : "offline" });
});

// Function to update the status JSON file
function updateStatusFile(isOnline) {
	const statusData = [
		{
			status: isOnline ? "online" : "offline",
			URL: isOnline
				? "https://img.shields.io/badge/status-online-green.svg?logo=data:image/png;base64,verylongbase64url"
				: "https://img.shields.io/badge/status-offline-red.svg?logo=data:image/png;base64,verylongbase64url",
		},
	];

		// Write the updated status to the JSON file
		fs.writeFileSync(statusFile, JSON.stringify(statusData, null, 2));
	}

	// Start the server
	//app.listen(port, () => {
	//	console.log(`Server is running on port ${port}`);
	//});

/*client.on("messageCreate", (message) => {
	if (message.mentions.has(client.user)) {
		message.channel.send("Hey there!");
	}
});*/

//ping command
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "ping") {
		timeStamp = Date.now();
		await interaction.reply(
			`Pong! Command's latency is ${timeStamp - interaction.createdTimestamp} ms 🏓`,
		);
		var dateFormat = new Date(timeStamp);
	}

	if (interaction.commandName === "server") {
		if (interaction.guild.memberCount.toString().includes("69")) {
			await interaction.reply(
				`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount} members. Lmao 69 <a:pepe_kek_explode:1179057815042662440>`,
			);
		} else {
			await interaction.reply(
				`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
			);
		}
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
	}

	// user command
	if (interaction.commandName === "user") {
		const user = interaction.options.getUser("user");
		await interaction.reply(
			`${user.username} joined on ${interaction.member.joinedAt}.`,
		);
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
	}

	// rob-balls command
	/*if (interaction.commandName === "rob-balls") {
		const user = interaction.options.getUser("user");
		await interaction.reply(
			`Stolen ${user.username} balls <:troll_blur:1130497483382988890>`,
		);
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
	}*/

	if (interaction.commandName === "tournament") {
		//const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
		const serverOwnerId = interaction.guild.ownerId;
		if (serverOwnerId === interaction.member.user.id) {
			const ping = "<@&1111273420395655278>\n";
			const title = "## 🔱 members Poké Catcher Tournament #8 :\n";
			const description =
				"Hello members, today I announce you a new tournament, to revive dead server, it is a Anything Goes tournament !\n";
			const startTime = "Tournament will take place the <t:1696939200:F>\n \n";
			const rules =
				"__TOURNAMENT RULES__\n > You can use any Pokémon\n > You can't use the same Pokémon twice\n";
			const prizes =
				"__PRIZES__\n > 1st Good IV Legendary + 100k\n > 2nd Mid IV Legendary +50k\n \n";
			const DM = "Don't forget to submit team by DM";
			const userId = interaction.user.id;
			const user = client.users.cache.get(userId);
			user.send(ping + title + description + startTime + rules + prizes + DM);
			await interaction.reply("Message sent");
		} else {
			await interaction.reply(
				"You do not have permission to use this command!",
			);
		}
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
	}

	// news command
	if (interaction.commandName === "news") {
		/*// Create options for the dropdown list
		const option1 = new StringSelectMenuOptionBuilder()
		.setLabel('Option 1')
		.setValue('option1')
		.setDescription('This is the first option');

			const option2 = new StringSelectMenuOptionBuilder()
			.setLabel('Option 2')
			.setValue('option2')
			.setDescription('This is the second option');

			// Create the dropdown list
			const selectMenu = new MessageSelectMenu()
			.setCustomId('dropdown')
			.setPlaceholder('Select an option')
			.addOptions([option1, option2]);

			// Create an action row to contain the dropdown list
			const actionRow = new MessageActionRow().addComponents(selectMenu);

			await interaction.reply({
				content: 'Please select an option:',
				components: [actionRow], // Add the action row with the dropdown list
				});*/

		const tournamentEmbed = new EmbedBuilder()
			.addFields({ name: "No current tournament", value: " " }) //use .setColor([a,b,c]) after .addFields
			.setColor([52, 152, 219]); //Poké Catcher blue
		//.setColor([50, 51, 55]) //transparent for dark theme
		/*.addFields(
			{ name: 'No current tournament', value: 'but one is coming... <:black_man_shocked:1070808202486218853>' })*/
		/*.addFields(
			{ name: '__🔱 members Tournament #8__', value: 'Anything Goes !' },
			{ name: '__Description :__', value: 'You can use any Pokémon' },
			{ name: '__Requirements :__', value: '> You cannot use the same Pokémon twice' },
			{ name: '__Maximum number of contestants :__', value: '8' },
			{ name: `__Current number of contestants who entered :__`, value: `${contestants}` },
			{ name: '__When ?__', value: `${tournament_timestamp}` },
			{ name: '__Prizes__', value: '> 1st : Good IV Legendary + 200k\n > 2nd : Mid IV Legendary + 100k' });*/

		/*.addFields(
							{ name: '__🔱 members Tournament #8 is on !__', value: 'Go check <#1102550299488563260> ' }
		)*/
		await interaction.reply({ embeds: [tournamentEmbed] });
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
	}

	// reminder command
	if (interaction.commandName === "reminder") {
		const time = interaction.options.getString("time");
		const message = interaction.options.getString("message");
		const userId = interaction.user.id;

		if (time && message) {
			const response = setReminder(time, message, userId);
			await interaction.reply(response);
		} else {
			await interaction.reply(
				"Invalid command usage. Please provide both time and message. Syntax : <today or tomorrow> <hour + AM/PM>. French timezone",
			);
		}
	}
	/*else if (interaction.commandName === 'clearreminder') {
					const userId = interaction.user.id;
					const response = clearReminder(userId);
					await interaction.reply(response);
				}*/

		// play command
		/*if (interaction.commandName === 'play') {
			// Check if the user is in a voice channel
			if (!interaction.member.voice.channel) {
				await interaction.reply('You need to be in a voice channel to play music!');
				return;
			}

			// Join the voice channel
			const connection = await interaction.member.voice.channel.join();

			// Get the video URL from the slash command arguments
			const url = interaction.options.getString('url');

			// Play the YouTube audio stream in the voice channel
			const stream = await ytdl(url, { filter: 'audioonly' });
			const dispatcher = connection.play(stream, { type: 'opus' });

			dispatcher.on('start', () => {
				console.log('Playing audio in the voice channel!');
				interaction.reply('Now playing: ' + url);
			});

			dispatcher.on('finish', () => {
				console.log('Finished playing audio!');
				interaction.member.voice.channel.leave();
			});

			dispatcher.on('error', (err) => {
				console.error(err);
				interaction.member.voice.channel.leave();
			});
		}*/

	if (interaction.commandName === "play") {
		if (!interaction.member.voice.channel)
			return interaction.reply(
				"You need to be in a Voice Channel to play a song.",
			);

		// Create a play queue for the server
		const queue = await client.player.queues.create(interaction.guild);

		// Wait until you are connected to the channel
		if (!queue.connection)
			await queue.connect(interaction.member.voice.channel);

		let embed = new EmbedBuilder();

		if (interaction.options.getSubcommand() === "song") {
			let url = interaction.options.getString("url");

			// Search for the song using the discord-player
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});

			// finish if no tracks were found
			if (result.tracks.length === 0) return interaction.reply("No results");

			// Add the track to the queue
			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(
					`**[${song.title}](${song.url})** has been added to the Queue`,
				)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		} else if (interaction.options.getSubcommand() === "playlist") {
			// Search for the playlist using the discord-player
			let url = interaction.options.getString("url");
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});

			if (result.tracks.length === 0)
				return interaction.reply(`No playlists found with ${url}`);

			// Add the tracks to the queue
			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed
				.setDescription(
					`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`,
				)
				.setThumbnail(playlist.thumbnail);
		} else if (interaction.options.getSubcommand() === "search") {
			// Search for the song using the discord-player
			let url = interaction.options.getString("searchterms");
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});

			// finish if no tracks were found
			if (result.tracks.length === 0)
				return interaction.editReply("No results");

			// Add the track to the queue
			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(
					`**[${song.title}](${song.url})** has been added to the Queue`,
				)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` });
		}

		// Play the song
		if (!queue.playing) await queue.play();

		// Respond with the embed containing information about the player
		await interaction.reply({
			embeds: [embed],
		});
		await player.extractors.loadDefault();
	}

	// level command
	if (interaction.commandName === "level") {
		const currentGuildId = interaction.guild.id;
		try {
			const selectedOption = interaction.options.getString("range");
			let leaderboard;
			let message = "";

			switch (selectedOption) {
				case "0_10":
					leaderboard = (
						await Mee6LevelsApi.getLeaderboard(currentGuildId)
					).filter((member) => member.level >= 0 && member.level <= 10);
					message = `This part isn't ready, try other level ranges please`;
					break;
				case "11_20":
					leaderboard = (
						await Mee6LevelsApi.getLeaderboard(currentGuildId)
					).filter((member) => member.level > 10 && member.level <= 20);
					message = `__Leaderboard of level 11-20 :__ \n\n${formatLeaderboard(leaderboard)}`;
					break;
				case "21_30":
					leaderboard = (
						await Mee6LevelsApi.getLeaderboard(currentGuildId)
					).filter((member) => member.level > 20 && member.level <= 30);
					message = `__Leaderboard of level 21-30 :__ \n\n${formatLeaderboard(leaderboard)}`;
					break;
				case "30+":
					leaderboard = (
						await Mee6LevelsApi.getLeaderboard(currentGuildId)
					).filter((member) => member.level > 30);
					message = `__Leaderboard of level 30+ :__ \n\n${formatLeaderboard(leaderboard)}`;
					break;
				default:
					message = "Invalid option selected.";
					break;
			}

			interaction.reply(message);
		} catch (error) {
			interaction.reply(
				(message = `Server's Mee6 leaderbord isn't setup as public, owner should enable it at : [Mee6 leaderboard settings](<https://www.mee6.xyz/dashboard/${currentGuildId}/leaderboard>)`),
			);
		}
	}

	if (interaction.commandName === "count-messages") {
		let messageId = interaction.options.getString("message");
		const user = interaction.options.getUser("user");
		// Check if the user invoking the command has the 'MANAGE_MESSAGES' permission
		const member = interaction.guild.members.cache.get(interaction.user.id);

		if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
			return interaction.reply(
				"You do not have permission to use this command.",
			);
		} else {
			// Check if the provided argument is a message link
			const messageLinkRegex =
				/^https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)$/;

			const match = messageId.match(messageLinkRegex);
			if (match) {
				// If it's a message link, extract the message ID from the link
				messageId = match[3];
			}

			// Check if the provided message ID is valid
			const targetMessage = await interaction.channel.messages
				.fetch(messageId)
				.catch(() => null);

			if (!targetMessage) {
				return interaction.reply(
					"Invalid message ID or link. Please provide a valid message ID or link.",
				);
			}

			// Fetch messages in the channel after the target message
			const messages = await interaction.channel.messages.fetch({
				limit: 100,
				after: targetMessage.id,
			});

			// Filter messages for the specified user
			const userMessages = messages.filter((msg) => msg.author.id === user.id);

			// Count the number of messages (including the target message)
			const messageCount = userMessages.size + 1;

			// Respond to the interaction
			interaction.reply(
				`Number of messages until ${targetMessage.id} for user ${user.tag}: ${messageCount}`,
			);
		}
	}

	if (interaction.commandName === "meme") {
		try {
			const memeType = interaction.options.getString("type");
			await interaction.deferReply(); // Acknowledge the interaction
			const memeUrl = await fetchRandomMeme(tenor_api, humor_api, memeType);
			await interaction.editReply({
				content: "Here's a meme for you:",
				files: [memeUrl],
			});
		} catch (error) {
			console.error("Error fetching meme:", error);
			await interaction.editReply("Error fetching meme :(");
		}
	}

	if (interaction.commandName === "ai") {
		try {
			const query = interaction.options.getString("query");
			const userId = interaction.user.id;
			const username = interaction.user.username;
			const channelId = interaction.channel.id;

			// Initialize conversation history if not already present
			if (!activeConversations.has(userId)) {
				activeConversations.set(userId, new Map());
			}

			const userConversations = activeConversations.get(userId);
			if (!userConversations.has(channelId)) {
				userConversations.set(channelId, {
					history: [],
					lastMessageId: null,
					lastInteractionTime: Date.now(),
				});
			}

			// Get conversation state
			const conversation = userConversations.get(channelId);

			// Send the conversation history to the API
			const historyText = conversation.history
				.map((entry) => `${entry.role}: ${entry.content}`)
				.join("\n");
			const response = await axios.get(
				`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(query)}&owner=OpenAI&botname=ChatGPT&user=${encodeURIComponent(username)}&history=${encodeURIComponent(historyText)}`,
			);
			const botReply = response.data.response;

			const adviceEmbed = new EmbedBuilder()
				.addFields({
					name: "Write or reply to continue conversation",
					value: "Conversation will timeout after 1 minute of inactivity",
				})
				.addFields({
					name: "Conversation to AI is saved on a local file",
					value: "Write clear history to clear your entry to history file",
				})
				.addFields({ name: "Say bye to end conversation", value: " " });

			let replyMessage;
			if (conversation.lastMessageId) {
				// Edit the last message sent by the bot
				replyMessage = await interaction.channel.messages.fetch(
					conversation.lastMessageId,
				);
				await replyMessage.edit({
					embeds: [adviceEmbed],
					content: botReply,
					allowedMentions: { repliedUser: false },
				});
			} else {
				replyMessage = await interaction.reply({
					embeds: [adviceEmbed],
					content: botReply,
					fetchReply: true,
					allowedMentions: { repliedUser: false },
				});
			}

			// Update the conversation state
			userConversations.set(channelId, {
				history: [
					...conversation.history,
					{ role: "User", content: query },
					{ role: "Bot", content: botReply },
				],
				lastMessageId: replyMessage.id,
				lastInteractionTime: Date.now(),
			});
		} catch (error) {
			console.error("Error fetching chatbot response:", error);
			await interaction.reply(
				"Sorry, I could not process your request at the moment. Please try again later.",
			);
		}
	}
}); //end of interactionCreate of main commands

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	const userId = message.author.id;
	const username = message.author.username;
	const channelId = message.channel.id;

	// Check if the user is in an active AI conversation
	if (activeConversations.has(userId)) {
		const userConversations = activeConversations.get(userId);

		if (userConversations.has(channelId)) {
			const conversation = userConversations.get(channelId);

			// Check if the message is a reply to the bot's last message or within a timeout period
			if (
				(message.reference &&
					message.reference.messageId === conversation.lastMessageId) ||
				Date.now() - conversation.lastInteractionTime < 60000
			) {
				// Check if the message contains the word "bye"
				if (message.content.toLowerCase().includes("bye")) {
					// Clear the conversation state
					userConversations.delete(channelId);

					// Send message indicating conversation end
					const endedConv = new EmbedBuilder().addFields({
						name: "Conversation ended",
						value: "Goodbye!",
					});
					try {
						const replyMessage = await message.channel.messages.fetch(
							conversation.lastMessageId,
						);
						await replyMessage.edit({
							embeds: [endedConv],
							allowedMentions: { repliedUser: false },
						});
					} catch (error) {
						console.error("Error editing last message:", error);
					}
					return;
				}

				try {
					const query = message.content;

					// Update conversation history
					const newHistory = [
						...conversation.history,
						{ role: "User", content: query },
					];

					// Send the conversation history to the API
					const historyText = newHistory
						.map((entry) => `${entry.role}: ${entry.content}`)
						.join("\n");
					const response = await axios.get(
						`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(query)}&owner=OpenAI&botname=ChatGPT&user=${encodeURIComponent(username)}&history=${encodeURIComponent(historyText)}`,
					);
					const botReply = response.data.response;

					let replyMessage;
					if (conversation.lastMessageId) {
						try {
							// Check if the bot has permission to access the channel
							if (
								!message.guild.members.me
									.permissionsIn(message.channel)
									.has(["VIEW_CHANNEL", "SEND_MESSAGES"])
							) {
								console.error(
									"Bot does not have permission to access the channel.",
								);
								return;
							}

							replyMessage = await message.channel.messages.fetch(
								conversation.lastMessageId,
							);
							await replyMessage.edit({
								content: botReply,
								allowedMentions: { repliedUser: false },
							});
						} catch (error) {
							console.error("Error editing last message:", error);
						}
					} else {
						// Check if the bot has permission to send messages in the channel
						if (
							!message.guild.members.me
								.permissionsIn(message.channel)
								.has("SEND_MESSAGES")
						) {
							console.error(
								"Bot does not have permission to send messages in the channel.",
							);
							return;
						}

						replyMessage = await message.reply({
							content: botReply,
							allowedMentions: { repliedUser: false },
						});
					}

					// Update the conversation state
					userConversations.set(channelId, {
						history: [...newHistory, { role: "Bot", content: botReply }],
						lastMessageId: replyMessage.id,
						lastInteractionTime: Date.now(),
						channelId: message.channelId, // Store the channel ID for future checks
					});
				} catch (error) {
					console.error("Error fetching chatbot response:", error);
					await message.reply(
						"Sorry, I could not process your request at the moment. Please try again later.",
					);
				}
			} else {
				// If the message is not part of the AI conversation, clear the conversation state
				userConversations.delete(channelId);

				// Send timeout message by editing the last bot message
				if (conversation.lastMessageId) {
					const timeoutEmbed = new EmbedBuilder()
						.setTitle("Conversation Timeout")
						.setDescription(
							"The conversation has timed out due to inactivity.",
						);
					try {
						const timeoutMessage = await message.channel.messages.fetch(
							conversation.lastMessageId,
						);
						await timeoutMessage.edit({ embeds: [timeoutEmbed] });
					} catch (error) {
						console.error("Error editing last message:", error);
					}
				}
			}
		}
	} else {
		console.log("No active conversation with this user.");
	}
});

async function fetchRandomMeme(tenor_api, humor_api, memeType) {
	try {
		if (!tenor_api) {
			throw new Error("Tenor API key is missing");
		}
		if (!humor_api) {
			throw new Error("Humor API key is missing");
		}

		let latestMemes = [];
		let blacklistedMemes = [];
		try {
			latestMemes = require("./latestMemes.json");
		} catch (error) {
			console.error("Error reading latestMemes.json:", error.message);
		}

		try {
			blacklistedMemes = require("./blacklistedMemes.json");
		} catch (error) {
			console.error("Error reading blacklistedMemes.json:", error.message);
		}

		console.log("Meme type received:", memeType); // Debugging line

		let selectedMeme;

		if (memeType === "gif") {
			selectedMeme = await fetchGifMeme(
				tenor_api,
				latestMemes,
				blacklistedMemes,
			);
		} else if (memeType === "picture") {
			selectedMeme = await fetchPictureMeme(
				humor_api,
				latestMemes,
				blacklistedMemes,
			);
		} else {
			throw new Error(
				'Invalid meme type. Please specify either "gif" or "picture".',
			);
		}

		return selectedMeme;
	} catch (error) {
		console.error("Error in fetchRandomMeme:", error.message);
		throw new Error("Failed to fetch meme");
	}
}

async function fetchGifMeme(tenor_api, latestMemes, blacklistedMemes) {
	try {
		const queryStrings = ["meme", "dank meme", "cat meme", "dog meme"];
		const randomQueryString =
			queryStrings[Math.floor(Math.random() * queryStrings.length)];

		const searchUrl = `https://tenor.googleapis.com/v2/search?q=${randomQueryString}&key=${tenor_api}&random=true&limit=1`;
		console.log("Fetching GIF meme from URL:", searchUrl);

		const response = await axios.get(searchUrl);
		const responseData = response.data;

		if (!responseData.results || responseData.results.length === 0) {
			throw new Error("No GIF memes found");
		}

		// Randomly select a meme from the search results
		const randomIndex = Math.floor(Math.random() * responseData.results.length);
		const selectedMeme = responseData.results[randomIndex];

		// Check if the meme URL is blacklisted
		const memeUrl = selectedMeme.media_formats.gif.url;
		if (blacklistedMemes.includes(memeUrl)) {
			console.log("GIF meme is blacklisted. Fetching another meme.");
			return fetchGifMeme(tenor_api, latestMemes, blacklistedMemes);
		}

		// Check if the meme URL already exists in latestMemes
		const isUnique = !latestMemes.some((meme) => meme.memeUrl === memeUrl);
		if (!isUnique) {
			console.log("GIF meme already exists. Fetching another meme.");
			return fetchGifMeme(tenor_api, latestMemes, blacklistedMemes);
		}

		// Generate a unique ID
		let newId;
		if (latestMemes.length === 0) {
			newId = 1;
		} else {
			const lastId = latestMemes[latestMemes.length - 1].id;
			newId = lastId === 20 ? 1 : lastId + 1;
		}

		// Add the new meme with ID to the data
		latestMemes.push({
			id: newId,
			memeUrl: memeUrl,
		});

		// Ensure the array does not exceed the limit of 20 memes
		if (latestMemes.length > 20) {
			latestMemes.shift(); // Remove the oldest meme
		}

		// Save the updated data back to latestMemes.json
		fs.writeFileSync(
			"./latestMemes.json",
			JSON.stringify(latestMemes, null, 2),
		);

		return selectedMeme.media_formats.gif.url;
	} catch (error) {
		console.error("Error fetching GIF meme:", error.message);
		throw new Error("Failed to fetch GIF meme");
	}
}

async function fetchPictureMeme(humor_api, latestMemes, blacklistedMemes) {
	try {
		const queryStrings = ["meme", "dank meme", "cat meme", "dog meme"];
		const randomQueryString =
			queryStrings[Math.floor(Math.random() * queryStrings.length)];
		const encodedQueryString = encodeURIComponent(randomQueryString);

		const searchUrl = `https://api.humorapi.com/memes/random?api-key=${humor_api}&keywords=${encodedQueryString}&media-type=image`;
		console.log("Fetching picture meme from URL:", searchUrl);

		const response = await axios.get(searchUrl);
		const responseData = response.data;

		if (!responseData || !responseData.url || !responseData.type) {
			throw new Error("Failed to fetch picture memes");
		}

		const memeUrl = responseData.url;

		// Check if the meme URL is blacklisted
		if (blacklistedMemes.includes(memeUrl)) {
			console.log("Picture meme is blacklisted. Fetching another meme.");
			return fetchPictureMeme(humor_api, latestMemes, blacklistedMemes);
		}

		// Check if the meme URL already exists in latestMemes
		const isUnique = !latestMemes.some((meme) => meme.memeUrl === memeUrl);
		if (!isUnique) {
			console.log("Picture meme already exists. Fetching another meme.");
			return fetchPictureMeme(humor_api, latestMemes, blacklistedMemes);
		}

		// Generate a unique ID
		let newId;
		if (latestMemes.length === 0) {
			newId = 1;
		} else {
			const lastId = latestMemes[latestMemes.length - 1].id;
			newId = lastId === 20 ? 1 : lastId + 1;
		}

		// Add the new meme with ID to the data
		latestMemes.push({
			id: newId,
			memeUrl: memeUrl,
		});

		// Ensure the array does not exceed the limit of 20 memes
		if (latestMemes.length > 20) {
			latestMemes.shift(); // Remove the oldest meme
		}

		// Save the updated data back to latestMemes.json
		fs.writeFileSync(
			"./latestMemes.json",
			JSON.stringify(latestMemes, null, 2),
		);

		return memeUrl;
	} catch (error) {
		console.error("Error fetching picture meme:", error.message);
		throw new Error("Failed to fetch picture meme");
	}
}

function formatLeaderboard(leaderboard) {
	return leaderboard
		.map(
			(member) =>
				`${member.username} - Level ${member.level} with ${formatXPValue(member.xp.totalXp)} EXP`,
		)
		.join("\n");
}

function formatXPValue(value) {
	if (value >= 1000) {
		const suffixes = ["", "k", "M"]; // Add more suffixes as needed for larger values
		const suffixNum = Math.floor(("" + value).length / 3);
		let shortValue = parseFloat(
			(suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
				3,
			),
		);

		// Ensure one decimal place if value is 100k or greater
		if (shortValue >= 100) {
			shortValue = Number((shortValue * 10) / 10).toFixed(1); // Round to one decimal place
		}

		// Check if the value is in the range of 0.1M - 0.9M and convert it to k
		if (suffixNum === 2 && shortValue >= 0.1 && shortValue < 1) {
			shortValue *= 1000;
			return shortValue + "k";
		}

		// Check if the value is in the range of 0.1M - 0.9M and convert it to M
		if (suffixNum >= 2) {
			return shortValue + suffixes[suffixNum];
		}

		// Remove decimal if it's .0
		return shortValue % 1 === 0
			? shortValue + suffixes[suffixNum]
			: shortValue.toFixed(1) + suffixes[suffixNum];
	}
	return value;
}

	//reminder functions
	const reminders = new Map();

	function setReminder(time, message, userId) {
		const reminderTime = new Date(time);
		const currentTime = new Date();

	if (reminderTime <= currentTime) {
		return "Invalid reminder time. Please provide a future time.";
	}

		const timeDifference = reminderTime.getTime() - currentTime.getTime();

		const reminder = setTimeout(() => {
			const user = client.users.cache.get(userId);
			user.send(`⏰ Reminder: ${message}`);
			reminders.delete(userId);
		}, timeDifference);

	reminders.set(userId, reminder);
	return "Reminder set successfully!";
}

function clearReminder(userId) {
	if (reminders.has(userId)) {
		clearTimeout(reminders.get(userId));
		reminders.delete(userId);
		return "Reminder cleared successfully!";
	}
	return "You have no active reminders.";
}

// Command interaction for houses commands
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	// Replace this with the actual role ID
	const member = interaction.member;

	// add-points command
	if (interaction.commandName === "add-points") {
		const roleId = "1029774233544437820";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const teamName = interaction.options.getString("team");
			const points = interaction.options.getNumber("points");

				const result = addPointsToTeam(teamName, points);
				await interaction.reply(result);
			}
		}

	// show-team-points command
	if (interaction.commandName === "show-team-points") {
		const teamPoints = calculateTeamPoints();
		await interaction.reply(`${teamPoints}`);
	}

	// leaderboard command
	if (interaction.commandName === "leaderboard") {
		const calculateTeamPoints = () => {
			let result = teamsJSON.map((team) => ({
				team: team.team,
				totalPoints: team.points.reduce((acc, curr) => acc + curr, 0),
			}));

				result.sort((a, b) => b.totalPoints - a.totalPoints);

				return result;
			};

			const leaderboardData = calculateTeamPoints();

		const embed = new EmbedBuilder()
			.setTitle("__Leaderboard of houses :__")
			.addFields({
				name: `🥇 1st : ${leaderboardData[0].team}`,
				value: `${leaderboardData[0].totalPoints} points`,
			})
			.addFields({
				name: `🥈 2nd : ${leaderboardData[1].team}`,
				value: `${leaderboardData[1].totalPoints} points`,
			})
			.addFields({
				name: `🥉 3rd : ${leaderboardData[2].team}`,
				value: `${leaderboardData[2].totalPoints} points`,
			})
			.addFields({
				name: `<:skull_crying:1222574569429405698> 4th : ${leaderboardData[3].team}`,
				value: `${leaderboardData[3].totalPoints} points`,
			})
			.setColor([52, 152, 219]); // Set color (Poké Catcher blue in this example)

			await interaction.reply({ embeds: [embed] });
		}

	// points-reset command
	if (interaction.commandName === "points-reset") {
		const roleId = "1029774233544437820";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const resetTeamPoints = () => {
				// Iterate through teamsJSON and reset points for each team to empty string
				teamsJSON.forEach((team) => {
					team.points = team.points.map(() => ""); // Set points to empty string for each team
				});
				// Save the updated teamsJSON to the file (teamsPoints.json in this example)
				fs.writeFileSync("teamPoints.json", JSON.stringify(teamsJSON, null, 2));

				return "Points have been reset for all teams.";
			};
		}

			const resetMessage = resetTeamPoints();

		await interaction.reply(resetMessage);
	}
}); //end of interactionCreate for houses points

// show-team-points function
function calculateTeamPoints() {
	let result = "";
	let headerDisplayed = false;
	teamsJSON.forEach((team) => {
		if (!headerDisplayed) {
			result += "__Team Points:__\n";
			headerDisplayed = true;
		}
		if (Array.isArray(team.points)) {
			const totalPoints = team.points.reduce((acc, curr) => acc + curr, 0);
			if (team.points.length === 1) {
				result += `- ${team.team}: ${totalPoints} points\n`;
			} else if (totalPoints > 0) {
				result += `- ${team.team}: ${team.points.join("+")} = ${totalPoints} points\n`;
			} else {
				result += `- ${team.team}: 0 points\n`;
			}
		} else {
			result += `- ${team.team}: ${team.points} points\n`;
		}
	});
	return result;
}

// leaderboard command embed resend
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	if (
		interaction.commandName === "add-points" ||
		interaction.commandName === "points-reset"
	) {
		let lastLeaderboardMessageId = null;
		// Get the channel where the leaderboard embed will be sent (Replace with your channel ID)
		const channel = interaction.guild.channels.cache.get("1167461518284173396");

		// Delete the last leaderboard message if available
		if (lastLeaderboardMessageId) {
			try {
				const lastMessage = await channel.messages.fetch(
					lastLeaderboardMessageId,
				);
				await lastMessage.delete();
			} catch (error) {
				console.error("Error deleting message:", error);
			}
		}

		const calculateTeamPoints = () => {
			let result = teamsJSON.map((team) => ({
				team: team.team,
				totalPoints: team.points.reduce((acc, curr) => acc + curr, 0),
			}));

				result.sort((a, b) => b.totalPoints - a.totalPoints);

				return result;
			};

			const leaderboardData = calculateTeamPoints();

		// For each team in teamsJSON, convert points to numbers (if they are not empty strings)
		teamsJSON.forEach((team) => {
			team.points = team.points.map((point) =>
				point !== "" ? parseFloat(point) : 0,
			);
		});
		// Send a new leaderboard embed message
		const leaderboardEmbed = new EmbedBuilder()
			.setTitle("Leaderboard")
			.addFields({
				name: `🥇 1st : ${leaderboardData[0].team}`,
				value: `${leaderboardData[0].totalPoints} points`,
			})
			.addFields({
				name: `🥈 2nd : ${leaderboardData[1].team}`,
				value: `${leaderboardData[1].totalPoints} points`,
			})
			.addFields({
				name: `🥉 3rd : ${leaderboardData[2].team}`,
				value: `${leaderboardData[2].totalPoints} points`,
			})
			.addFields({
				name: `<:skull_crying:1222574569429405698> 4th : ${leaderboardData[3].team}`,
				value: `${leaderboardData[3].totalPoints} points`,
			})
			.setColor([52, 152, 219]); // Set color (Poké Catcher blue in this example)
		const sentMessage = await channel.send({ embeds: [leaderboardEmbed] });
		lastLeaderboardMessageId = sentMessage.id;
	}
});

// Function to load data from a JSON file for houses points
function loadDataFromFile() {
	try {
		const data = fs.readFileSync("teamPoints.json", "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading file:", err);
		return [];
	}
}

// Function to save data to a JSON file
function saveDataToFile(data) {
	fs.writeFileSync("teamPoints.json", JSON.stringify(data), "utf8");
}

	// Load data when the bot starts
	let teamsJSON = loadDataFromFile();

// Function to add points to a team
function addPointsToTeam(teamName, points) {
	const teamToUpdate = teamsJSON.find((team) => team.team === teamName);
	if (teamToUpdate) {
		teamToUpdate.points.push(points);
		saveDataToFile(teamsJSON); // Save the updated data to the file
		return `Added ${points} points to ${teamName}.`;
	} else {
		return `Team ${teamName} not found.`;
	}
}

// Command interaction for event points commands
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	// Replace this with the actual role ID
	const member = interaction.member;

	// add-points command
	if (interaction.commandName === "add-event-points") {
		const roleId = "1029765248430899210";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const eventUser = interaction.options.getUser("user");
			const points = interaction.options.getNumber("points");

			const eventresult = addPointsToUser(eventUser, points);
			await interaction.reply(eventresult);
		}
	}

	// show-team-points command
	if (interaction.commandName === "show-event-points") {
		const userPoints = calculateEventPoints();
		if (!userPoints || userPoints.length === 0) {
			await interaction.reply(`Event has ended.`);
		} else {
			await interaction.reply(`${userPoints}`);
		}
	}

	// event-leaderboard command
	if (interaction.commandName === "event-leaderboard") {
		const calculateEventPoints = () => {
			let result = usersJSON.map((user) => ({
				user: user.username,
				totalPoints: user.points.reduce((acc, curr) => acc + curr, 0),
				isPatreonUser: user.patreon === true, // Add isPatreonUser property
			}));

				result.sort((c, d) => d.totalPoints - c.totalPoints);

				return result;
			};

			const eventleaderboardData = calculateEventPoints();

		const no_patreonUsers = eventleaderboardData.filter(
			(user) => !user.isPatreonUser,
		);

		const no_patreon_embed = new EmbedBuilder().setTitle(
			"__Leaderboard of event :__",
		);
		// Add custom fields for the first 5 users
		if (no_patreonUsers[0]) {
			no_patreon_embed.addFields({
				name: `🥇 1st : ${no_patreonUsers[0].user}`,
				value: `${no_patreonUsers[0].totalPoints} points`,
			});
		}
		if (no_patreonUsers[1]) {
			no_patreon_embed.addFields({
				name: `🥈 2nd : ${no_patreonUsers[1].user}`,
				value: `${no_patreonUsers[1].totalPoints} points`,
			});
		}
		if (no_patreonUsers[2]) {
			no_patreon_embed.addFields({
				name: `🥉 3rd : ${no_patreonUsers[2].user}`,
				value: `${no_patreonUsers[2].totalPoints} points`,
			});
		}
		if (no_patreonUsers[3]) {
			no_patreon_embed.addFields({
				name: `🎖️ 4th : ${no_patreonUsers[3].user}`,
				value: `${no_patreonUsers[3].totalPoints} points`,
			});
		}
		if (no_patreonUsers[4]) {
			no_patreon_embed.addFields({
				name: `🏅 5th : ${no_patreonUsers[4].user}`,
				value: `${no_patreonUsers[4].totalPoints} points`,
			});
		}
		if (no_patreonUsers[5]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 6th : ${no_patreonUsers[5].user}`,
				value: `${no_patreonUsers[5].totalPoints} points`,
			});
		}
		if (no_patreonUsers[6]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 7th : ${no_patreonUsers[6].user}`,
				value: `${no_patreonUsers[6].totalPoints} points`,
			});
		}
		if (no_patreonUsers[7]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 8th : ${no_patreonUsers[7].user}`,
				value: `${no_patreonUsers[7].totalPoints} points`,
			});
		}
		if (no_patreonUsers[8]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 9th : ${no_patreonUsers[8].user}`,
				value: `${no_patreonUsers[8].totalPoints} points`,
			});
		}
		if (no_patreonUsers[9]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 10th : ${no_patreonUsers[9].user}`,
				value: `${no_patreonUsers[9].totalPoints} points`,
			});
		}
		if (no_patreonUsers[10]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 11st : ${no_patreonUsers[10].user}`,
				value: `${no_patreonUsers[10].totalPoints} points`,
			});
		}
		if (no_patreonUsers[11]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 12nd : ${no_patreonUsers[11].user}`,
				value: `${no_patreonUsers[11].totalPoints} points`,
			});
		}
		if (no_patreonUsers[12]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 13rd : ${no_patreonUsers[12].user}`,
				value: `${no_patreonUsers[12].totalPoints} points`,
			});
		}
		if (no_patreonUsers[13]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 14th : ${no_patreonUsers[13].user}`,
				value: `${no_patreonUsers[13].totalPoints} points`,
			});
		}
		if (no_patreonUsers[14]) {
			no_patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 15th : ${no_patreonUsers[14].user}`,
				value: `${no_patreonUsers[14].totalPoints} points`,
			});
		}

		no_patreon_embed.setColor([52, 152, 219]);

		const patreonUsers = eventleaderboardData.filter(
			(user) => user.isPatreonUser,
		);

		const patreon_embed = new EmbedBuilder().setTitle(
			"__Leaderboard of event\n(Patreon users) :__",
		);

		if (patreonUsers[0]) {
			patreon_embed.addFields({
				name: `🥇 1st : ${patreonUsers[0].user}`,
				value: `${patreonUsers[0].totalPoints} points`,
			});
		}
		if (patreonUsers[1]) {
			patreon_embed.addFields({
				name: `🥈 2nd : ${patreonUsers[1].user}`,
				value: `${patreonUsers[1].totalPoints} points`,
			});
		}
		if (patreonUsers[2]) {
			patreon_embed.addFields({
				name: `🥉 3rd : ${patreonUsers[2].user}`,
				value: `${patreonUsers[2].totalPoints} points`,
			});
		}
		if (patreonUsers[3]) {
			patreon_embed.addFields({
				name: `🎖️ 4th : ${patreonUsers[3].user}`,
				value: `${patreonUsers[3].totalPoints} points`,
			});
		}
		if (patreonUsers[4]) {
			patreon_embed.addFields({
				name: `🏅 5th : ${patreonUsers[4].user}`,
				value: `${patreonUsers[4].totalPoints} points`,
			});
		}
		if (patreonUsers[5]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 6th : ${patreonUsers[5].user}`,
				value: `${patreonUsers[5].totalPoints} points`,
			});
		}
		if (patreonUsers[6]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 7th : ${patreonUsers[6].user}`,
				value: `${patreonUsers[6].totalPoints} points`,
			});
		}
		if (patreonUsers[7]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 8th : ${patreonUsers[7].user}`,
				value: `${patreonUsers[7].totalPoints} points`,
			});
		}
		if (patreonUsers[8]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 9th : ${patreonUsers[8].user}`,
				value: `${patreonUsers[8].totalPoints} points`,
			});
		}
		if (patreonUsers[9]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 10th : ${patreonUsers[9].user}`,
				value: `${patreonUsers[9].totalPoints} points`,
			});
		}
		if (patreonUsers[10]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 11st : ${patreonUsers[10].user}`,
				value: `${patreonUsers[10].totalPoints} points`,
			});
		}
		if (patreonUsers[11]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 12nd : ${patreonUsers[11].user}`,
				value: `${patreonUsers[11].totalPoints} points`,
			});
		}
		if (patreonUsers[12]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 13rd : ${patreonUsers[12].user}`,
				value: `${patreonUsers[12].totalPoints} points`,
			});
		}
		if (patreonUsers[13]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 14th : ${patreonUsers[13].user}`,
				value: `${patreonUsers[13].totalPoints} points`,
			});
		}
		if (patreonUsers[14]) {
			patreon_embed.addFields({
				name: `<:skull_crying:1222574569429405698> 15th : ${patreonUsers[14].user}`,
				value: `${patreonUsers[14].totalPoints} points`,
			});
		}

		patreon_embed.setColor([52, 152, 219]);

		await interaction.reply({ embeds: [no_patreon_embed, patreon_embed] });
	}

	// points-reset command
	if (interaction.commandName === "event-points-reset") {
		const roleId = "1029765248430899210";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const resetUserPoints = () => {
				// Iterate through teamsJSON and reset points for each team to empty string
				usersJSON.forEach((user) => {
					user.points = user.points.map(() => ""); // Set points to empty string for each team
				});
				// Save the updated teamsJSON to the file (teamsPoints.json in this example)
				fs.writeFileSync(
					"eventPoints.json",
					JSON.stringify(usersJSON, null, 2),
				);

				return "Points have been reset for all users.";
			};
		}

		const resetMessage = resetUserPoints();

		await interaction.reply(resetMessage);
	}

	// add-user-event-team command
	if (interaction.commandName === "add-user-event-team") {
		const roleId = "1029765248430899210";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const userToAdd = interaction.options.getUser("user");
			const team = interaction.options.getString("team");

			const result = addUserToTeam(userToAdd, team);
			await interaction.reply(result);
		}
	}

	// add-user-to-event command
	if (interaction.commandName === "add-user-to-event") {
		const roleId = "1096479666103136376";
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply(
				"You do not have the required role to use this command.",
			);
		} else {
			const userToAdd = interaction.options.getUser("user");
			const patreon_user = interaction.options.getBoolean("patreon");

			const result = addUserToEvent(userToAdd, patreon_user);
			await interaction.reply(result);
		}
	}

	// show-event-teams command
	if (interaction.commandName === "show-event-teams") {
		const lightTeamUsers = [];
		const darkTeamUsers = [];

		// Iterate through eventTeams.json data
		try {
			const eventTeams = require("./eventTeams.json");
			eventTeams.forEach((entry) => {
				if (entry.team === "light") {
					lightTeamUsers.push(entry.username);
				} else if (entry.team === "dark") {
					darkTeamUsers.push(entry.username);
				}
			});

			// Construct the embed message
			const eventEmbed = new EmbedBuilder()
				.setTitle("Event Teams")
				.setColor([52, 152, 219]); // Set color (Poké Catcher blue in this example)

			// Add light team users to the embed message
			if (lightTeamUsers.length > 0) {
				eventEmbed.addFields({
					name: `Light team`,
					value: `__Leader : mokona59__\n\n${lightTeamUsers.join("\n")}`,
				});
			}

			// Add dark team users to the embed message
			if (darkTeamUsers.length > 0) {
				eventEmbed.addFields({
					name: `Dark team`,
					value: `__Leader : shadowpult__\n\n${darkTeamUsers.join("\n")}`,
				});
			}

			// Send the embed message
			await interaction.reply({ embeds: [eventEmbed] });
		} catch (error) {
			console.error("Error reading eventTeams.json:", error);
			await interaction.reply("An error occurred while fetching event teams.");
		}
	}
}); //end of interactionCreate for houses points

// Load data when the bot starts
let usersJSON = loadDataFromEventFile();

// Function to load data from a JSON file for houses points
function loadDataFromEventFile() {
	try {
		const data = fs.readFileSync("eventPoints.json", "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading file:", err);
		return [];
	}
}

// Function to save data to a JSON file
function saveDataToEventFile(data) {
	fs.writeFileSync("eventPoints.json", JSON.stringify(data), "utf8");
}

function addPointsToUser(eventUser, points) {
	const userToUpdate = usersJSON.find(
		(user) => user.username === eventUser.username,
	);
	if (userToUpdate) {
		userToUpdate.points.push(points);
		saveDataToEventFile(usersJSON); // Save the updated data to the file
		return `Added ${points} points to ${eventUser.username}.`;
	} else {
		return `User ${eventUser.username} not found.`;
	}
}

// show-team-points & event-leaderboard function
function calculateEventPoints() {
	let eventresult = "";
	let headerDisplayed = false;
	usersJSON.forEach((user) => {
		if (!headerDisplayed) {
			eventresult += "__Users Points:__\n";
			headerDisplayed = true;
		}
		if (Array.isArray(user.points)) {
			const totalPoints = user.points.reduce((acc, curr) => acc + curr, 0);
			if (user.points.length === 1) {
				eventresult += `- ${user.username}: ${totalPoints} points\n`;
			} else if (totalPoints > 0) {
				eventresult += `- ${user.username}: ${user.points.join("+")} = ${totalPoints} points\n`;
			} else {
				eventresult += `- ${user.username}: 0 points\n`;
			}
		} else {
			eventresult += `- ${user.username}: ${user.points} points\n`;
		}
	});
	return eventresult;
}

//add-user-event-team function
function addUserToTeam(username, team) {
	// Read existing data from eventTeams.json
	let eventTeams = [];
	try {
		eventTeams = require("./eventTeams.json");
	} catch (error) {
		console.error("Error reading eventTeams.json:", error);
	}

	// Check if the user already exists in the data
	const existingUser = eventTeams.find((entry) => entry.username === username);
	if (existingUser) {
		return `${username.username} is already assigned to ${existingUser.team}.`;
	}

	// Add the new user to the data
	eventTeams.push({ username: username.username, team: team });

	// Save the updated data back to eventTeams.json
	try {
		fs.writeFileSync("./eventTeams.json", JSON.stringify(eventTeams, null, 2));
		return `${username.username} is now assigned to ${team} team.`;
	} catch (error) {
		console.error("Error writing eventTeams.json:", error);
		return "Error adding user to team.";
	}
}

//add-user-to-event function
function addUserToEvent(username, patreon_user) {
	// Read existing data from eventPoints.json
	let eventPoints = [];
	try {
		eventPoints = require("./eventPoints.json");
	} catch (error) {
		console.error("Error reading eventPoints.json:", error);
	}

	// Check if the user already exists in the data
	const existingUser = eventPoints.find((entry) => entry.username === username);
	if (existingUser) {
		return `${username.username} is already added to event.`;
	}

	// Add the new user to the data
	eventPoints.push({
		username: username.username,
		points: [],
		patreon: patreon_user,
	});

	// Save the updated data back to eventPoints.json
	try {
		fs.writeFileSync(
			"./eventPoints.json",
			JSON.stringify(eventPoints, null, 2),
		);
		return `${username.username} is now added to event.`;
	} catch (error) {
		console.error("Error writing eventPoints.json:", error);
		return "Error adding user to event.";
	}
}

//command use logger
client.on("interactionCreate", async (interaction) => {
	// Check if the interaction is a command
	if (!interaction.isCommand()) return;

	// Get the current date and time
	const currentDate = new Date();

	// Format the date as dd/mm/yyyy HH:mm:ss
	const dateFormatOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};
	const dateFormat = currentDate.toLocaleString("en-GB", dateFormatOptions);

	// Calculate the latency of the command execution
	const timeStamp = Date.now();

	// Log the command used by the user along with additional information
	console.log(
		`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`,
	);
});

// Error handler
client.on("error", async (error) => {
	console.error("Discord client error:", error);

	// Send an error message to the user if available
	if (error.interaction) {
		await error.interaction.reply({
			content: "An error occurred while processing your command.",
			ephemeral: true,
		});
	}
});

process.on("unhandledRejection", async (error) => {
	console.error("Unhandled promise rejection:", error);

	// Send an error message to the user if available
	if (error.interaction) {
		await error.interaction.reply({
			content: "An error occurred while processing your command.",
			ephemeral: true,
		});
	}
});

process.on("uncaughtException", async (err) => {
	const errorMessage = `Uncaught Exception: ${err.message}\nStack: ${err.stack}`;
	console.error(errorMessage);

	// Send an error message to the user if available
	if (err.interaction) {
		await err.interaction.reply({
			content: "An error occurred while processing your command.",
			ephemeral: true,
		});
	}

	const owner = "602431280113778690"; // Replace with your user ID
	const guild = client.guilds.cache.get("1029760958698102934"); // Replace with your guild ID
	if (guild) {
		const ownerUser = guild.members.cache.get(owner);
		if (ownerUser) {
			await ownerUser.send(
				`An uncaught exception occurred:\n\`\`\`${errorMessage}\`\`\``,
			);
		}
	}

	// Log errors to a file
	fs.appendFile("errorLog.txt", errorMessage + "\n\n", (appendErr) => {
		if (appendErr) {
			console.error("Error writing to log file:", appendErr);
		}
		process.exit(1); // Optionally exit the process after logging the error
	});
});

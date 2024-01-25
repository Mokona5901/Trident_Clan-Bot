const { Client, Events, GatewayIntentBits, ActivityType, MessageSelectMenu, StringSelectMenuOptionBuilder, PermissionsBitField } = require('discord.js');
//const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder } = require('@discordjs/builders');
const { token } = require('./private/config.json');
const http = require('http');
const fs = require('fs');
const { createReadStream } = require('fs');
const ytdl = require('ytdl-core');
const contestants = "0";
const tournament_timestamp = "<t:1696939200:F>";
const status = "when clan will revive";
const Mee6LevelsApi = require("mee6-levels-api");
const SWMG_guildId = "1029760958698102934";
const express = require('express');
const app = express();
const { joinVoiceChannel } = require('@discordjs/voice');
const { Player, QueryType } = require('discord-player');
const { YouTubeExtractor, BridgeProvider, BridgeSource } = require('@discord-player/extractor');
const statusFile = 'badges.json';

// Create a new client instance
const client = new Client(
	{
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
	}
);

client.player = new Player(client, {
		ytdlOptions: {
				quality: "highestaudio",
				highWaterMark: 1 << 25
		}
})

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels`);
});
//client.user.setStatus('dnd');
//client.user.setActivity('you', { type: "WATCHING" });
/*client.user.setActivity(`${contestants} contestants`, {
	type: ActivityType.Watching,
	});*/
client.on('ready', () => {
	client.user.setActivity(status, { type: ActivityType.Watching, });
});

// Log in to Discord with your client's token
client.login(token);

/*languages = [id, da, de, en-GB, en-US, es-ES, fr, hr, it, lt, hu, nl, no, pl, pt-BR, ro, fi, sv-SE, vi, tr, cs, el, bg, ru, uk, hi, th, zh-CN, ja, zh-TW, ko];

	// Function to detect the user's language based on user.locale
	function detectUserLanguage(user)
		{
			const userLocale = user.locale;
			for(let i = 0; i < languages.length; i++)
				{
					if(userLocale.includes(languages[i]))
						{
							return languages[i];
						}
					else
						{
							return "en-US";
						}
				}
		}

	client.on('message', (message) =>
		{
		// Detect the user's language
		const userLanguage = detectUserLanguage(client.user);
		if (message.guild)
			{
				const member = message.guild.members.cache.get(message.author.id);
				userLocale = member ? member.user.locale : 'en-US';
			}
		
		// Define status messages for each language
		let status = ' ';

		switch (userLanguage)
			{
			case 'id':
				return status = "online";
			case 'da':
				return status = "online";
			case 'de':
				return status = "online";
			case 'en-GB':
				return status = "online";
			case 'en-US':
				return status = "online";
			case 'es-ES':
				return status = "en línea";
			case 'fr':
				return status = "en ligne";
			case 'hr':
				return status = "online";
			case 'it':
				return status = "online";
			case 'lt':
				return status = "prisijungęs";
			case 'hu':
				return status = "online";
			case 'nl':
				return status = "online";
			case 'no':
				return status = "online";
			case 'pl':
				return status = "online";
			case 'pt-BR':
				return status = "online";
			case 'ro':
				return status = "online";
			case 'fi':
				return status = "online";
			case 'sv-SE':
				return status = "online";
			case 'vi':
				return status = "trực tuyến";
			case 'tr':
				return status = "çevrimiçi";
			case 'cs':
				return status = "online";
			case 'el':
				return status = "σε απευθείας σύνδεση";
			case 'bg':
				return status = "на линия";
			case 'ru':
				return status = "онлайн";
			case 'uk':
				return status = "онлайн";
			case 'hi':
				return status = "ऑनलाइन";
			case 'th':
				return status = "ออนไลน์";
			case 'zh-CN':
				return status = "在线";
			case 'ja':
				return status = "オンライン";
			case 'zh-TW':
				return status = "線上";
			case 'ko':
				return status = "온라인";
			default:
				return status = "online"; // Default to English
			};
		
			console.log("userLocale : " + userLocale + " userLanguage : " + userLanguage + "status :" + status);
		
		client.user.setActivity(status, {
			type: ActivityType.Watching,
		})};*/

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
app.get('/health', (req, res) => {
	// Implement your logic to determine health status
	//const isOnline;/* Your logic to determine if the app is online */

	// Update the JSON file with the current status
	updateStatusFile(isOnline);

	// Return the current status as a response
	res.json({ status: isOnline ? 'online' : 'offline' });
});

// Function to update the status JSON file
function updateStatusFile(isOnline) {
	const statusData = [
		{
			status: isOnline ? 'online' : 'offline',
			URL: isOnline
				? 'https://img.shields.io/badge/status-online-green.svg?logo=data:image/png;base64,verylongbase64url'
				: 'https://img.shields.io/badge/status-offline-red.svg?logo=data:image/png;base64,verylongbase64url',
		},
	];

	// Write the updated status to the JSON file
	fs.writeFileSync(statusFile, JSON.stringify(statusData, null, 2));
}

// Start the server
//app.listen(port, () => {
//	console.log(`Server is running on port ${port}`);
//});


client.on('message', message => {
	if (message.mentions.has(client.user)) {
		message.channel.send('Hey there!');
	}
});

//ping command
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		timeStamp = Date.now();
		await interaction.reply(`Pong! Command's latency is ${timeStamp - interaction.createdTimestamp} ms 🏓`);
		var dateFormat = new Date(timeStamp);
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	if (interaction.commandName === 'server') {
		if (interaction.guild.memberCount.toString().includes('69')) {
			await interaction.reply(`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount} members. Lmao 69 <a:pepe_kek_explode:1179057815042662440>`)
		}
		else {
			await interaction.reply(`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		}
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	// user command
	if (interaction.commandName === 'user') {
		const user = interaction.options.getUser('user');
		await interaction.reply(`${user.username} joined on ${interaction.member.joinedAt}.`);
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	// rob-balls command
	if (interaction.commandName === 'rob-balls') {
		const user = interaction.options.getUser('user');
		await interaction.reply(`Stolen ${user.username} balls <:troll_blur:1130497483382988890>`);
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	if (interaction.commandName === 'tournament') {
		//const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
		const serverOwnerId = interaction.guild.ownerId;
		if (serverOwnerId === interaction.member.user.id) {
			const ping = "<@&1111273420395655278>\n";
			const title = "## 🔱 members Poké Catcher Tournament #8 :\n";
			const description = "Hello members, today I announce you a new tournament, to revive dead server, it is a Anything Goes tournament !\n"
			const startTime = "Tournament will take place the <t:1696939200:F>\n \n";
			const rules = "__TOURNAMENT RULES__\n > You can use any Pokémon\n > You can't use the same Pokémon twice\n";
			const prizes = "__PRIZES__\n > 1st Good IV Legendary + 100k\n > 2nd Mid IV Legendary +50k\n \n";
			const DM = "Don't forget to submit team by DM";
			const userId = interaction.user.id;
			const user = client.users.cache.get(userId);
			user.send(ping + title + description + startTime + rules + prizes + DM);
			await interaction.reply('Message sent');
		}
		else {
			await interaction.reply('You do not have permission to use this command!');
		}
		timeStamp = Date.now();
		var dateFormat = new Date(timeStamp);
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	// news command
	if (interaction.commandName === 'news') {
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
			.addFields(
				{ name: 'No current tournament', value: ' ' }) //use .setColor([a,b,c]) after .addFields
			.setColor([52, 152, 219]) //Poké Catcher blue
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
		console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	}

	// reminder command
	if (interaction.commandName === 'reminder') {
		const time = interaction.options.getString('time');
		const message = interaction.options.getString('message');
		const userId = interaction.user.id;

		if (time && message) {
			const response = setReminder(time, message, userId);
			await interaction.reply(response);
		} else {
			await interaction.reply('Invalid command usage. Please provide both time and message. Syntax : <today or tomorrow> <hour + AM/PM>. French timezone');
		}
	};
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

  if (interaction.commandName === 'play') {
			if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

					// Create a play queue for the server
			const queue = await client.player.queues.create(interaction.guild)

					// Wait until you are connected to the channel
			if (!queue.connection) await queue.connect(interaction.member.voice.channel)

			let embed = new EmbedBuilder()

			if (interaction.options.getSubcommand() === "song") {
							let url = interaction.options.getString("url")

							// Search for the song using the discord-player
							const result = await client.player.search(url, {
									requestedBy: interaction.user,
									searchEngine: QueryType.YOUTUBE_VIDEO
							})

							// finish if no tracks were found
							if (result.tracks.length === 0)
									return interaction.reply("No results")

							// Add the track to the queue
							const song = result.tracks[0]
							await queue.addTrack(song)
							embed
									.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
									.setThumbnail(song.thumbnail)
									.setFooter({ text: `Duration: ${song.duration}`})

			}
					else if (interaction.options.getSubcommand() === "playlist") {

							// Search for the playlist using the discord-player
							let url = interaction.options.getString("url")
							const result = await client.player.search(url, {
									requestedBy: interaction.user,
									searchEngine: QueryType.YOUTUBE_PLAYLIST
							})

							if (result.tracks.length === 0)
									return interaction.reply(`No playlists found with ${url}`)

							// Add the tracks to the queue
							const playlist = result.playlist
							await queue.addTracks(result.tracks)
							embed
									.setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
									.setThumbnail(playlist.thumbnail)

			} 
					else if (interaction.options.getSubcommand() === "search") {

							// Search for the song using the discord-player
							let url = interaction.options.getString("searchterms")
							const result = await client.player.search(url, {
									requestedBy: interaction.user,
									searchEngine: QueryType.AUTO
							})

							// finish if no tracks were found
							if (result.tracks.length === 0)
									return interaction.editReply("No results")

							// Add the track to the queue
							const song = result.tracks[0]
							await queue.addTrack(song)
							embed
									.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
									.setThumbnail(song.thumbnail)
									.setFooter({ text: `Duration: ${song.duration}`})
			}

					// Play the song
					if (!queue.playing) await queue.play()

					// Respond with the embed containing information about the player
					await interaction.reply({
							embeds: [embed]
					});
					await player.extractors.loadDefault()
		}

	
// level command
	if (interaction.commandName === 'level') {

			const selectedOption = interaction.options.getString('range'); // Assuming 'level_range' is the name of the option

			let leaderboard;
			let message = '';
			let previous;
			let next;

			switch (selectedOption) {
					case '0_10':
							leaderboard = (await Mee6LevelsApi.getLeaderboard(SWMG_guildId)).filter(member => member.level >= 0 && member.level <= 10);
							//message = `__Leaderboard of level 0-10 :__ \n\n${leaderboard.map(member => `${member.username} - Level ${member.level}`).join('\n')}`;
							message = `This part isn't ready, try other level ranges please`;
							/*previous = new ButtonBuilder({
							custom_id: 'a cool button',
							label: 'Previous',
						});*/
							break;
					case '11_20':
							leaderboard = (await Mee6LevelsApi.getLeaderboard(SWMG_guildId)).filter(member => member.level > 10 && member.level <= 20);
							message = `__Leaderboard of level 11-20 :__ \n\n${leaderboard.map(member => `${member.username} - Level ${member.level} with ${formatXPValue(member. xp.totalXp)} EXP`).join('\n')}`;
							break;
					case '21_30':
							leaderboard = (await Mee6LevelsApi.getLeaderboard(SWMG_guildId)).filter(member => member.level > 20 && member.level <= 30);
							message = `__Leaderboard of level 21-30 :__ \n\n${leaderboard.map(member => `${member.username} - Level ${member.level} with ${formatXPValue(member. xp.totalXp)} EXP`).join('\n')}`;
							break;
					case '30+':
							leaderboard = (await Mee6LevelsApi.getLeaderboard(SWMG_guildId)).filter(member => member.level > 30);
							message = `__Leaderboard of level 30+ :__ \n\n${leaderboard.map(member => `${member.username} - Level ${member.level} with ${formatXPValue(member. xp.totalXp)} EXP`).join('\n')}`;
							break;
					default:
							message = 'Invalid option selected.';
							break;
			}

			interaction.reply(message);
	}

	if (interaction.commandName === 'count-messages') {
	
		let messageId = interaction.options.getString('message');
		const user = interaction.options.getUser('user');
			// Check if the user invoking the command has the 'MANAGE_MESSAGES' permission
			const member = interaction.guild.members.cache.get(interaction.user.id);

			if (!member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
				return interaction.reply('You do not have permission to use this command.');
			}
      else {
			// Rest of your existing command logic goes here...
		// Check if the provided argument is a message link
		const messageLinkRegex = /^https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)$/;

		const match = messageId.match(messageLinkRegex);
		if (match) {
			// If it's a message link, extract the message ID from the link
			messageId = match[3];
		}

		// Check if the provided message ID is valid
		const targetMessage = await interaction.channel.messages.fetch(messageId).catch(() => null);

		if (!targetMessage) {
			return interaction.reply('Invalid message ID or link. Please provide a valid message ID or link.');dis
		}

		// Fetch messages in the channel after the target message
		const messages = await interaction.channel.messages.fetch({ limit: 100, after: targetMessage.id });

		// Filter messages for the specified user
		const userMessages = messages.filter(msg => msg.author.id === user.id);

		// Count the number of messages (including the target message)
		const messageCount = userMessages.size + 1;

		// Respond to the interaction
		interaction.reply(`Number of messages until ${targetMessage.id} for user ${user.tag}: ${messageCount}`);
					}
	}
	
}); //end of interactionCreate of main commands

function formatXPValue(value) {
		if (value >= 1000) {
				const suffixes = ['', 'k', 'M']; // Add more suffixes as needed for larger values
				const suffixNum = Math.floor(('' + value).length / 3);
				let shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(3));
				if (shortValue % 1 !== 0) {
						shortValue = shortValue.toFixed(1);
				}

				// Check if the value is in the range of 0.1M - 0.9M and convert it to k
				if (suffixNum === 2 && shortValue >= 0.1 && shortValue < 1) {
						shortValue *= 1000;
						return shortValue + 'k';
				}

				return shortValue + suffixes[suffixNum];
		}
		return value;
}

//reminder functions
const reminders = new Map();

function setReminder(time, message, userId) {
	const reminderTime = new Date(time);
	const currentTime = new Date();

	if (reminderTime <= currentTime) {
		return 'Invalid reminder time. Please provide a future time.';
	}

	const timeDifference = reminderTime.getTime() - currentTime.getTime();

	const reminder = setTimeout(() => {
		const user = client.users.cache.get(userId);
		user.send(`⏰ Reminder: ${message}`);
		reminders.delete(userId);
	}, timeDifference);

	reminders.set(userId, reminder);
	return 'Reminder set successfully!';
}

function clearReminder(userId) {
	if (reminders.has(userId)) {
		clearTimeout(reminders.get(userId));
		reminders.delete(userId);
		return 'Reminder cleared successfully!';
	}
	return 'You have no active reminders.';
}

// Command interaction for houses commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Replace this with the actual role ID
	const member = interaction.member;

	if (SWMG_guildId !== '1029760958698102934') {
		return interaction.reply('Sorry, this functionality is restricted to a specific server.');
	}

	// add-points command
	if (interaction.commandName === 'add-points') {
		const roleId = '1029774233544437820';
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply('You do not have the required role to use this command.');
		}
		else {
			const teamName = interaction.options.getString('team');
			const points = interaction.options.getNumber('points');

			const result = addPointsToTeam(teamName, points);
			await interaction.reply(result);
		}
	}

	// show-team-points command
	if (interaction.commandName === 'show-team-points') {
		const teamPoints = calculateTeamPoints();
		await interaction.reply(`${teamPoints}`);
	}

	// leaderboard command
	if (interaction.commandName === 'leaderboard') {
		const calculateTeamPoints = () => {
			let result = teamsJSON.map(team => ({
				team: team.team,
				totalPoints: team.points.reduce((acc, curr) => acc + curr, 0)
			}));

			result.sort((a, b) => b.totalPoints - a.totalPoints);

			return result;
		};

		const leaderboardData = calculateTeamPoints();

		const embed = new EmbedBuilder()
			.setTitle('__Leaderboard of houses :__')
			.addFields({ name: `🥇 1st : ${leaderboardData[0].team}`, value: `${leaderboardData[0].totalPoints} points` })
			.addFields({ name: `🥈 2nd : ${leaderboardData[1].team}`, value: `${leaderboardData[1].totalPoints} points` })
			.addFields({ name: `🥉 3rd : ${leaderboardData[2].team}`, value: `${leaderboardData[2].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 4th : ${leaderboardData[3].team}`, value: `${leaderboardData[3].totalPoints} points` })
			.setColor([52, 152, 219]) // Set color (Poké Catcher blue in this example)

		await interaction.reply({ embeds: [embed] });
	}

	// points-reset command
	if (interaction.commandName === 'points-reset') {
		const roleId = '1029774233544437820';
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply('You do not have the required role to use this command.');
		}
		else {
		const resetTeamPoints = () => {
			// Iterate through teamsJSON and reset points for each team to empty string
			teamsJSON.forEach(team => {
				team.points = team.points.map(() => ''); // Set points to empty string for each team
			});
			// Save the updated teamsJSON to the file (teamsPoints.json in this example)
			fs.writeFileSync('teamPoints.json', JSON.stringify(teamsJSON, null, 2));

			return 'Points have been reset for all teams.';
		}
		};

		const resetMessage = resetTeamPoints();

		await interaction.reply(resetMessage);
	}

}); //end of interactionCreate for houses points

// show-team-points function
function calculateTeamPoints() {
	let result = '';
	let headerDisplayed = false;
	teamsJSON.forEach(team => {
		if (!headerDisplayed) {
			result += '__Team Points:__\n';
			headerDisplayed = true;
		}
		if (Array.isArray(team.points)) {
			const totalPoints = team.points.reduce((acc, curr) => acc + curr, 0);
			if (team.points.length === 1) {
				result += `- ${team.team}: ${totalPoints} points\n`;
			} else if (totalPoints > 0) {
				result += `- ${team.team}: ${team.points.join('+')} = ${totalPoints} points\n`;
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
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'add-points' || interaction.commandName === 'points-reset') {

		let lastLeaderboardMessageId = null;
		// Get the channel where the leaderboard embed will be sent (Replace with your channel ID)
		const channel = interaction.guild.channels.cache.get('1167461518284173396');

		// Delete the last leaderboard message if available
		if (lastLeaderboardMessageId) {
			try {
				const lastMessage = await channel.messages.fetch(lastLeaderboardMessageId);
				await lastMessage.delete();
			} catch (error) {
				console.error('Error deleting message:', error);
			}
		}

		const calculateTeamPoints = () => {
			let result = teamsJSON.map(team => ({
				team: team.team,
				totalPoints: team.points.reduce((acc, curr) => acc + curr, 0)
			}));

			result.sort((a, b) => b.totalPoints - a.totalPoints);

			return result;
		};

		const leaderboardData = calculateTeamPoints();

		// For each team in teamsJSON, convert points to numbers (if they are not empty strings)
		teamsJSON.forEach(team => {
			team.points = team.points.map(point => (point !== "" ? parseFloat(point) : 0));
		});
		// Send a new leaderboard embed message
		const leaderboardEmbed = new EmbedBuilder()
			.setTitle('Leaderboard')
			.addFields({ name: `🥇 1st : ${leaderboardData[0].team}`, value: `${leaderboardData[0].totalPoints} points` })
			.addFields({ name: `🥈 2nd : ${leaderboardData[1].team}`, value: `${leaderboardData[1].totalPoints} points` })
			.addFields({ name: `🥉 3rd : ${leaderboardData[2].team}`, value: `${leaderboardData[2].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 4th : ${leaderboardData[3].team}`, value: `${leaderboardData[3].totalPoints} points` })
			.setColor([52, 152, 219]) // Set color (Poké Catcher blue in this example)
		const sentMessage = await channel.send({ embeds: [leaderboardEmbed] });
		lastLeaderboardMessageId = sentMessage.id;
	}
});

// Function to load data from a JSON file for houses points
function loadDataFromFile() {
	try {
		const data = fs.readFileSync('teamPoints.json', 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading file:", err);
		return [];
	}
}

// Function to save data to a JSON file
function saveDataToFile(data) {
	fs.writeFileSync('teamPoints.json', JSON.stringify(data), 'utf8');
}

// Load data when the bot starts
let teamsJSON = loadDataFromFile();

// Function to add points to a team
function addPointsToTeam(teamName, points) {
	const teamToUpdate = teamsJSON.find(team => team.team === teamName);
	if (teamToUpdate) {
		teamToUpdate.points.push(points);
		saveDataToFile(teamsJSON); // Save the updated data to the file
		return `Added ${points} points to ${teamName}.`;
	} else {
		return `Team ${teamName} not found.`;
	}
}




// Command interaction for event points commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Replace this with the actual role ID
	const member = interaction.member;

	if (SWMG_guildId !== '1029760958698102934') {
		return interaction.reply('Sorry, this functionality is restricted to a specific server.');
	}

	// add-points command
	if (interaction.commandName === 'add-event-points') {
		const roleId = '1029765248430899210';
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply('You do not have the required role to use this command.');
		}
		else {
			const eventuser = interaction.options.getString('user');
			const points = interaction.options.getNumber('points');

			const eventresult = addPointsToUser(eventuser, points);
			await interaction.reply(eventresult);
		}
	}

	// show-team-points command
	if (interaction.commandName === 'show-event-points') {
		const userPoints = calculateEventPoints();
		if (!userPoints || userPoints.length === 0) {
		await interaction.reply(`Event has ended.`);
		}
		else {
		await interaction.reply(`${userPoints}`);
		}
	}

	// leaderboard command
	if (interaction.commandName === 'event-leaderboard') {
		const calculateEventPoints = () => {
			let result = usersJSON.map(user => ({
				user: user.user,
				totalPoints: user.points.reduce((acc, curr) => acc + curr, 0)
			}));

			result.sort((c, d) => d.totalPoints - c.totalPoints);

			return result;
		};

		const eventleaderboardData = calculateEventPoints();

		if (!eventleaderboardData || eventleaderboardData.length === 0) {
			return interaction.reply(`Event has ended.`);
		}
		else {
		const eventembed = new EmbedBuilder()
			.setTitle('__Leaderboard of event :__')
			.addFields({ name: `🥇 1st : ${eventleaderboardData[0].user}`, value: `${eventleaderboardData[0].totalPoints} points` })
			.addFields({ name: `🥈 2nd : ${eventleaderboardData[1].user}`, value: `${eventleaderboardData[1].totalPoints} points` })
			.addFields({ name: `🥉 3rd : ${eventleaderboardData[2].user}`, value: `${eventleaderboardData[2].totalPoints} points` })
			.addFields({ name: `🎖️ 4th : ${eventleaderboardData[3].user}`, value: `${eventleaderboardData[3].totalPoints} points` })
			.addFields({ name: `🏅 5th : ${eventleaderboardData[4].user}`, value: `${eventleaderboardData[4].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 6th : ${eventleaderboardData[5].user}`, value: `${eventleaderboardData[5].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 7th : ${eventleaderboardData[6].user}`, value: `${eventleaderboardData[6].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 8th : ${eventleaderboardData[7].user}`, value: `${eventleaderboardData[7].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 9th : ${eventleaderboardData[8].user}`, value: `${eventleaderboardData[8].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 10th : ${eventleaderboardData[9].user}`, value: `${eventleaderboardData[9].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 11st : ${eventleaderboardData[10].user}`, value: `${eventleaderboardData[10].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 12nd : ${eventleaderboardData[11].user}`, value: `${eventleaderboardData[11].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 13rd : ${eventleaderboardData[12].user}`, value: `${eventleaderboardData[12].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 14th : ${eventleaderboardData[13].user}`, value: `${eventleaderboardData[13].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 15th : ${eventleaderboardData[14].user}`, value: `${eventleaderboardData[14].totalPoints} points` })
			.addFields({ name: `<:skull_crying:1179499973906272259> 16th : ${eventleaderboardData[15].user}`, value: `${eventleaderboardData[15].totalPoints} points` })
			.setColor([52, 152, 219]) // Set color (Poké Catcher blue in this example)

		await interaction.reply({ embeds: [eventembed] });
		}
	}

	// points-reset command
	if (interaction.commandName === 'event-points-reset') {
		const roleId = '1029765248430899210';
		if (!member.roles.cache.has(roleId)) {
			return interaction.reply('You do not have the required role to use this command.');
		}
		else
		{
		const resetUserPoints = () => {
			// Iterate through teamsJSON and reset points for each team to empty string
			usersJSON.forEach(user => {
				user.points = user.points.map(() => ''); // Set points to empty string for each team
			});
			// Save the updated teamsJSON to the file (teamsPoints.json in this example)
			fs.writeFileSync('eventPoints.json', JSON.stringify(usersJSON, null, 2));

			return 'Points have been reset for all users.';
		}
		};

		const resetMessage = resetUserPoints();

		await interaction.reply(resetMessage);
	}

}); //end of interactionCreate for houses points

// Function to load data from a JSON file for houses points
function loadDataFromEventFile() {
	try {
		const data = fs.readFileSync('eventPoints.json', 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading file:", err);
		return [];
	}
}

// Function to save data to a JSON file
function saveDataToEventFile(data) {
	fs.writeFileSync('eventPoints.json', JSON.stringify(data), 'utf8');
}

// Load data when the bot starts
let usersJSON = loadDataFromEventFile();

// Function to add points to a team
/*function addPointsToUser(eventuser, points) {
	const userToUpdate = usersJSON.find(eventuser => eventuser.user === eventuser);
	if (userToUpdate) {
		userToUpdate.points.push(points);
		saveDataToEventFile(usersJSON); // Save the updated data to the file
		return `Added ${points} points to ${eventuser}.`;
	} else {
		return `User ${eventuser} not found.`;
	}
}*/

function addPointsToUser(eventUser, points) {
		const userToUpdate = usersJSON.find(user => user.user === eventUser);
		if (userToUpdate) {
				userToUpdate.points.push(points);
				saveDataToEventFile(usersJSON); // Save the updated data to the file
				return `Added ${points} points to ${eventUser}.`;
		} else {
				return `User ${eventUser} not found.`;
		}
}

// show-team-points function
function calculateEventPoints() {
	let eventresult = '';
	let headerDisplayed = false;
	usersJSON.forEach(user => {
		if (!headerDisplayed) {
					eventresult += '__Users Points:__\n';
			headerDisplayed = true;
		}
		if (Array.isArray(user.points)) {
			const totalPoints = user.points.reduce((acc, curr) => acc + curr, 0);
			if (user.points.length === 1) {
					eventresult += `- ${user.user}: ${totalPoints} points\n`;
			} else if (totalPoints > 0) {
					eventresult += `- ${user.user}: ${user.points.join('+')} = ${totalPoints} points\n`;
			} else {
					eventresult += `- ${user.user}: 0 points\n`;
			}
		} else {
				eventresult += `- ${user.user}: ${team.points} points\n`;
		}
	});
	return eventresult;
}

//Error handler
client.on('message', (msg) => {
	// Your message handling code
});

client.on('error', (error) => {
	console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (err) => {
		const errorMessage = `Uncaught Exception: ${err.message}\nStack: ${err.stack}`;
		console.error(errorMessage);
		const owner = '602431280113778690'; // Replace with your user ID
		const guild = client.guilds.cache.get('1029760958698102934'); // Replace with your guild ID
		if (guild) {
				const ownerUser = guild.members.cache.get(owner);
				if (ownerUser) {
						ownerUser.send(`An uncaught exception occurred:\n\`\`\`${errorMessage}\`\`\``);
				}
		}
		// Log errors to a file
		fs.appendFile('errorLog.txt', errorMessage + '\n\n', (appendErr) => {
				if (appendErr) {
						console.error('Error writing to log file:', appendErr);
				}
				process.exit(1); // Optionally exit the process after logging the error
		});
});
const { Client, Events, GatewayIntentBits, ActivityType/*, EmbedBuilder*/} = require('discord.js');
//const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { token } = require('./config.json');
const fs = require('fs');

// Create a new client instance
const client = new Client(
	{ 
		intents: [GatewayIntentBits.Guilds] 
	}
	);

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c =>
	{
		console.log(`Ready! Logged in as ${c.user.tag}`);
		//client.user.setStatus('dnd');
		//client.user.setActivity('you', { type: "WATCHING" });
		client.user.setActivity('to your profile', {
			type: ActivityType.Watching,
		  });
	}
);

//client.once('ready', () => { client.user.setActivity('Bots', { type: "WATCHING" }); });


// Log in to Discord with your client's token
client.login(token);


client.on('message', message => {
	if (message.mentions.has(c.user)) {
	  message.channel.send('Hey there!');
	}
  });

//Ping interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'ping')
			{	
				timeStamp = Date.now();
				await interaction.reply(`Pong! Command's latency is ${timeStamp - interaction.createdTimestamp} ms.`);
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Server interaction
client.on('interactionCreate', async interaction => 
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'server')
			{
				await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//User interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'user')
			{
				const user = interaction.options.getUser('user');
				await interaction.reply(`${user.username} joined on ${interaction.options.getUser('user').member.joinedAt}.`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Rob-balls interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'rob-balls')
			{
				const user = interaction.options.getUser('user');
				await interaction.reply(`Stolen ${user.username} balls <:troll_blur:1075725167432585216>`);
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
			}
	}
);

//Tournament interaction
client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'tournament')
			{
				const ownerRole = interaction.guild.roles.cache.find(role => role.name === 'Owner');
				if (interaction.member.roles.cache.has(ownerRole.id))
					{
						const title = interaction.options.getString('title');
        				const description = interaction.options.getString('description');
        				const participants = interaction.options.getInteger('participants').toString();
        				const startTime = interaction.options.getString('start_time');
						const tournamentEmbed = new EmbedBuilder()
						 	.addFields(
							{ name: 'ACEs Tournament #x', value: title },
							{ name: 'Description :', value: description },
							{ name: 'Number of contestants :', value: participants },
							{ name: 'Timestamp :', value: startTime });
						await interaction.reply({ embeds: [tournamentEmbed] });
					}
				else
					{
						await interaction.reply('You do not have permission to use this command!');
					}
			};
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	},
);

//tournament-status command

client.on('interactionCreate', async interaction =>
	{
		if (!interaction.isCommand()) return;

		if (interaction.commandName === 'news')
			{
				/*filePath = 'C:/Users/samue/OneDrive/Documents/GitHub/ACEs-Bot/tournament.txt';
				fs.readFile(filePath, 'utf8', function(err, data) {
					if (err) {
					  console.error(err);
					  return;
					}
					console.log(data);
				  });*/
				const tournamentEmbed = new EmbedBuilder()
				/*.setColor(
					{ value: "Purple" })*/
				.addFields(
                	{ name: '__ACEs Tournament #3__', value: ' ' },
                	{ name: '__Description :__', value: 'For that tournament, you will only be able to use event forms pokemons.' },
					{ name: '__Requirements :__', value: '> One Gmax Pokémon maximum\n > One Mega Pokémon maximum\n > One Legendary/Mythical Pokémon maximum\n > One Easter event Pokémon maximum\n > God Pokémon are banned\n > No illegal pokemons allowed <:minion_stare:1070271546016399401>'},
                	{ name: '__Maximum number of contestants :__', value: '8' },
					{ name: '__Current number of contestants__', value: '1'},
                	{ name: '__When ?__', value: '<t:1683880200:F>' },
					{ name: '__Prizes__', value: '> 1st : Good IV Legendary/Mythical + 100k\n > 2nd : Mid IV Legendary/Mythical + 50k' });
				await interaction.reply({ embeds: [tournamentEmbed] });
			};
				timeStamp = Date.now();
				var dateFormat = new Date(timeStamp);
				console.log(`${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`);
	},
);



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
  
  process.on('uncaughtException', (error) => {
	console.error('Uncaught exception:', error);
	process.exit(1); // Exit with error code 1
  });

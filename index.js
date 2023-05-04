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
				const tournamentEmbed = new EmbedBuilder()
				.addFields(
                	{ name: 'ACEs Tournament #3', value: ' ' },
                	{ name: 'Description :', value: 'Amazing tourny' },
                	{ name: 'Number of contestants :', value: '8' },
                	{ name: 'When ?', value: 'one day' },
					{ name: 'Prizes', value: '> 1st : Good IV Legendary/Mythical + 25k\n > 2nd : Mid IV Legendary/Mythical + 20k' });

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

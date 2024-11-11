/*const { REST } = require("discord.js");
const { Routes } = require("discord.js");
const {
	clientId,
	token,
	main_clientId,
	main_token,
	SWMG_guildId,
	Pokeverse_guildId,
} = require("./private/config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const SWMG_commands = [];
const Pokeverse_commands = [];

// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, "global");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

// Grab all the command files from the SWMG directory you created earlier
const SWMG_commandsPath = path.join(__dirname, "SWMG");
const SWMG_commandFiles = fs.readdirSync(SWMG_commandsPath).filter((file) => file.endsWith(".js"));

// Grab all the command files for Pokeverse
const Pokeverse_commandsPath = path.join(__dirname, "Pokeverse");
const Pokeverse_commandFiles = fs.readdirSync(Pokeverse_commandsPath).filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./global/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in global/${file}`);
		continue;
	}
	commands.push(command.data.toJSON());
}

// Grab the SlashCommandBuilder#toJSON() output of each SWMG command's data for deployment
for (const file of SWMG_commandFiles) {
	const command = require(`./SWMG/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in SWMG/${file}`);
		continue;
	}
	SWMG_commands.push(command.data.toJSON());
}

for (const file of Pokeverse_commandFiles) {
	const command = require(`./Pokeverse/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in Pokeverse/${file}`);
		continue;
	}
	Pokeverse_commands.push(command.data.toJSON());
}

// Constructs and prepares an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);
const main_rest = new REST({ version: "10" }).setToken(main_token);

// deploy commands
(async () => {
	try {
		await rest.put(Routes.applicationCommands(clientId), { body: [] });
		console.log('Successfully deleted all application commands.');

		await main_rest.put(Routes.applicationCommands(main_clientId), { body: [] });
		console.log('Successfully deleted all application commands.');

		console.log(`Started refreshing ${commands.length} application (/) commands of main bot.`);

		const main_data = await main_rest.put(Routes.applicationCommands(main_clientId), {
			body: commands,
		});

		console.log(`Successfully reloaded ${SWMG_commands.length} guild application (/) commands of main bot.`);
		
		console.log(`Started refreshing ${commands.length} guild application (/) commands of main bot.`);
		const SWMG_data = await main_rest.put(
			Routes.applicationGuildCommands(main_clientId, SWMG_guildId),
			{ body: SWMG_commands },
		);

		// Deploy commands for Pokeverse server
		console.log(`Started refreshing ${Pokeverse_commands.length} guild commands for Pokeverse server.`);
		await main_rest.put(
			Routes.applicationGuildCommands(main_clientId, Pokeverse_guildId),
			{ body: Pokeverse_commands }
		);
		console.log(`Successfully reloaded ${Pokeverse_commands.length} guild commands for Pokeverse server.`);
		
		console.log(`Successfully reloaded ${commands.length} guild application (/) commands of main bot.`);

		console.log(`Started refreshing ${commands.length} guild application (/) commands of testing bot.`);

		const data = await rest.put(Routes.applicationCommands(clientId), {
			body: commands,
		});
		console.log(`Successfully reloaded ${commands.length} guild application (/) commands of testing bot.`);
		

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();*/

const { REST } = require("discord.js");
const { Routes } = require("discord.js");
const {
	clientId,
	token,
	main_clientId,
	main_token,
	SWMG_guildId,
	Pokeverse_guildId,
} = require("./private/config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
//const SWMG_commands = [];
const Pokeverse_commands = [];

// Load global commands
const commandsPath = path.join(__dirname, "global");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./global/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in global/${file}`);
		continue;
	}
	commands.push(command.data.toJSON());
}

/*// Load SWMG-specific commands
const SWMG_commandsPath = path.join(__dirname, "SWMG");
const SWMG_commandFiles = fs.readdirSync(SWMG_commandsPath).filter((file) => file.endsWith(".js"));
for (const file of SWMG_commandFiles) {
	const command = require(`./SWMG/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in SWMG/${file}`);
		continue;
	}
	SWMG_commands.push(command.data.toJSON());
}*/

// Load Pokeverse-specific commands
const Pokeverse_commandsPath = path.join(__dirname, "Pokeverse");
const Pokeverse_commandFiles = fs.readdirSync(Pokeverse_commandsPath).filter((file) => file.endsWith(".js"));
for (const file of Pokeverse_commandFiles) {
	const command = require(`./Pokeverse/${file}`);
	if (!command.data) {
		console.error(`Command data is missing in Pokeverse/${file}`);
		continue;
	}
	Pokeverse_commands.push(command.data.toJSON());
}

// Prepare REST instances
const rest = new REST({ version: "10" }).setToken(token);
const main_rest = new REST({ version: "10" }).setToken(main_token);

(async () => {
	try {
		// Deploy global commands (only once)
		console.log(`Started refreshing ${commands.length} global commands.`);
		await main_rest.put(Routes.applicationCommands(main_clientId), { body: commands });
		console.log(`Successfully reloaded ${commands.length} global commands.`);

		/*// Deploy SWMG guild-specific commands
		console.log(`Started refreshing ${SWMG_commands.length} SWMG guild commands.`);
		await main_rest.put(
			Routes.applicationGuildCommands(main_clientId, SWMG_guildId),
			{ body: SWMG_commands }
		);
		console.log(`Successfully reloaded ${SWMG_commands.length} SWMG guild commands.`);*/

		// Deploy Pokeverse guild-specific commands
		console.log(`Started refreshing ${Pokeverse_commands.length} Pokeverse guild commands.`);
		await main_rest.put(
			Routes.applicationGuildCommands(main_clientId, Pokeverse_guildId),
			{ body: Pokeverse_commands }
		);
		console.log(`Successfully reloaded ${Pokeverse_commands.length} Pokeverse guild commands.`);

	} catch (error) {
		console.error("Error deploying commands:", error);
	}
})();


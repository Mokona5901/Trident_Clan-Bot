const { SlashCommandBuilder } = require('discord.js');


const command = new SlashCommandBuilder()
		.setName('reminder')
		.setDescription('Set a reminder.')
		.addStringOption(option => 
			option.setName('time')
				.setDescription('When to be reminded (Syntax : <today or tomorrow> <hour + AM/PM>')
				.setRequired(true),
		)
        .addStringOption(option => 
			option.setName('message')
				.setDescription('Message to display')
				.setRequired(true),
		);
module.exports = {
	data: command,
	async execute(interaction) {
        const time = interaction.options.getString('time');
        const message = interaction.options.getString('message');
    
        // Logic to handle the reminder and send the message goes here
    
        await interaction.reply('Reminder set successfully!');
	},
};
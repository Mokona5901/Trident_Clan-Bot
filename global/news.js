const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('news')
    .setDescription('Shows the infomation about the server');

module.exports = {
    data: command,
    async execute(interaction) {

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
                { name: '__ACEs Tournament #3__', value: ' ' },
                { name: '__Description :__', value: 'For that tournament, you will only be able to use event forms pokemons.' },
                { name: '__Requirements :__', value: '> One Gmax Pokémon maximum\n > One Mega Pokémon maximum\n > One Legendary/Mythical Pokémon maximum\n > One Easter event Pokémon maximum\n > God Pokémon are banned\n > No illegal pokemons allowed :minion_stare~1:'},
                { name: '__Number of contestants :__', value: '8' },
                { name: '__When ?__', value: '<t:1683880200:F>' },
                { name: '__Prizes__', value: '> 1st : Good IV Legendary/Mythical + 25k\n > 2nd : Mid IV Legendary/Mythical + 20k' });
       await interaction.reply({ embeds: [tournamentEmbed] });
    },
};

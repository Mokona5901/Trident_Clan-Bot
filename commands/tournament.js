const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('tournament')
    .setDescription('Create a Pokémon tournament')
    .addStringOption(option =>
        option.setName('title')
            .setDescription('Name of tournament')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('description')
            .setDescription('Type of tournament')
            .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('participants')
            .setDescription('Number of contestants')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('start_time')
            .setDescription('Start time of tournament')
            .setRequired(true)
    );

module.exports = {
    data: command,
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const participants = interaction.options.getInteger('participants').toString();
        const startTime = interaction.options.getString('start_time');

        const tournamentEmbed = new EmbedBuilder()
            .addFields(
                { name: 'ACEs Tournament #x', value: title },
                { name: 'test1', value: description },
                { name: 'test2', value: participants },
                { name: 'test3', value: startTime });
                fs.appendFile('tournament.txt', 'This is some text to append to the file', function(err) {
                    if (err) {
                        console.error('Error appending data to file:', err);
                    } else {
                        console.log('Data was appended to the file');
                    }
                      });
       await interaction.reply({ embeds: [tournamentEmbed] });
    },
};

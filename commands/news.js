const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('news')
    .setDescription('Shows the infomation about the server');

module.exports = {
    data: command,
    async execute(interaction) {
        const tournamentEmbed = new EmbedBuilder()
            .addFields(
                { name: 'ACEs Tournament #3' },
                { name: 'Description :', value: 'Amazing tourny' },
                { name: 'Number of contestants :', value: 8 },
                { name: 'When ?', value: 'one day' });
                /*fs.appendFile('tournament.txt', 'This is some text to append to the file', function(err) {
                    if (err) {
                        console.error('Error appending data to file:', err);
                    } else {
                        console.log('Data was appended to the file');
                    }
                      });*/
       await interaction.reply({ embeds: [tournamentEmbed] });
    },
};

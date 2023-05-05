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
                { name: '__ACEs Tournament #3__', value: ' ' },
                { name: '__Description :__', value: 'For that tournament, you will only be able to use event forms pokemons.' },
                { name: '__Requirements :__', value: '> One Gmax Pokémon maximum\n > One Mega Pokémon maximum\n > One Legendary/Mythical Pokémon maximum\n > One Easter event Pokémon maximum\n > God Pokémon are banned\n > No illegal pokemons allowed :minion_stare~1:'},
                { name: '__Number of contestants :__', value: '8' },
                { name: '__When ?__', value: '<t:1683880200:F>' },
                { name: '__Prizes__', value: '> 1st : Good IV Legendary/Mythical + 25k\n > 2nd : Mid IV Legendary/Mythical + 20k' });
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

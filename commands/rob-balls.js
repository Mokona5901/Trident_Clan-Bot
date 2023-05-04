const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
    .setName('rob-balls')
    .setDescription('Rob balls of a user')
    .addUserOption(option => 
        option.setName('user')
            .setDescription('User to troll')
            .setRequired(true)
    );

module.exports = {
    data: command,
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`Vous avez mentionné l'utilisateur : ${user}`);
    },
};
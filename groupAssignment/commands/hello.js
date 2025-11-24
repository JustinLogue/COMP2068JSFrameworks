const {SlashCommandBuilder, User} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Greets the user with Hello!'),
        async execute(interaction) {
            const sent =await interaction.reply({content: 'Greeting', fetchReply: true});
            

            await interaction.editReply(`Hello there ${User}! Hope your having a great day!`);
            

        }

    }
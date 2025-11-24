require('dotenv').config();

const{REST, Routes} = require('discord.js');
const deployCommands = async () => {
    try{
        const commands =[];
        const commandFiles =fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles){
            const command =require(`./commands/${file}`);
            if('data' in command && 'execute' in command){
                commands.push(command.data.toJSON());
            } else {
                console.log(`The command at ./commands/${file} is missing a required "data" or "execute" property.`);
            }
    }
    
    const rest = new REST().setToken(process.env.BOT_TOKEN);

    console.log(`Started refreshing application ${commands.length} commands.`);

    const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        {body: commands},
    );
    console.log(`Successfully reloaded ${data.length} application commands.`);
    }catch (error){
        console.error('Error deploying commands: ',error);
    }

    }




const {Client,
    GatewayIntentBits,
    Partials,
    Collection,
    ActivityType,
    PresenceUpdateStatus,
    Events
} = require('discord.js');

//const {token} =require("./config.json");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        ],
    Partials:[
        Partials.Message,
        Partials.Channel,
        Partials.User,
        Partials.GuildMember
    ] });

client.commands= new Collection();

const fs=require('fs');
const path=require('path');
const commandsPath=path.join(__dirname,'commands');
const commandFiles=fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

for(const file of commandFiles){
    const filePath=path.join(commandsPath,file);
    const command =require(filePath);

    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name,command);
    } else {
        console.log(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await deployCommands();
    console.log('Commands deployed');

    const statusType = process.env.BOT_STATUS_TYPE || 'ONLINE';
    const activityType = process.env.ACTIVITY_TYPE || 'Playing';
    const activityName = process.env.ACTIVITY_TYPE || 'Discord';

    const activityTypeMap = {
        PLAYING: ActivityType.Playing,
        STREAMING: ActivityType.Watching,
        LISTENING: ActivityType.Listening,
        WATCHING: ActivityType.Watching,
        COMPETING: ActivityType.Competing
    };

    const statusMap = {
        'ONLINE': PresenceUpdateStatus.Online,
        'IDLE': PresenceUpdateStatus.Idle,
        'DND': PresenceUpdateStatus.DoNotDisturb,
        'INVISIBLE': PresenceUpdateStatus.Invisible
    };

    client.user.setPresence({
        status: statusMap[statusType],
        activities: [{
            name: activityName,
            type: activityTypeMap[activityType]
        }]
    });
    console.log(`bot status set to: ${statusType}`);
    console.log(`bot activity set to: ${activityType} ${activityName}`);

});
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error;
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }else
        {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
client.login(process.env.BOT_TOKEN);
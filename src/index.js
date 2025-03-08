const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] 
});

client.once("ready", async () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    const guild = client.guilds.cache.get("ID_DEL_SERVIDOR");
    
    if (!guild) return console.log("Servidor no encontrado");

    const role = guild.roles.cache.get("ID_DEL_ROL");

    if (!role) return console.log("Rol no encontrado");

    const members = await guild.members.fetch();
    const usersWithoutRole = members.filter(member => !member.roles.cache.has(role.id));

    console.log("Usuarios sin el rol:", usersWithoutRole.map(m => m.user.id).join("\n"));
});

client.login(process.env.TOKEN);
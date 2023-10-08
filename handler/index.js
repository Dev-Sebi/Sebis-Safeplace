require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");
const { Client, ActivityType } = require("discord.js");
const globPromise = promisify(glob);
const emojis = require('../utils/emojis.js')


/**
 * @param {Client} client
 */

 module.exports = async (client) => {

    // This doesnt work because its not going past the await... fuck knows why
    // const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    // eventFiles.map((value) => require(value));
  
    client.on("ready", async (client) => {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Currently in ${client.guilds.cache.size} ${client.guilds.cache.size == 1 ? "Server" : "Servers"}`);
        console.log("Commands Loaded!")
        client.user.setPresence({
            activities: [
              {
                name: "relaxation take place",
                type: ActivityType.WATCHING,
              },
            ],
            status: "online", // You can set this to "online", "idle", "dnd" (do not disturb), or "invisible"
          });
    });
    
    client.on("guildMemberUpdate", async (oldMember, newMember) => {

        if(oldMember.pending && (!newMember.pending))
        {
            try {
                const guild = client.guilds.cache.get(process.env.SAFEPLACE_GUILD_ID);
                if (!guild) throw new Error("Guild not found.");
          
                const role = guild.roles.cache.get(process.env.JOINING_ROLE_ID);
                if (!role) throw new Error("Role not found.");
        
                const channel = guild.channels.cache.get(process.env.JOINING_CHANNEL_ID);
                if (!role) throw new Error("Channel not found.");
                
                await newMember.roles.add(role);
        
                if (channel) {
                  await channel.send(`${client.emojis.resolve(emojis.IconJoin).toString()} Welcome to the server, <@${newMember.user.id}>! :herb:`);
                } else {
                  throw new Error("Channel not found or not a text channel.");
                }
                
            } catch (error) {
                console.error("An error occurred:", error);
            }
        } 
    });
};

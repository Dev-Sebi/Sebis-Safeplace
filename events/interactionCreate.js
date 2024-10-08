require("dotenv").config();
const Discord = require("discord.js");
const client = require("../bot.js");

client.on("interactionCreate", async (interaction) => {
    try
    {
        const cmd = client.ArrayOfApplicationCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured " });
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        cmd.execute(client, interaction, args);
    }
    catch(error)
    {
        console.log(pico.red("Error in /events/interactionCreate.js"), error)
    }
});

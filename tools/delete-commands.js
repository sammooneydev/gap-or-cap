require("dotenv").config();
const { REST } = require("discord.js");
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const applicationId = process.env.APP_ID;
    const commands = await rest.get(`/applications/${applicationId}/commands`);
    for (const command of commands) {
      await rest.delete(
        `/applications/${applicationId}/commands/${command.id}`
      );
      console.log(`Deleted command ${command.name}`);
    }
  } catch (error) {
    console.error(error);
  }
})();

//exports the 'define-gap' command for the bot with a file upload option that takes in a video file
module.exports = {
  data: {
    name: "submit-clip",
    description: "submit a clip",
    options: [
      {
        name: "clip",
        description: "attach your clip",
        type: 11, //11 = video file
        required: true,
      },
      {
        name: "duration",
        description: "voting time in seconds (30s by default)",
        type: 4, //4 = integer
        required: false,
      },
    ],
  },
  run: async ({ interaction }) => {
    //wrapping command's code in a try catch
    try {
      //gets the attached video file from the command
      const clip = interaction.options.getAttachment("clip");
      //gets the inputted time from the command (if it was entered)
      const duration = interaction.options.getInteger("duration") || 30;
      //check if the file is a valid video
      if (!clip || !clip.contentType.startsWith("video/")) {
        return interaction.reply({
          content: "Please attach a valid video file",
          ephemeral: true,
        });
      }
      //defer reply to give the bot time to deal with the video file
      await interaction.deferReply();
      //edit and send deferred reply
      await interaction.editReply({
        content: `Allllllrighty then chatroom, I have a *simple* question for you. GAP. OR. CAP.\n\n*votes will be counted in ${duration} seconds*`,
        files: [clip.url],
      });
      //fetches the original reply to the command and declares it as 'message'
      const message = await interaction.fetchReply();

      //add reactions to the message for use in voting
      await message.react("💀");
      await message.react("🧢");

      //creates a filter so that only votes placed by non-bot users are counted
      const filter = (reaction, user) =>
        ["💀", "🧢"].includes(reaction.emoji.name) && !user.bot;

      //sets a timer for 30 seconds that allows the votes to be counted
      const collected = await message.awaitReactions({
        filter,
        time: duration * 1000,
      });

      //assign number of votes to 'gapvotes' and 'capvotes' variables once the timer is up
      const gapvotes = collected.get("💀")?.count || 0;
      const capvotes = collected.get("🧢")?.count || 0;

      //send a gif from the data directory based on the result of the vote
      if (gapvotes > capvotes) {
        await interaction.followUp({ files: ["data/gap.gif"] });
      } else if (gapvotes === capvotes) {
        await interaction.followUp({ files: ["data/draw.gif"] });
      } else {
        await interaction.followUp({ files: ["data/cap.gif"] });
      }
    } catch (err) {
      console.error("Error in submit-clip command:", err);
      if (!interaction.replied) {
        await interaction.reply({
          content: "Something went wrong. Please try again later.",
          ephemeral: true,
        });
      }
    }
  },
};

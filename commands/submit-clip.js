//exports the 'define-gap' command for the bot with a file upload option that takes in a video file
module.exports = {
  data: {
    name: "submit-clip",
    description: "submit a clip",
    options: [
      {
        name: "clip",
        description: "attach your clip",
        type: 11,
        required: true,
      },
    ],
  },
  run: async ({ interaction }) => {
    //gets the attached video file from the command
    const clip = interaction.options.getAttachment("clip");
    //check if the file is a valid video
    if (!clip || !clip.contentType.startsWith("video/")) {
      return interaction.reply({
        content: "Please attach a valid video file",
        ephemeral: true,
      });
    }
    //sends the video with the message defined in 'content'
    try {
      await interaction.reply({
        content:
          "Allllllrighty then chatroom, I have a *simple* question for you. GAP. OR. CAP.\n\n*votes will be counted in 30 seconds*",
        files: [clip.url],
      });
    } catch (err) {
      console.error("failed to reply to interaction", err);
    }
    //fetches the original reply to the command and declares it as 'message'
    const message = await interaction.fetchReply();

    //add reactions to the message for use in voting
    await message.react("💀");
    await message.react("🧢");

    //creates a filter so that only votes placed by non-bot users are counted
    const filter = (reaction, user) =>
      ["💀", "🧢"].includes(reaction.emoji.name) && !user.bot;

    //sets a timer for 30 seconds that allows the votes to be counted
    const collected = await message.awaitReactions({ filter, time: 30000 });

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
  },
};

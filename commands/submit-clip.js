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
    try {
      const clip = interaction.options.getAttachment("clip");
      const duration = interaction.options.getInteger("duration") || 30;
      if (!clip || !clip.contentType.startsWith("video/")) {
        return interaction.reply({
          content: "Please attach a valid video file",
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      
      await interaction.editReply({
        content: `Allllllrighty then chatroom, I have a *simple* question for you. GAP. OR. CAP.\n\n*votes will be counted in ${duration} seconds*`,
        files: [clip.url],
      });
      const message = await interaction.fetchReply();

      await message.react("💀");
      await message.react("🧢");

      const filter = (reaction, user) =>
        ["💀", "🧢"].includes(reaction.emoji.name) && !user.bot;

      const collected = await message.awaitReactions({
        filter,
        time: duration * 1000,
      });

      const gapvotes = collected.get("💀")?.count || 0;
      const capvotes = collected.get("🧢")?.count || 0;

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

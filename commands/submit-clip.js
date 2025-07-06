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
    const clip = interaction.options.getAttachment("clip");
    if (!clip || !clip.contentType.startsWith("video/")) {
      return interaction.reply({
        content: "Please attach a valid video file",
        ephemeral: true,
      });
    }
    await interaction.reply({
      content:
        "Allllllrighty then chatroom, I have a *simple* question for you. GAP. OR. CAP.\n\n*votes will be counted in 30 seconds*",
      files: [clip.url],
    });
    const message = await interaction.fetchReply();

    await message.react("💀");
    await message.react("🧢");

    const filter = (reaction, user) =>
      ["💀", "🧢"].includes(reaction.emoji.name) && !user.bot;

    const collected = await message.awaitReactions({ filter, time: 30000 });

    const gapvotes = collected.get("💀")?.count || 0;
    const capvotes = collected.get("🧢")?.count || 0;

    if (gapvotes > capvotes) {
      await interaction.followUp({ files: ["data/gap.gif"] });
    } else if (gapvotes === capvotes) {
      await interaction.followUp({ files: ["data/draw.gif"] });
    } else {
      await interaction.followUp({ files: ["data/cap.gif"] });
    }
  },
};

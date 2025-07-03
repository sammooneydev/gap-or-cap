module.exports = {
  data: {
    name: "define-gap",
    description: "defines the term 'gap'",
  },
  run: ({ interaction }) => {
    const examplesentences = [
      "Yo dude did you see that set? That was such an insane gap I can't even lie.",
      "I felt so bad for Player 2 man, the gap was crazy",
      "Player 2 whiffed dp. That was a gap",
      "He got gapped despite playing a top-tier",
      "He got gapped then blamed his controller",
      "The gap was predetermined",
      "That wasn't a mash, it was a gap",
    ];
    const example =
      examplesentences[Math.floor(Math.random() * examplesentences.length)];
    interaction.reply(
      "The term **'gap'** — in the modern FGC, refers to a very large *skill gap* between two opponents. It describes when one player greatly outplays their opponent, leading to an easy victory.\n\n" +
        "**Example:**\n" +
        `_"${example}"_`
    );
  },
};

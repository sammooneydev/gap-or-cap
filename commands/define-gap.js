module.exports = {
  data: {
    name: "define-gap",
    description: "defines the term 'gap'",
  },
  run: ({ interaction }) => {
    const examplesentences = [
        "Yo dude did you see that set? That was such an insane gap I can't even lie.",
        "I felt so bad for Player 2 man, the gap was crazy",
    ]
    const example = examplesentences[Math.floor(Math.random() * examplesentences.length)];
    interaction.reply(
      "**The term 'gap'** — in the modern FGC, refers to a very large *skill gap* between two opponents. It describes when one player greatly outplays their opponent, leading to an easy victory.\n\n" +
        "**Example:**\n" +
        `_"${example}"_`
    );
  },
};

module.exports = {
  data: {
    name: "define-cap",
    description: "defines the term 'cap' within this context",
  },
  run: ({ interaction }) => {
    try {
      const examplesentences = [
        "Calling THAT a gap is absolutely cap, he just messed up his dp",
        "Thats cap, you just lamed me out with a top tier",
        "You said you gapped me but thats cap bro, you were just mashing",
      ];
      const example =
        examplesentences[Math.floor(Math.random() * examplesentences.length)];

      interaction.reply(
        "The term **'cap'** — in the current context, refers to a situation where the gap in question is in fact, **NOT** a gap.\n\n" +
          "**Example:**\n" +
          `_"${example}"_`
      );
    } catch (err) {
      console.error("error with define-cap command: ", err);
    }
  },
};

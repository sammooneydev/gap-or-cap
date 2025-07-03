module.exports = {
  data: {
    name: "define-cap",
    description: "defines the term 'cap' within this context",
  },
  run: ({ interaction }) => {
    const examplesentences = [
        
    ];
    const example =
      examplesentences[Math.floor(Math.random() * examplesentences.length)];
    interaction.reply(
      "The term **'cap'** — in the current context, refers to a situation where the gap in question is in fact, **NOT** a gap.\n\n" +
        "**Example:**\n" +
        `_"${example}"_`
    );
  },
};

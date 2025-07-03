module.exports = {
    data : {
        name: 'ping',
        description: 'test desc',
    },
    run: ({ interaction }) => {
        interaction.reply("testing testing");
    }
}
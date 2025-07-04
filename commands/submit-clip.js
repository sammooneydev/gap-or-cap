module.exports = {
    data: {
        name: 'submit-clip',
        description: 'submit a clip',
        options: [
            {
                name: 'clip',
                description: 'attach your clip',
                type: 11,
                required: true,
            },
        ],
    },
    run: async ({ interaction }) => {
        const clip = interaction.options.getAttachment('clip');
        if (!clip || !clip.contentType.startsWith('video/')) {
            return interaction.reply({ content: "Please attach a valid video file", ephemeral: true});
        }
        await interaction.reply({ content: 'Allllllrighty then chatroom, I have a simple question for you. GAP. OR. CAP.', files: [clip.url]});
        //TODO: add process for actually polling the server, whether that be with reactions or with an actual poll
    }
}
const { noPerms, noBotPerms } = require("../modules/botModule.js");

module.exports = {
  name: "purge",
  aliases: ["prune", "clear", "bulkdelete", "bulk-delete"],
  description:
    "Mass delete messages in a channel. Pinned messages will not be deleted.",
  args: 1,
  usage: "<integer>",
  disableable: true,
  info: "<integer> must be smaller than or equal to 1000.",
  execute: async (message, args) => {
    const client = message.client;
    const check = client.emojis.cache.find(emoji => emoji.name === "Check");
    const x = client.emojis.cache.find(emoji => emoji.name === "Error");
    const loading = client.emojis.cache.find(
      emoji => emoji.name === "loadingdiscord"
    );
    if (
      !message.channel.permissionsFor(message.member).serialize()
        .MANAGE_MESSAGES
    )
      return noPerms("Manage Messages", message.channel);
    if (
      !message.channel.permissionsFor(message.guild.me).serialize()
        .MANAGE_MESSAGES
    )
      return noBotPerms("Manage Messages", message.channel);
    const targetCount = parseInt(args[0]);
    if (isNaN(targetCount))
      return message.channel.send(`${x} **Arguments must be a number.**`);
    if (targetCount > 1000 || targetCount < 2)
      return message.channel.send(
        `${x} **Please use a value that's between 2 and 1000.**`
      );
    const notifyMsg = await message.channel.send(
      `${loading} Deleting messages...`
    );
    const deathRow = [];
    while (targetCount - deathRow.length > 0) {
      const fetchedMsgs = await message.channel.messages.fetch({
        limit:
          targetCount - deathRow.length > 100
            ? 100
            : targetCount - deathRow.length,
        before: deathRow[deathRow.length - 1]?.id || message.id
      });
      if (fetchedMsgs.size === 0) break;
      deathRow.push(...fetchedMsgs.array());
    }
    const finalDeathRow = deathRow.filter(
      x => !x.pinned && x.createdTimestamp > Date.now() - 1209600000
    );
    if (finalDeathRow.size === 0)
      return notifyMsg.edit(
        `${x} No messages found to delete.\nNote: Messages older than 2 weeks cannot be deleted.`
      );
    let executeGroups = [];
    for (let i = 0; i < finalDeathRow.length - 1; i += 100) {
      executeGroups.push(finalDeathRow.slice(i, i + 100));
    }
    for (const group of executeGroups) {
      await message.channel.bulkDelete(group);
    }
    notifyMsg.edit(`${check} Deleted \`${finalDeathRow.length}\` messages.`);
  }
};

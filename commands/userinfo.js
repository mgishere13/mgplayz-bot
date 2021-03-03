const { findUser } = require("../modules/botModule.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "userinfo",
  aliases: ["whois", "user-info"],
  description: "Shows user information. (Not a member)",
  usage: "[user resolvable]",
  cooldown: 2,
  notDisableable: false,
  execute: async (message, args) => {
    const client = message.client;
    const online = client.emojis.cache.find(emoji => emoji.name === "online");
    const idle = client.emojis.cache.find(emoji => emoji.name === "idle");
    const dnd = client.emojis.cache.find(emoji => emoji.name === "dnd");
    const offline = client.emojis.cache.find(emoji => emoji.name === "offline");
    const x = message.client.emojis.cache.get("665142091906809877")
    let userCache;
    if (args[0]) {
      userCache = await findUser(message, args.join(" ")).catch(error => {
        userCache = message.author;
      });
    } else userCache = message.author;
    let user;
    if (!userCache) user = message.author;
    else user = userCache;
    const embed = new MessageEmbed()
      .setTitle(":bust_in_silhouette:  User Information")
      .setDescription(user)
      .setThumbnail(
        user.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .addField(
        "Registered",
        `${moment
          .utc(user.createdAt)
          .format("ddd, DD MMM YYYY")} at ${moment
          .utc(user.createdAt)
          .format("LT")}`,
        true
      );
    let status;
    try {
      if (user.presence.status === "online") status = `${online} Online`;
      if (user.presence.status === "idle") status = `${idle} Idle`;
      if (user.presence.status === "dnd") status = `${dnd} Do Not Disturb`;
      if (user.presence.status === "offline") status = `${offline} Offline`;
      embed.addField("Status", status, true);
      if (user.presence.game) {
        if (user.presence.game.name == "Custom Status")
          user.presence.game.name =
            "Custom Status - " + user.presence.game.state;
        embed.addField("Playing", user.presence.game.name, true);
      }
    } catch (error) {}
    message.channel.send(embed);
  }
};

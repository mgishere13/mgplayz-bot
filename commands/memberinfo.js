const {
  findUser,
  findMember,
  getJoinRank
} = require("../modules/botModule.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "memberinfo",
  aliases: ["member-info"],
  notDisableable: false,
  description: "Shows information of a server member.",
  usage: "[username/id]",
  cooldown: 2,
  execute: async (message, args) => {
    const client = message.client;
    const online = client.emojis.cache.find(emoji => emoji.name === "online");
    const idle = client.emojis.cache.find(emoji => emoji.name === "idle");
    const dnd = client.emojis.cache.find(emoji => emoji.name === "dnd");
    const offline = client.emojis.cache.find(emoji => emoji.name === "offline");
    const x = message.client.emojis.cache.get("665142091906809877")
    let memberCache;
    if (args[0]) {
      memberCache = await findMember(message, args.join(" ")).catch(error => {
        memberCache = message.member;
      });
    } else memberCache = message.member;
    let member;
    if (!memberCache) member = message.member;
    else member = memberCache;
    const embed = new MessageEmbed();
    embed.setTitle(":busts_in_silhouette:  Member Information");
    embed.setColor(member.displayHexColor);
    embed.setDescription(member);
    embed.addField(
      "Registered",
      `${moment
        .utc(member.user.createdAt)
        .format("ddd, DD MMM YYYY")} at ${moment
        .utc(member.user.createdAt)
        .format("LT")}`,
      true
    );
    embed.addField(
      "Joined",
      `${moment
        .utc(member.joinedAt)
        .format("ddd, DD MMM YYYY")} at ${moment
        .utc(member.joinedAt)
        .format("LT")}`,
      true
    );
    if (member.roles.highest)
      embed.addField("Highest Role", member.roles.highest, true);
    if (member.roles.hoist)
      embed.addField("Highest Hoisted Role", member.roles.hoist, true);
    embed.addField("Join Position", getJoinRank(member.id, message), true);
    embed.setThumbnail(
      member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    try {
      let status;
      if (member.presence.status === "online") status = `${online} Online`;
      else if (member.presence.status === "idle") status = `${idle} Idle`;
      else if (member.presence.status === "dnd")
        status = `${dnd} Do Not Disturb`;
      else if (member.presence.status === "offline")
        status = `${offline} Offline`;
      embed.addField("Status", status, true);
      if (member.presence.activities) {
        let gameState;
        if (member.presence.activities[0].type === 'CUSTOM_STATUS') {
          if (member.presence.activities[0].emoji)
            gameState = `${member.presence.activities[0].emoji.name} ${member.presence.activities[0].state}`;
          else gameState = member.presence.activities[0].state;
        } else gameState = member.presence.activities[0].name;
        embed.addField("Playing", gameState, true);
      }
    } catch (error) {}
    message.channel.send(embed);
  }
};

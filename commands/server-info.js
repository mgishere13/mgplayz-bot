const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "server-info",
  description: "Return Server Information",
  aliases: ["serverinfo", "guildinfo"],
  cooldown: 5,
  args: false,
  notDisableable: false,
  execute: (message, args) => {
    const client = message.client;
    const online = client.emojis.cache.find(emoji => emoji.name === "online");
    const idle = client.emojis.cache.find(emoji => emoji.name === "idle");
    const dnd = client.emojis.cache.find(emoji => emoji.name === "dnd");
    const offline = client.emojis.cache.find(emoji => emoji.name === "offline");
    const serverInfo = new MessageEmbed().setTimestamp().setColor("RANDOM");
    const g = message.guild;
    let region;
    const bots = g.members.cache.filter(x => x.user.bot).size;
    const human = g.members.cache.filter(x => !x.user.bot).size;
    if (g.region === "us-west") region = ":flag_us: US West";
    else if (g.region === "us-east") region = ":flag_us: US East";
    else if (g.region === "us-central") region = ":flag_us: US Central";
    else if (g.region === "us-south") region = ":flag_us: US South";
    else if (g.region === "singapore") region = ":flag_sg: Singapore";
    else if (g.region === "southafrica") region = "South Africa";
    else if (g.region === "hongkong") region = ":flag_hk: Hong Kong";
    else if (g.region === "india") region = ":flag_in: India";
    else if (g.region === "brazil") region = ":flag_br: Brazil";
    else if (g.region === "sydney") region = ":flag_au: Australia";
    else if (g.region === "europe") region = ":flag_eu: Europe";
    else if (g.region === "russia") region = ":flag_ru: Russia";
    else if (g.region === "japan") region = ":flag_jp: Japan";
    serverInfo.setTitle(g.name, true);
    if (g.iconURL()) {
      serverInfo.setThumbnail(
        g.iconURL({ format: "png", dynamic: true, size: 1024 })
      );
    }
    serverInfo.addField(
      "Created",
      `${moment.utc(g.createdAt).format("ddd, DD MMM YYYY")} at ${moment
        .utc(g.createdAt)
        .format("LT")}`,
      true
    );
    serverInfo.addField("Owner", g.owner.user, true);
    serverInfo.addField("Region", region, true);
    serverInfo.addField(
      "Channels",
      `Text: ${g.channels.cache.filter(x => x.type === "text").size}\nVoice: ${
        g.channels.cache.filter(x => x.type === "voice").size
      }\nCategories: ${
        g.channels.cache.filter(x => x.type === "category").size
      }`,
      true
    );
    serverInfo.addField(
      "Members",
      `Total: ${
        g.members.cache.size
      }\nBots: ${bots}\nHumans: ${human}\n${online} ${
        g.members.cache.filter(x => x.user.presence.status == "online").size
      }   ${idle} ${
        g.members.cache.filter(x => x.user.presence.status == "idle").size
      }   ${dnd} ${
        g.members.cache.filter(x => x.user.presence.status == "dnd").size
      }   ${offline} ${
        g.members.cache.filter(x => x.user.presence.status == "offline").size
      }`,
      true
    );
    serverInfo.addField("Roles", `${g.roles.cache.size}`, true);
    serverInfo.addField(
      "Emojis",
      `${g.emojis.cache.size} (${
        g.emojis.cache.filter(e => e.animated).size
      } animated)`,
      true
    );

    message.channel.send(serverInfo);
  }
};

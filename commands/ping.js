const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  description: "returns latency",
  aliases: ["pong"],
  cooldown: 2,
  disableable: false,
  execute: async message => {
    const client = message.client;
    const pinging = new MessageEmbed()
      .setDescription(`Pinging...`)
      .setTimestamp();
    const msg = await message.channel.send(pinging);
    const embed = new MessageEmbed()
      .setTitle(`:ping_pong: Pong!`)
      .setColor("RANDOM")
      .addField(
        "Message Round Trip",
        `${Math.abs(msg.createdTimestamp - message.createdTimestamp)} ms`
      )
      .addField("Discord Heartbeat", `${Math.round(client.ws.ping)} ms`)
      .setTimestamp();
    msg.edit(embed);
  }
};

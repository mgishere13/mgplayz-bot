const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "corona",
  description: "Get statistics on COVID-19.",
  usage: "[country]",
  cooldown: 6,
  aliases: ["coronavirus", "covid", "covid19", "covid-19", "corona-virus"],
  execute: async (message, args) => {
    let totalStats = await fetch("http://disease.sh/v3/covid-19/all");
    let countryStats = await fetch("http://disease.sh/v3/covid-19/countries");
    let stateStats = await fetch("https://disease.sh/v3/covid-19/states");
    totalStats = await totalStats.json().catch(() => {});
    countryStats = await countryStats.json().catch(() => {});
    stateStats = await stateStats.json().catch(() => {});
    const x = message.client.emojis.cache.get("665142091906809877");
    if (!totalStats || !countryStats || !stateStats) {
      return message.channel.send(
        `${x} **Oops, an error occurred while trying to fetch statistics.**`
      );
    }
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("#fa3a3a")
        .setTitle("Coronavirus (COVID-19) Statistics Worldwide")
        .setThumbnail(
          `https://cdn.glitch.com/b8e080a2-0f73-42aa-ba78-3d5fb23abbc9%2F8d20eee691b54d23d865a69f08a40cd7-basic-earth-icon-by-vexels.png?v=1606361987432`
        )
        .addField(
          "Total",
          `${totalStats.cases.toLocaleString(
            "en-US"
          )} [+${totalStats.todayCases.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Active",
          `${totalStats.active.toLocaleString("en-US")} (${(
            (totalStats.active / totalStats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .addField(
          "Critical",
          `${totalStats.critical.toLocaleString("en-US")} (${(
            (totalStats.critical / totalStats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .addField(
          "Deaths",
          `${totalStats.deaths.toLocaleString("en-US")} (${(
            (totalStats.deaths / totalStats.cases) *
            100
          ).toFixed(1)}%) [+${totalStats.todayDeaths.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Recoveries",
          `${totalStats.recovered.toLocaleString("en-US")} (${(
            (totalStats.recovered / totalStats.cases) *
            100
          ).toFixed(1)}%) [+${totalStats.todayRecovered.toLocaleString(
            "en-US"
          )}]`,
          true
        )
        .setFooter("Updated")
        .setTimestamp(totalStats.updated);
      message.channel.send(embed);
    } else if (args.join(" ").includes("--usstate")) {
      let state = args.join(" ").replace(" --usstate", "");
      console.log(state);
      let stats = stateStats.filter(
        c => c.state.toLowerCase() === state.toLowerCase()
      )[0];
      if (!stats) {
        return message.channel.send(
          "That state doesn't exist, or has no cases."
        );
      }
      const embed = new MessageEmbed()
        .setColor("#fa3a3a")
        .setTitle(`Coronavirus (COVID-19) Statistics for ${stats.state}`)
        .addField(
          "Total",
          `${stats.cases.toLocaleString(
            "en-US"
          )} [+${stats.todayCases.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Active",
          `${stats.active.toLocaleString("en-US")} (${(
            (stats.active / stats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .addField(
          "Deaths",
          `${stats.deaths.toLocaleString("en-US")} (${(
            (stats.deaths / stats.cases) *
            100
          ).toFixed(1)}%) [+${stats.todayDeaths.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Recoveries",
          `${stats.recovered.toLocaleString("en-US")} (${(
            (stats.recovered / stats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .setFooter("Updated")
        .setTimestamp(totalStats.updated);
      message.channel.send(embed);
    } else if (args.length) {
      let country = args.join(" ");
      let stats = countryStats.filter(
        c => c.country.toLowerCase() === country.toLowerCase()
      )[0];
      if (!stats) {
        return message.channel.send(
          "That country doesn't exist, or has no cases."
        );
      }
      const embed = new MessageEmbed()
        .setColor("#fa3a3a")
        .setThumbnail(stats.countryInfo.flag)
        .setTitle(`Coronavirus (COVID-19) Statistics for ${stats.country}`)
        .addField(
          "Total",
          `${stats.cases.toLocaleString(
            "en-US"
          )} [+${stats.todayCases.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Active",
          `${stats.active.toLocaleString("en-US")} (${(
            (stats.active / stats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .addField(
          "Critical",
          `${stats.critical.toLocaleString("en-US")} (${(
            (stats.critical / stats.cases) *
            100
          ).toFixed(1)}%)`,
          true
        )
        .addField(
          "Deaths",
          `${stats.deaths.toLocaleString("en-US")} (${(
            (stats.deaths / stats.cases) *
            100
          ).toFixed(1)}%) [+${stats.todayDeaths.toLocaleString("en-US")}]`,
          true
        )
        .addField(
          "Recoveries",
          `${stats.recovered.toLocaleString("en-US")} (${(
            (stats.recovered / stats.cases) *
            100
          ).toFixed(1)}%) [+${stats.todayRecovered.toLocaleString("en-US")}]`,
          true
        )
        .setFooter("Updated")
        .setTimestamp(totalStats.updated);
      message.channel.send(embed);
    }
  }
};

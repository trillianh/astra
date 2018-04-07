function cc(discordId, callback) {
  setTimeout(() => {
    callback("<@" + discordId + "> Your channel change cooldown is up!");
  }, 15 * 60 * 1000);

  callback("Started channel change timer.");
}

export { cc };
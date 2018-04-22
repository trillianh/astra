import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

function get(discordId, callback) {
  Character.findOne({ discord_id: discordId }).then((record) => {
    if (record) {
      callback({
        embed: _retrieveCharacterData(record)
      });
    } else {
      callback('character not found');
    }
  });
};

function _retrieveCharacterData(player) {
  return {
    description:  player.family_name + " (" + player.character_name + ")",
    timestamp: player.date,
    footer: {
      icon_url: "https://cdn.discordapp.com/icons/384475247723806722/b533ead0317374a01adf83f1eeae5582.png",
      text: "Last updated"
    },
    thumbnail: {
      url: "https://cdn.discordapp.com/icons/384475247723806722/b533ead0317374a01adf83f1eeae5582.png",
    },
    image: {
      url: player.image_url
    },
    fields: [
      {
        name: "Level",
        value: player.level,
        inline: true
      },
      {
        name: "Class",
        value: player.class_name,
        inline: true
      },
      {
        name: "AP",
        value: player.awk_ap,
        inline: true
      },
      {
        name: "DP",
        value: player.dp,
        inline: true
      },
      {
      name: "Gearscore",
      value: player.gear_score
      }
    ]
  };
}

export {
  get
};
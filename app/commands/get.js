import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

function get(args, discordId, callback) {
  const name = _retrieveName(args);
  const query = _buildQuery(name, discordId);

  Character.find(query).then((records) => {
    if (records && records.length > 0) {
      callback({
        embed: _retrieveCharacterData(records[0])
      });
    } else {
      callback('character not found');
    }
  });
};

function _retrieveImageURL(player) {
  const url = player.image_url;

  if (!url || url === 'No image attached.') {
    return 'https://imgur.com/qdxAgLb';
  }

  return url;
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
      url: _retrieveImageURL(player)
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
        name: "Gearscore",
        value: player.gear_score,
        inline: true
      },
      {
      name: "DP",
      value: player.dp
      }
    ]
  };
};

function _retrieveName(args) {
  if (!args || args.length === 0) {
    return null;
  }

  return args[0];
};

function _buildQuery(name, discordId) {
  let queryObj = {};

  if (name) {
    queryObj['$or'] = [{
      'character_name': name
    }, {
      'family_name': name
    }];
  } else {
    queryObj['discord_id'] = discordId;
  }

  return queryObj;
};

export {
  get
};
import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

function get(discordId, callback) {
  Character.findOne({ discord_id: discordId }).then((record) => {
    if (record) {
      callback(buildTable([record]));
    } else {
      callback('character not found');
    }
  });
};

export {
  get
};
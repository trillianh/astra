import {
  Character
} from '../models/character';

function remove(discordId, callback) {
  Character.deleteOne({ discord_id: discordId }).then((record) => {
    console.log(record);
    callback('Successfully deleted');
  });
};

export { remove };
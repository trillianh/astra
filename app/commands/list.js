import {
  Character
} from '../models/character';

function list(args, callback) {
  return Character.find({}, {}).then((results) => {
    console.log(results);
    callback(results);
  });
};

export {
 list
};
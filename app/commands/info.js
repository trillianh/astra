import {
  reduce
} from 'lodash';

import {
  Character
} from '../models/character';

function info(callback) {
  return Character.find({}, { gear_score: -1 }).then((results) => {
    callback(`Average Gear Score: ${calculateAverage('gear_score', results)}`);
  });
};

// Calculate the average gear_score
function calculateAverage(attrName, data) {
  const total = reduce(data, (result, value) => {
    if (value[attrName]) {
      result += value[attrName];
    }
    return result;
  }, 0);

  return (total / data.length);
}

export {
  info
};
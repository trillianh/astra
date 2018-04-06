import {
  Character
} from '../models/character';

const SORTABLE_ATTRS_MAPPING = {
  lvl: 'level',
  aap: 'awk_ap',
  ap: 'ap',
  dp: 'dp',
  family: 'family_name',
  character: 'character_name',
  gs: 'gear_score'
};

function list(args, callback) {
  const sortOption = _getSortOption(args);

  console.log(sortOption);
  return Character.find({}, _getSortOption(args)).then((results) => {
    console.log(results);
    callback(results);
  });
};

function _getSortOption(args) {
  if (!args || !args[0] || !args[1]) {
    return {};
  }

  const attr = args[0];
  const order = args[1];

  const sortOrder = order == 'desc' ? -1 : 1;

  let sortOption = {};
  let normalizedAttr = SORTABLE_ATTRS_MAPPING[attr];
  sortOption[normalizedAttr] = sortOrder;

  return sortOption;
};

export {
 list
};
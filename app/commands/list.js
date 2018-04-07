import {
  Character
} from '../models/character';

import {
  buildTable,
  paginateTable
} from '../common/messageFormatHelper';

import {
  forEach
} from 'lodash';

const SORTABLE_ATTRS_MAPPING = {
  lvl: 'level',
  aap: 'awk_ap',
  ap: 'ap',
  dp: 'dp',
  family: 'family_name',
  character: 'character_name',
  gs: 'gear_score',
  class: 'class_name'
};

function list(args, callback) {
  return Character.find({}, _getSortOption(args)).then((results) => {
    const table = buildTable(results);

    forEach(table, (page) => {
      callback(page);
    });
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
import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

import {
  CLASSES
} from '../constants/bdo';

import {
  capitalize,
  forEach,
  map
} from 'lodash';

const ATTRS_MAPPING = {
  lvl: 'level',
  aap: 'awk_ap',
  ap: 'ap',
  dp: 'dp',
  family: 'family_name',
  character: 'character_name',
  gs: 'gear_score',
  class: 'class_name'
};

const ORDER_BY = [
  'asc',
  'desc'
];

const OPERATOR_MAPPING = {
  over: '$gt',
  under: '$lt'
};

function list(args, callback) {
  const queryObj = _buildQuery(args);

  return Character.find(queryObj.query, queryObj.sortOption).then((results) => {
    const table = buildTable(results);

    forEach(table, async (page) => {
      await callback(page);
    });
  });
};

// '.list musa over 300 ap asc|desc'
// '.list musa under 200 ap asc|desc'
// '.list over 300 ap asc|desc'
// '.list under 200 ap asc|desc'
// '.list ap asc|desc'

// '.list {class} {filter} {value} {attr} {order}'
// '.list {attr} {filter} {value}'
function _buildQuery(args) {
  let queryObj = {
    query: {},
    sortOption: {}
  };

  if (args.length >= 4) {
    queryObj.query = _buildFullQuery(args);
    queryObj.sortOption = _buildSortOption(args[3], args[4]);
  } else if (args.length == 3) {
    queryObj.query = _buildPartialQuery(args);
  }

  return queryObj;  
};

// query = {
//   class_name: BDO_CLASS,
//   ap: {
//     $gt: INTEGER
//   }
// }
function _buildFullQuery(args) {
  let query = {};

  if (!args || !args[0] || !args[1] || !args[2] || !args[3]) {
    return query;
  }

  query['class_name'] = capitalize(args[0]);
  query[ATTRS_MAPPING[args[3]]] =  _getConditionOption(args[1], args[2]);
  
  return query;
};

function _getConditionOption(condition, value) {
  let filterOption = {};
  filterOption[OPERATOR_MAPPING[condition]] = parseInt(value);
  return filterOption;
};

function _buildPartialQuery(args) {
  let query = {};

  if (!args || !args[0] || !args[1] || !args[2]) {
    return query;
  }

  query[ATTRS_MAPPING[args[0]]] =  _getConditionOption(args[1], args[2]);

  return query;
};

function _buildSortOption(field, direction) {
  if (!field || !direction) {
    return {};
  }

  const sortOrder = direction == 'desc' ? -1 : 1;

  let sortOption = {};
  let normalizedAttr = ATTRS_MAPPING[field];
  sortOption[normalizedAttr] = sortOrder;

  return sortOption;
};

export {
 list
};

import {
  chunk,
  forEach,
  map
} from 'lodash';

const MESSAGE_FORMAT_SYM = '```';

function buildTable(records) {
  const table = [];

  table.push(
    'Family (Character)'.padEnd(30) + ' ' +
    'AP'.padEnd(6) + ' ' +
    'DP'.padEnd(6) + ' ' +
    'GS'.padEnd(6) + ' ' +
    'LVL'.padEnd(5) + ' ' +
    'Class' + '\n' +
    '-'.padEnd(140, '-') + '\n'
  );
  

  forEach(records, (record) => {
    table.push(_buildTableRow(record));
  });

  return paginateTable(table);
};

const ROWS_PER_PAGE = 20;

function paginateTable(table) {
  const paginatedTable = chunk(table, ROWS_PER_PAGE);

  forEach(paginatedTable, (page) => {
    page.unshift(MESSAGE_FORMAT_SYM);
    page.push(MESSAGE_FORMAT_SYM);
  });

  return map(paginatedTable, (page) => {
    return page.join('');
  });
}

function _buildTableRow(record) {
  const fullName = `${record.family_name} (${record.character_name})`;

  return (
    fullName.padEnd(30) + ' ' +
    record.awk_ap.toString().padEnd(4) + ' | ' +
    record.dp.toString().padEnd(4) + ' | ' +
    record.gear_score.toString().padEnd(4) + ' | ' +
    record.level.toString().padEnd(3) + ' | ' +
    record.class_name + '\n'
  );
};

export {
  buildTable,
  paginateTable
};
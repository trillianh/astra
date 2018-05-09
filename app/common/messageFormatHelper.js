
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
    'AWK AP'.padEnd(8) + ' ' +
    'DP'.padEnd(6) + ' ' +
    'GS'.padEnd(6) + ' ' +
    'RENOWN'.padEnd(9) + ' ' +
    'LVL'.padEnd(5) + ' ' +
    'Class'.padEnd(14) + ' ' +
    'Last Update' + '\n' +
    '-'.padEnd(128, '-') + '\n'
  );
  

  forEach(records, (record) => {
    table.push(_buildTableRow(record));
  });

  return paginateTable(table);
};

const ROWS_PER_PAGE = 15;

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

function getUpdate(data,  updatedTime) {
    if (data[updatedTime]) {
        let date = data[updatedTime].toString().toUpperCase();
        return date.split(' ').slice(0, 3).join(' ');
    }

      return 'Fishing Koi';
}

function _calculateRenown(record) {
  const ap = record.ap || 0;
  const awkAp = record.awk_ap || 0;
  const dp = record.dp || 0;

  return Math.floor(((ap + awkAp)/2) + dp);
}

function _buildTableRow(record) {
  const fullName = `${record.family_name} (${record.character_name})`;
  const date = getUpdate(record, 'updated_at');

  return (
    fullName.padEnd(30) + ' ' +
    (record.ap || '').toString().padEnd(4) + ' | ' +
    record.awk_ap.toString().padEnd(6) + ' | ' +
    record.dp.toString().padEnd(4) + ' | ' +
    record.gear_score.toString().padEnd(4) + ' | ' +
    (_calculateRenown(record)).toString().padEnd(7) + ' | ' +
    record.level.toString().padEnd(3) + ' | ' +
    record.class_name.padEnd(12) + ' | ' +
    date + '\n'
  );
};

export {
  buildTable,
  paginateTable
};
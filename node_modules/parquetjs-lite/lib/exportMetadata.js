const Int64 = require('node-int64');
const parquet_thrift = require('../gen-nodejs/parquet_types');

function replacer(key, value) {
  if (value instanceof parquet_thrift.PageLocation) {
    return [value[0], value[1], value[2]];
  }

  if (typeof value === 'object') {
    for (let k in value) {
      if (value[k] instanceof Date) {
        value[k].toJSON = () => ({
          parquetType: 'CTIME',
          value: value[k].valueOf()
        });
      }
    }
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }
  
  if (value instanceof Int64) {
    if (isFinite(value)) {
      return Number(value);
    } else {
      return {
        parquetType: 'INT64',
        value: [...value.buffer]
      };
    }
  } else {
    return value;
  }
}

module.exports = function exportMetadata(metadata, indent) {
  metadata = Object.assign({}, metadata, {json: true});
  return JSON.stringify(metadata,replacer,indent);
};

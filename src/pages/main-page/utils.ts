import { RequestRecord } from './types';

const checkHeadersEqual = (
  headers1: { name: string; value: string }[],
  headers2: { name: string; value: string }[]
): boolean => {
  if (headers1.length !== headers2.length) {
    return false;
  }

  [...headers1].sort((header1, header2) =>
    header1.name.localeCompare(header2.name)
  );
  [...headers2].sort((header1, header2) =>
    header1.name.localeCompare(header2.name)
  );

  for (let index = 0; index < headers1.length; index++) {
    const header1 = headers1[index];
    const header2 = headers2[index];

    if (header1.name !== header2.name || header1.value !== header2.value) {
      return false;
    }
  }

  return true;
};

export const checkRequestRecordsEqual = (
  record1: RequestRecord,
  record2: RequestRecord
) => {
  return (
    record1.url === record2.url &&
    record1.method === record2.method &&
    record1.body === record2.body &&
    checkHeadersEqual(record1.headers, record2.headers)
  );
};

import { InterfaceType } from '../../common/types/api-interface-types';
import { HTTPInputs } from './components/http-display/components/http-request-form/types';
import { WSInputs } from './components/ws-display/types';
import { InterfaceInputs } from './types';

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

export const checkRecordsEqual = (
  record1: InterfaceInputs,
  record2: InterfaceInputs
): boolean => {
  if (record1.interfaceType !== record2.interfaceType) {
    return false;
  }

  switch (record1.interfaceType) {
    case InterfaceType.HTTP: {
      const record2Cast = record2 as HTTPInputs;

      return (
        record1.url === record2Cast.url &&
        record1.method === record2Cast.method &&
        record1.body === record2Cast.body &&
        checkHeadersEqual(record1.headers, record2Cast.headers)
      );
    }
    case InterfaceType.WS: {
      const record2Cast = record2 as WSInputs;

      return record1.url === record2Cast.url;
    }
  }

  return false;
};

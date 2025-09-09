import { Select, MenuItem } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { InterfaceInputs, InterfaceType } from '../../../../types';

type InterfaceTypeControlProps<T extends InterfaceInputs> = {
  control: Control<T>;
};

const InterfaceTypeControl = <T extends InterfaceInputs>({
  control,
}: InterfaceTypeControlProps<T>) => {
  return (
    <Controller
      name="interfaceType"
      control={control as unknown as Control<InterfaceInputs>}
      render={({ field }) => (
        <Select required {...field}>
          {Object.keys(InterfaceType).map((interfaceType) => (
            <MenuItem key={interfaceType} value={interfaceType}>
              {InterfaceType[interfaceType as keyof typeof InterfaceType]}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default InterfaceTypeControl;

import { Control, Controller } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { HTTPInputs } from '../../../types';

type BodyControlProps = {
  control: Control<HTTPInputs>;
};

const BodyControl = ({ control }: BodyControlProps) => {
  return (
    <Controller
      name="body"
      control={control}
      render={({ field }) => (
        <Editor
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default BodyControl;

import { Control, Controller } from 'react-hook-form';
import { HTTPInputs } from '../types';
import Editor from '@monaco-editor/react';

type BodyControlProps = {
  control: Control<HTTPInputs, any, HTTPInputs>;
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

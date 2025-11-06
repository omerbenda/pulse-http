import { Control, Controller } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { HTTPInputs } from '../../../types';
import useSettingsStore from '../../../../../../../common/state-stores/settings-store';

type BodyControlProps = {
  control: Control<HTTPInputs>;
};

const BodyControl = ({ control }: BodyControlProps) => {
  const displayTheme = useSettingsStore((state) => state.displayTheme);

  return (
    <Controller
      name="body"
      control={control}
      render={({ field }) => (
        <Editor
          value={field.value}
          theme={displayTheme === 'dark' ? 'vs-dark' : 'light'}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default BodyControl;

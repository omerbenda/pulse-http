import { Box, useTheme } from '@mui/material';
import {
  PanelResizeHandle,
  PanelResizeHandleProps,
} from 'react-resizable-panels';

type ThemedResizeHandleProps = {
  direction: 'horizontal' | 'vertical';
} & PanelResizeHandleProps;

const ThemedResizeHandle = ({
  direction,
  ...props
}: ThemedResizeHandleProps) => {
  const theme = useTheme();

  return (
    <PanelResizeHandle {...props}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.divider}
        width={direction === 'vertical' ? '12px' : '100%'}
        height={direction === 'vertical' ? '100%' : '12px'}
      >
        <Box
          width={direction === 'vertical' ? '4px' : '5%'}
          height={direction === 'vertical' ? '5%' : '4px'}
          minWidth={direction === 'vertical' ? '4px' : '64px'}
          minHeight={direction === 'vertical' ? '64px' : '4px'}
          bgcolor={theme.palette.grey[500]}
          borderRadius={'9999px'}
        />
      </Box>
    </PanelResizeHandle>
  );
};

export default ThemedResizeHandle;

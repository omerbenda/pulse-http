import { Box, useTheme } from '@mui/material';
import { GoGrabber } from 'react-icons/go';
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
        width={direction === 'vertical' ? '16px' : '100%'}
        height={direction === 'vertical' ? '100%' : '16px'}
      >
        <GoGrabber
          size={16}
          style={{ rotate: direction === 'horizontal' ? '90deg' : undefined }}
        />
      </Box>
    </PanelResizeHandle>
  );
};

export default ThemedResizeHandle;

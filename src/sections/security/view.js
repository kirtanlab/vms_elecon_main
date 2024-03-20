import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { mock_security_data } from 'src/_mock/_security';
import { useSettingsContext } from 'src/components/settings';
import SecurityDetailsTable from './securityDetailsTable';

// ----------------------------------------------------------------------

export default function Security() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Security </Typography>
      <Grid maxWidth="xs" marginTop={2}>
        <SecurityDetailsTable
          title="Security Details"
          Categories_Data={mock_security_data}
          tableLabels={[
            { id: 'Sr no', label: 'Sr no' },
            { id: 'First name', label: 'First name' },
            { id: 'Last name', label: 'Last name' },
            { id: 'Address', label: 'address' },
            { id: 'Phone no', label: 'Phone no' },
            { id: 'Shift', label: 'Shift' },
            { id: 'Join date', label: 'Join date' },
            { id: 'Action', label: 'Action' },
          ]}
        />
      </Grid>
      
    </Container>
  );
}

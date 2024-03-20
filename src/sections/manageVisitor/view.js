// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { mock_types_data } from 'src/_mock/_types';
import { useSettingsContext } from 'src/components/settings';
import VisitorDetailsTable from './visitorDetailsTable';

// ----------------------------------------------------------------------

export default function ManageVisitor() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Manage Visitor </Typography>

      <Grid maxWidth="xs" marginTop={2}>
        <VisitorDetailsTable
          title="Visitors Details"
          Categories_Data={mock_types_data}
          tableLabels={[
            { id: 'Sr no', label: 'Sr no' },
            { id: 'First name', label: 'First name' },
            { id: 'Last name', label: 'Last name' },
            { id: 'Email id', label: 'Email id' },
            { id: 'Address', label: 'address' },
            { id: 'Phone no', label: 'Phone no' },
            { id: 'Purpose', label: 'Purpose' },
            { id: 'Company', label: 'Company' },
            { id: 'Department', label: 'Department' },
            { id: 'Emp_id', label: 'Emp_id' },
            { id: 'from', label: 'from' },
            { id: 'to', label: 'to' },
            { id: 'time', label: 'time' },
            { id: 'Action', label: 'Action' },
          ]}
        />
      </Grid>
    </Container>
  );
}

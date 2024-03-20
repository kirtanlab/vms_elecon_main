import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import {  RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { LoadingButton } from '@mui/lab';
// components

function AddSecurity() {
  const [done, setDone] = useState(false);

  const NewTypesSchema = Yup.object().shape({
    first_name: Yup.string().max(50).required('Types Name is required'),
    last_name: Yup.string().max(250).required('Description is required'),
    address: Yup.string().max(50),
    phone_no: Yup.number().max(10),
    join_date:Yup.string().max(50),
    shift:Yup.string().max(50),
    
  });
  const defaultValues = useMemo(
    () => ({
      first_name: '',
      last_name: '',
      
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewTypesSchema),
    defaultValues,
  });
  const popover = usePopover();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={20} md={15}>
        <Card sx={{ p: 1 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="first_name" label="Enter first Name *" />
            <RHFTextField name="last_name" label="Enter last name *" /> 
            <RHFTextField name="address" label="Enter address *" />
            <RHFTextField name="phone_no" label="Enter phone no *" />
            <RHFTextField name="join_date" label="Enter joining date *" />
            <RHFTextField name="shift" label="Enter shift *" />
            
          </Box>
          {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              onSubmit Types has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Security
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddSecurity;

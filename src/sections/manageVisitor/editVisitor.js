import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
// components 

function EditVisitors({ row }) {
  const [done, setDone] = useState(false);

  const NewTypesSchema = Yup.object().shape({
    first_name: Yup.string().max(50).required('Types Name is required'),
    last_name: Yup.string().max(250).required('Description is required'),
    email_id: Yup.string(),
    address: Yup.string().max(50),
    phone_no: Yup.number().max(10),
    purpose : Yup.string(),
    company: Yup.string().max(250),
    department : Yup.string(),
    time : Yup.string(),
    from: Yup.date(),
    to : Yup.date(),
    photo:Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
      first_name: row?.first_name || '',
      last_name:row?.last_name || '' ,
      email_id: row?.email_id || '',
      address: row?.address || '',
      phone_no: row?.phone_no || '',
      purpose : row?.purpose || '',
      company: row?.company || '',
      department : row?.department || '',
      time :row?.time || '',
      from: row?.from || '',
      to : row?.to || '',
    
    }),
    [row]
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
  const getTypes = useCallback(
    (rowData) => {
      try {
        setValue('first_name', rowData?.First_name );
        setValue('last_name', rowData?.last_name);
        setValue('email_id', rowData?.email_id);
        setValue('address', rowData?.address);
        setValue('phone_no', rowData?.phone_no);
        setValue('purpose', rowData?.purpose);
        setValue('company', rowData?.address);
        setValue('department', rowData?.phone_no);
        setValue('time', rowData?.time);
        setValue('from', rowData?.from);
        setValue('to', rowData?.to);
       
      } catch (err) {
        alert('Check your internet connectivity');
        console.log('error in handleSubmit of Add Visitor');
        console.log('error: ', err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    getTypes(row);
  }, [getTypes, row]);
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
            <RHFTextField name="email_id" label="Enter email_id *" />
            <RHFTextField name="address" label="Enter address *" />
            <RHFTextField name="phone_no" label="Enter phone no *" />
            <RHFTextField name="purpose" label="Enter purpose *" />
            <RHFTextField name="company" label="Enter company *" />
            <RHFTextField name="department" label="Enter department *" />
            <RHFTextField name="time" label="Enter time *" />
            <RHFTextField name="from" label="Enter from date *" />
            <RHFTextField name="to" label="Enter to date *" />
            
            
          </Box>
          {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Visitors has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Edit Visitors
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditVisitors.propTypes = {
  row: PropTypes.object,
};

export default EditVisitors;

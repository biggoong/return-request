/** TODO: extract TextField and Select to reuse components */

import React, { FC, useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Form, Field } from 'react-final-form'
import { Modal } from '../Modal';
import { postRequest } from '../../api';
import { validateForm } from './validateForm';

export interface IFormValues {
    "part-serial-number": string;
    reason: string;
    "invoice-number": number;
    comments?: string;
}

interface IProps {
    onRefresh: () => {};
}

export const CreateRequest: FC<IProps> = ({ onRefresh }) => {
    const [openCreateModal, setOpenCreateModal] = useState(true);

    const toggleOpenCreateModal = () => {
        setOpenCreateModal(!openCreateModal);
    };

    const handleSubmitClick = useCallback(async (values: IFormValues) => {
        try {
            const res = await postRequest(values);

            if (res.success) {
                onRefresh();
                setOpenCreateModal(false);
            }
        } catch (e) {
            // TODO: change console log with proper error handle
            console.log(e);
        }
    }, []);

    return (
        <>
            <Button variant="contained" onClick={toggleOpenCreateModal}>Create request</Button>
            <Modal open={openCreateModal} onClose={toggleOpenCreateModal}>
                <Form
                    onSubmit={handleSubmitClick}
                    validate={validateForm}
                    render={({ handleSubmit }) => (
                        <form className='create-form' onSubmit={handleSubmit}>
                            <h2>Return Request</h2>
                            <p>Please provide us some details</p>

                            <Field name="part-serial-number">
                                {({ input, meta }) => (
                                    <div>
                                        <TextField
                                            id={input.name}
                                            label="Please provide us your part's serial number"
                                            variant="outlined"
                                            fullWidth
                                            name={input.name}
                                            value={input.value}
                                            onChange={input.onChange}
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error}
                                            required
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="reason">
                                {({ input, meta }) => (
                                    <div>
                                        <FormControl fullWidth error={meta.touched && meta.error}>
                                            <InputLabel id={`${input.name}-label`}>Select the reason of your return item</InputLabel>
                                            <Select
                                                labelId={`${input.name}-label`}
                                                id={input.name}
                                                value={input.value}
                                                label="Select the reason of your return item"
                                                onChange={input.onChange}
                                                fullWidth
                                                required
                                            >
                                                <MenuItem value='broken'>Broken part</MenuItem>
                                                <MenuItem value='unused'>Unused part</MenuItem>
                                                <MenuItem value='other'>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            </Field>

                            <Field name="invoice-number">
                                {({ input, meta }) => (
                                    <div>
                                        <TextField
                                            id={input.name}
                                            label="Select an Invoice number"
                                            variant="outlined"
                                            fullWidth
                                            name={input.name}
                                            value={input.value}
                                            onChange={input.onChange}
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error}
                                            type="number"
                                            required
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="comments">
                                {({ input, meta }) => (
                                    <div>
                                        <TextField
                                            id={input.name}
                                            label="Comments"
                                            variant="outlined"
                                            fullWidth
                                            name={input.name}
                                            value={input.value}
                                            onChange={input.onChange}
                                            error={meta.touched && meta.error}
                                            helperText={meta.touched && meta.error}
                                            multiline
                                            minRows={3}
                                        />
                                    </div>
                                )}
                            </Field>

                            <div className='button-container'>
                                <Button variant="outlined" onClick={toggleOpenCreateModal}>Cancel</Button>
                                <Button variant="contained" type="submit">Submit</Button>
                            </div>
                        </form>
                    )}
                />
            </Modal>
        </>
    )
}
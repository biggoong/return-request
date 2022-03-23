/** TODO: Consider using MUI DataGrid component for handling large amounts of tabular data. */
/** TODO: Extract details modal to other component and file */

import React, { FC, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IFormValues } from '../CreateRequest';
import { Modal } from '../Modal';

interface IProps {
    data?: IFormValues[],
}

export const BasicTable: FC<IProps> = ({ data }) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [seletedItem, setSelectedItem] = useState<IFormValues>();

    const handleSelectRow = (item: IFormValues) => {
        setSelectedItem(item);
        setOpenDetails(true);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="request table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice number</TableCell>
                            <TableCell align="right">Part's serial number</TableCell>
                            <TableCell align="right">Reason</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.length ? data.map((row) => (
                            <TableRow
                                onClick={() => handleSelectRow(row)}
                                hover
                                key={row['invoice-number']}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row['invoice-number']}
                                </TableCell>
                                <TableCell align="right">{row['part-serial-number']}</TableCell>
                                <TableCell align="right">{row.reason}</TableCell>
                            </TableRow>
                        )) : <p>You don't have any requests</p>}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal with details of the request */}
            <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
                <h4>Invoice number: {seletedItem?.['invoice-number']}</h4>
                <p><strong>Part's serial number:</strong> {seletedItem?.['part-serial-number']}</p>
                <p><strong>Reason:</strong> {seletedItem?.reason}</p>
                {seletedItem?.comments && <p><strong>Comments:</strong> {seletedItem.comments}</p>}
            </Modal>
        </>
    );
};

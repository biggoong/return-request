import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './index';

describe('renders component Table', () => {
    it('renders with no data', () => {
        render(<Table />);
        const nodataText = screen.getAllByText(/You don't have any requests/gi)[0];
        expect(nodataText).toBeInTheDocument();
    });

    it('renders with data', () => {
        const data = [{
            "part-serial-number": 'test',
            reason: 'other',
            "invoice-number": 123456,
            comments: 'my comments',
        }]

        render(<Table data={data} />);
        const dataText = screen.getAllByText(/123456/gi)[0];
        expect(dataText).toBeInTheDocument();

        fireEvent.click(dataText);
        const commentText = screen.getAllByText(/123456/gi)[0];
        expect(commentText).toBeInTheDocument();
    });
})

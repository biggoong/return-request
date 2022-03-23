import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CreateRequest } from './CreateRequest';

jest.mock("../../api", () => {
    return {
        postRequest: jest.fn().mockImplementation(() => {
            return {
                success: true,
            };
        }),
    };
});

describe('renders component CreateRequest', () => {
    it('renders components', () => {
        act(() => { render(<CreateRequest onRefresh={jest.fn()} />) });
        const dataText = screen.getAllByText(/Please provide us some details/gi)[0];
        expect(dataText).toBeInTheDocument();

        const button = screen.getAllByText(/Create request/gi)[0];
        act(() => { fireEvent.click(button) });

        expect(screen.queryByText(/Please provide us some details/gi)).toBeNull();
    });

    it('test submit', () => {
        act(() => { render(<CreateRequest onRefresh={jest.fn()} />) });
        const button = screen.getAllByText(/submit/gi)[0];

        act(() => { fireEvent.click(button) });
    });
})

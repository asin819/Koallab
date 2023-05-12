import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GroupInfoCard from '../../frontend/components/GroupInfoCard';

describe('GroupInfoCard', () => {
    const mockData = {
        GroupId: '114',
        GroupName: 'Test Group',
        CreatorId: '514',
        CreationTime: '2023-05-12',
        GroupStatus: 'Active',
        ModalStateFunction: jest.fn(),
    };

    it('renders the group information', () => {
        render(<GroupInfoCard {...mockData} />);

        expect(screen.getByText('Test Group')).toBeInTheDocument();
        expect(screen.getByText('ID: 114')).toBeInTheDocument();
        expect(screen.getByText('Creator ID: 514')).toBeInTheDocument();
        expect(screen.getByText('Created at: 2023-05-12')).toBeInTheDocument();
        expect(screen.getByText('Status: Active')).toBeInTheDocument();
    });

    it('renders the close button', () => {
        render(<GroupInfoCard {...mockData} />);
        const closeButton = screen.getByRole('button', { name: 'Close' });
    });

    it('calls the ModalStateFunction when Close button is clicked', () => {
        render(<GroupInfoCard {...mockData} />);
        const closeButton = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeButton);
        expect(mockData.ModalStateFunction).toHaveBeenCalledWith(false);
    });

    it('renders the disband button', () => {
        render(<GroupInfoCard {...mockData} />);
        expect(screen.getByRole('button', { name: 'Disband' })).toBeInTheDocument();
    });

    //TODO: Test the DISBAND button

});

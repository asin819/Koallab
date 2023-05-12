import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GroupUserCard } from '../../frontend/components/GroupUserCard';

describe('GroupUserCard', () => {
    const mockData = {
        Username: 'test user',
        editingState: true,
    };

    it('renders the username', () => {
        render(<GroupUserCard {...mockData} />);
        expect(screen.getByText('test user')).toBeInTheDocument();
    });

    it('renders the TrashIcon when editingState is true', () => {
        render(<GroupUserCard {...mockData} />);
        const trashIcon = screen.getByTitle("Trash Icon");
        expect(trashIcon).toBeInTheDocument();
    });

    it('does not render the TrashIcon when editingState is false', () => {
        render(<GroupUserCard {...{ ...mockData, editingState: false }} />);
        const trashIcon = screen.queryByTitle("Trash Icon");
        expect(trashIcon).not.toBeInTheDocument();
    });
});


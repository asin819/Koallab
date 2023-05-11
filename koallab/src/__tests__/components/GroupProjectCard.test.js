import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GroupProjectCard } from '../../frontend/components/GroupProjectCard';

describe('GroupProjectCard', () => {
    const mockData = {
        ProjectName: 'Test Project',
        Progress: 50,
    };

    it('renders the project name', () => {
        render(<GroupProjectCard {...mockData} />);
        expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('renders the progress bar with correct width(50)', () => {
        render(<GroupProjectCard {...mockData} />);
        const progressBarFill = screen.getByTitle("progress bar");
        expect(progressBarFill).toHaveStyle('width: 50%');
    });

    it('renders the progress bar with correct width(20)', () => {
        mockData.Progress = 20;

        render(<GroupProjectCard {...mockData} />);
        const progressBarFill = screen.getByTitle("progress bar");
        expect(progressBarFill).toHaveStyle('width: 20%');
    });
});

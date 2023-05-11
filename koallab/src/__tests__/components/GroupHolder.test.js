import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GroupHolder } from '../../frontend/components/GroupHolder';

describe('GroupHolder', () => {
    const mockData = {
        UserName: 'Test User',
        ProjectData: [
            {
                Name: 'Project 1',
                progress: 50
            },
            {
                Name: 'Project 2',
                progress: 75
            }
        ],
        editingState: true,
    };

    it('renders the username', () => {
        render(<GroupHolder 
            UserName={mockData.UserName} 
            ProjectData={mockData.ProjectData} 
            editingState={mockData.editingState} 
        />);
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    // You can't directly test the props of child components with react-testing-library.
    // You can only check whether the child components are rendered or not.

    it('renders the project layout component', () => {
        render(<GroupHolder 
            UserName={mockData.UserName} 
            ProjectData={mockData.ProjectData} 
            editingState={mockData.editingState} 
        />);
        const projectLayout = screen.getByTitle("project layout");
        expect(projectLayout).toBeInTheDocument();
    });

    it('renders the content of project layout', () => {
        render(<GroupHolder 
            UserName={mockData.UserName} 
            ProjectData={mockData.ProjectData} 
            editingState={mockData.editingState} 
        />);
        expect(screen.getByText('Project 1')).toBeInTheDocument();
        expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
});

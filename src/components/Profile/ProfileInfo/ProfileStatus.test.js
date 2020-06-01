import React from 'react';
import { create } from "react-test-renderer"
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Add new status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Add new status");
    })
})
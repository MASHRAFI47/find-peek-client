import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Root from '../layout/Root';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
]);

export default router;
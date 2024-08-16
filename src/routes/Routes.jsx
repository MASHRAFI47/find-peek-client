import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Root from '../layout/Root';
import AddProduct from '../pages/Admin/AddProduct';
import Register from '../pages/Register/Register';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home /></PrivateRoute>
            },
            {
                path: "/add-product",
                element: <AddProduct />
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
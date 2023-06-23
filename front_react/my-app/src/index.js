import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Root, {loader as rootLoader } from './routes/root';
import Error from './routes/error';
import Login from './routes/login';
import Register from './routes/register';
import Products, {loader as productsLoader } from './routes/products';
import ProductDetail, {loader as productDetailLoader } from './routes/product-detail';
import ShoppingCart from './routes/shopping-cart';
import OrderFulfillment from './routes/order-fulfillment';
import RootLogin from './routes/root-login';
import AddProduct from './routes/add-product';
import UpdateProduct from './routes/update-product';
import TestLogin from './routes/test-login';
import { action as productAction } from './routes/product';
import UserInformationManagement from './routes/user-information-management';
import OrderList from './routes/order-list';
import OrderDetail from './routes/order-detail';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#222222',
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      // {
      //   path: "/",
      //   element: <TestLogin />,
      // },
      {
        path: "Products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "Product-detail/:id/",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: "Shopping-cart",
        element: <ShoppingCart />,
      },
      {
        path: "Order-fulfillment",
        element: <OrderFulfillment />,
      },
      {
        path: "Add-product",
        element: <AddProduct />,
      },
      {
        path: "Update-product",
        element: <UpdateProduct />,
      },
      {
        path: "User-information-management",
        element: <UserInformationManagement />,
      },
      {
        path: "Order-list",
        element: <OrderList />,
      },
      {
        path: "Order-detail",
        element: <OrderDetail />,
      }
    ]
  },
  {
    path: "RootLogin",
    element: <RootLogin />,
    errorElement: <Error />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

reportWebVitals();
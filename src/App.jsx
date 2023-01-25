import { useToast } from "@chakra-ui/toast";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchCountries } from "./actions/geolocations";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import Root from "./Pages/Root";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { data, error } = useSelector((state) => state.geolocations);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/country/:country", element: <Detail /> },
      ],
    },
  ]);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchCountries());
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      toast({
        title: "An error occurred.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);
  return <RouterProvider router={router} />;
}

export default App;

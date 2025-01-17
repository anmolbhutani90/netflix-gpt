import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Browse from "./components/Browse";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";



function App() {

  const router = createBrowserRouter([{
      path:"/",
      element:<Login/>
  },
  {
      path:"/browse",
      element:<Browse/>
  }
])
  return (
    <Provider store={appStore}>
    <RouterProvider router={router}>
      <Body/>
    </RouterProvider>
    </Provider>
  );
}

export default App;

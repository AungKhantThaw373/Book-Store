import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import About from '../components/About';
import Blog from '../components/Cart';
import ReviewBook from "../shop/ReviewBook";
import Dashboard from "../dashboard/Dashboard";
import ManageBooks from "../dashboard/ManageBooks";
import UploadBook from "../dashboard/UploadBook";
import EditBooks from "../dashboard/EditBooks";
import Dashboardlayout from "../dashboard/Dashboardlayout";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Cart from "../components/Cart";
import PremiumSubscription from "../components/PremiumSubscription";
import ProfileSettings from "../components/ProfileSetting";
import { UserProvider } from '../contects/UserContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider> {/* Wrap the entire app with UserProvider */}
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/reviewbook/:id',
        element: <ReviewBook />,
        loader: ({ params }) => fetch(`https://bookstore-project-ues5.onrender.com/api/books/${params.id}`)
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <Dashboardlayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />
      },
      {
        path: "/admin/dashboard/edit-allBooks/:id",
        element: <EditBooks />,
        loader: ({ params }) => fetch(`https://bookstore-project-ues5.onrender.com/api/books/${params.id}`)
      }

    ]
  }, {
    path: "/sign-up",
    element: <Signup />
  }, {
    path: "/login",
    element: <Login />
  }, {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/profile/settings",
    element: <ProfileSettings />
  },
  {
    path: "/premium-subscription",
    element: <PremiumSubscription />
  }
]);

export default router;

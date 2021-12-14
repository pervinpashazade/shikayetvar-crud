import Home from "./components/pages/Home";
import PostDetail from "./components/pages/PostDetail";
import Profile from "./components/pages/Profile";

const routes = [
    {
        path: "/post",
        component: Home,
        exact: true
    }, {
        path: "/post/:id",
        component: PostDetail,
        exact: true
    }, {
        path: "/profile/:id",
        component: Profile,
        exact: true
    }
]
export default routes;
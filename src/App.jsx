import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import UserAccountList from "./pages/Admin/UserAccountList";
import AdminPostList from "./pages/Admin/PostList";
import UpdatePost from "./pages/UpdatePost";
import AdminPostDetail from "./components/Admin/AdminPostDetail";
import ChatConversation from "./components/Chat/ChatRight/ChatConversation";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="posts/:id" element={<PostDetail />} />

      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="posts/update/:id" element={<UpdatePost />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="admin/users" element={<UserAccountList />}></Route>
        <Route path="admin/posts" element={<AdminPostList />}></Route>
        <Route path="admin/posts/:id" element={<AdminPostDetail />}></Route>
        <Route path="chat" element={<Chat />}>
          <Route path=":userId" element={<ChatConversation />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

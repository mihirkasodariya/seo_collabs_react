// routes.js
import SignUpPage from "../pages/Login";
import RegisterPage from "../pages/Register";
// import CategoryTable from "../pages/Category";
// import SubCategory from "../pages/SubCategory";
import HomePage from "../pages/Home/index";
import { AppSidebar } from "../components/Sidebar/Sidebar";
import DashboardPage from "../pages/Dashboard/index";
import PricingPage from "../components/pricing/PricingPage";
import ForgetPasswordPage from "../pages/Forget-Password";
import ProfilePage from "../pages/Profile";
import WebsitesPage from "../pages/Websites";
import LinkExchangePage from "../pages/LinkExchange";
import ChatPage from "../pages/Chat";
import ReferralsPage from "../pages/Referrals";
import SupportPage from "../pages/Support";
import NotFoundPage from "../pages/PageNotFound";

export const ROUTES = [
];
export const REJECT_ROUTES = [
  { path: "/", exact: true, component: <HomePage /> },
  { path: "/forget-password", exact: true, component: <ForgetPasswordPage /> },
  { path: "/profile", exact: true, component: <ProfilePage /> },
  { path: "/register", exact: true, component: <RegisterPage /> },
  { path: "/login", exact: true, component: <SignUpPage /> },
  { path: "/pricing", exact: true, component: <PricingPage /> },

  { path: "*", exact: false, component: <NotFoundPage /> },

];

export const REQUIRED_ROUTES = [
  { path: "/dashboard", exact: true, component: <DashboardPage /> },
  { path: "/websites", exact: true, component: <WebsitesPage /> },
  { path: "/link-exchange", exact: true, component: <LinkExchangePage /> },
  { path: "/chat", exact: true, component: <ChatPage /> },
  { path: "/referrals", exact: true, component: <ReferralsPage /> },
  { path: "/support", exact: true, component: <SupportPage /> },

];
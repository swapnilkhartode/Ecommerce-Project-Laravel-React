import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import EditProfile from '../pages/EditProfile';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/resetPassword';
import ProtectedRoute from './ProtectedRoute';
import OrdersDashboard from '../components/Order/OrderDashboard';
import PaymentMethodsDashboard from '../pages/PaymentMethod';
import WishlistDashboard from '../pages/WishList';
import MyCart from '../components/cart/MyCart';
import TrackOrderDashboard from '../components/Order/TrackOrderDashboard';
import HelpCenterDashboard from '../pages/HelpCenter';
import ReturnsRefundsDashboard from '../pages/ReturnRefunds';
import ProductListing from '../pages/ProductListing';
import ManageBanner from '../components/admin/ManageBanner';
import CategoryPreviewPage from '../pages/CategoryPreviewPage';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productdetails" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>

      <Route path="/orders" element={ <OrdersDashboard />}/>
      <Route path="/payment-methods" element={<PaymentMethodsDashboard />} />
      <Route path="/wishlist" element={ <WishlistDashboard />}/>
      <Route path="/cart" element={ <MyCart />}/>
      <Route path="track-order" element={ <TrackOrderDashboard />}/>
      <Route path="support" element={ <HelpCenterDashboard />}/>
      <Route path="returns" element={ <ReturnsRefundsDashboard />}/>
      <Route path="product-listing" element={ <ProductListing />} />
      <Route path="banners" element={ <ManageBanner />} />
      <Route path="/category/:id" element={<CategoryPreviewPage />} />

      <Route path="/editprofile"  element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
      <Route path="*" element={<NotFound />} />
        
    </Routes>
      
  );
}
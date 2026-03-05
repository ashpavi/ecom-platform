import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
         <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

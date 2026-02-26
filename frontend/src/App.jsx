import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import { CartProvider } from "./context/cartContext";
import ScrollToTop from "./utils/scrollToTop";

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

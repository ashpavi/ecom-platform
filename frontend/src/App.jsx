import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

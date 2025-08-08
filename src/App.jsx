import React from "react";
import Routes from "./Routes";
import { CartProvider } from "./contexts/CartContext";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;

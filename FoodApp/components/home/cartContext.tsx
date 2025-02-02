// // context/CartContext.tsx
// import React, { createContext, useContext, useState } from 'react';

// type CartItem = {
//     id: number;
//     dish_id: number;
//     name: string;
//     price: number;
//     date: string;
//     image: { uri: string };
//     items: number;
//     selected: boolean;
// }

// type CartContextType = {
//     selectedItems: CartItem[];
//     setSelectedItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
//     clearSelectedItems: () => void;
// };


// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//     const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

//     const clearSelectedItems = () => {
//         setSelectedItems([]);
//     };

//     return (
//         <CartContext.Provider value={{ selectedItems, setSelectedItems, clearSelectedItems }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (context === undefined) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };

import React, { createContext, useContext, useState } from 'react';

type CartContextType = {
  selectedItems: any[];
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
  clearSelectedItems: () => void; // Thêm thuộc tính này
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const clearSelectedItems = () => {
    setSelectedItems([]); // Đặt selectedItems thành mảng rỗng
  };

  return (
    <CartContext.Provider value={{ selectedItems, setSelectedItems, clearSelectedItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

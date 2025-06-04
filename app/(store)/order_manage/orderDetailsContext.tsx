import { createContext, useContext, useState } from 'react';

type OrderContextType = {
    selectedOrder: any;
    setSelectedOrder: (order: any) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function OrderProvider({ children }: { children: React.ReactNode }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <OrderContext.Provider value={{ selectedOrder, setSelectedOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrderContext() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
}

export default OrderProvider;
export { OrderContext };
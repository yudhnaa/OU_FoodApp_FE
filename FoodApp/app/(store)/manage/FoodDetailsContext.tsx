import { createContext, useContext, useState } from 'react';

type FoodContextType = {
    selectedFood: any;
    setSelectedFood: (food: any) => void;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

function FoodProvider({ children }: { children: React.ReactNode }) {
    const [selectedFood, setSelectedFood] = useState(null);

    return (
        <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
            {children}
        </FoodContext.Provider>
    );
}

export function useFoodContext() {
    const context = useContext(FoodContext);
    if (context === undefined) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
}

export default FoodProvider;
export { FoodContext };
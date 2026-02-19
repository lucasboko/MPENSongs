import { createContext, useContext}  from 'react';
import { ContextType } from '../types/types';


export const AppContext = createContext<ContextType | null>(null);
export const useAppContext = () => useContext(AppContext) as ContextType;
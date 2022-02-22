import { useMemo } from 'react';
import { useAppSelector } from './state';

export const useAuth = () => {
    const user = useAppSelector(state => state.auth);
    return useMemo(() => (user), [user]);
}
import { getTotalOrders } from './controller/GetTotalOrders';

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: 'orders/total',
        method: 'get',
        action: getTotalOrders
    }
];

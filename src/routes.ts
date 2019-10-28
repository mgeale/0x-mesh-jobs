import {getTotalOrders} from "./controller/GetTotalOrders";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/totalOrders",
        method: "get",
        action: getTotalOrders
    }
];
import {Request, Response} from "express";
import {getManager} from "typeorm";
import {TotalOrders} from "../entity/TotalOrders";

/**
 * Loads all posts from the database.
 */
export async function getTotalOrders(request: Request, response: Response) {
    const totalOrdersRepository = getManager().getRepository(TotalOrders);
    const totalOrders = await totalOrdersRepository.find();
    response.send(totalOrders);
}
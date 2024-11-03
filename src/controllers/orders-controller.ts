import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "../database/databaseConfig";
import { AppError } from "../utils/AppError"


class OrdersController { 

  async index(request: Request, response: Response, next: NextFunction){

    try {
      
      const paramsSchema  = z.object({
        table_session_id: z.string().transform(Number).refine(value => !isNaN(value), { message: "table_session_id must be a number" })
      })

      const { table_session_id } = paramsSchema.parse(request.params);
    
      const orders = await db("orders")
      .select(
        "orders.id",
        "orders.table_session_id", 
        "orders.product_id", 
        "products.name",
        "orders.price",
        "orders.quantity",
        db.raw("(orders.price * orders.quantity) AS total"),
        "orders.created_at",
        "orders.updated_at"
      )
      .join("products", "products.id", "orders.product_id")
      .where({ table_session_id }).orderBy("orders.created_at", "desc")
  
      response.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
  try {
    const bodySchema = z.object({
      table_session_id: z.number(),
      product_id: z.number(),
      quantity: z.number()
    });

    const { table_session_id, product_id, quantity } = bodySchema.parse(request.body);

    const session = await db<TablesSessionsRepository>("tables_sessions").where({id: table_session_id}).first()

    if(!session){
      throw new AppError("Session table not found")
    }

    if(session.closed_at){
      throw new AppError("This table is closed")
    }

    const product = await db<ProductRepository>("products").where({id: product_id}).first()

    if(!product){
      throw new AppError("Product not found")
    }

    await db<OrderRepository>("orders").insert({table_session_id, product_id, quantity, price: product.price})

    response.status(201).json();
  } catch (error) {
    next(error);
  }
}

async show(request: Request, response: Response, next: NextFunction) {
  try {
    const paramsSchema = z.object({
      table_session_id: z.string().transform(Number).refine(value => !isNaN(value), { message: "table_session_id must be a number" })
    });

    const { table_session_id } = paramsSchema.parse(request.params);

    const order = await db<OrderRepository>("orders")
      .select(
        db.raw("COALESCE(SUM(orders.price * orders.quantity), 0 ) AS total "),
        db.raw("COALESCE(SUM(orders.quantity), 0 ) AS itens ")
      ).where({ table_session_id }).first();

    if (!order) {
      throw new AppError("Order not found");
    }

    response.json(order);
  } catch (error) {
    next(error);
  }
}
}

export { OrdersController }
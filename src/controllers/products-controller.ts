import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "../database/databaseConfig";
import { AppError } from "../utils/AppError"


class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await db("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`);

      response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);
      await db("products").insert({ name, price });

      response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().transform((value) => Number(value)).refine((value) => !isNaN((value)), {message: "id must be a number"})

      });
      const bodySchema = z.object({
        name: z.string({message: "name must be a string"}).trim().min(6, {message: "the minimum is 6 characters"}),
        price: z.number({message: "name must be a number"}).gt(0),
      });

      const { id } = paramsSchema.parse(request.params);
      const { name, price } = bodySchema.parse(request.body);

      const product = await db<ProductRepository>("products").select().where({id}).first()

      if(!product){
        throw new AppError("Product not found")
      }
      

      await db("products").update({ name, price, updated_at: db.fn.now() }).where({ id });
    

      response.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {

    try {
      const paramsSchema = z.object({
        id: z.string().transform((value) => Number(value)).refine((value) => !isNaN((value)), {message: "id must be a number"})
      })

      const {id} =  paramsSchema.parse(request.params);
      

      const product = await db<ProductRepository>("products").select().where({id}).first()

      if(!product){
        throw new AppError("Product not found")
      }
      
      await db<ProductRepository>("products").delete().where({id})
      response.json({message: `the product with id ${id} was removed`})
    } catch (error) {
      next(error)
    }
  }  
}

export { ProductsController };

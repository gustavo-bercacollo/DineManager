import { Request, Response, NextFunction } from "express";
import { db } from "../database/databaseConfig";
import { z } from "zod";
import { AppError } from "../utils/AppError";

class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tablesSessions = await db<TablesSessionsRepository>("tables_sessions")
        .select()
        .orderBy("closed_at");

      response.status(200).json(tablesSessions);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number()
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await db<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("This table is already open", 400);
      }

      await db<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: db.fn.now()
      });

      response.status(201).json({ message: "Session created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string()
        .transform(value => Number(value))
        .refine(value => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const session = await db<TablesSessionsRepository>("tables_sessions").where({ id }).first();

      if (!session) {
        throw new AppError("Session not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("This session table is already closed", 400);
      }

      await db<TablesSessionsRepository>("tables_sessions")
        .update({ closed_at: db.fn.now() })
        .where({ id });

      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };

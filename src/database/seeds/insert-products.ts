import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("products ").insert([
        
        { name: "tropical burrito ", price: 30},
        { name: "steak tacos ", price: 10},
        { name: "paleta ", price: 8},
        { name: "nachos ", price: 19.90},
        { name: "drinks ", price: 6.99},
        { name: "brownie ", price: 6.99},
    
    ]);
};

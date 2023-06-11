import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Establishment } from "../entity/Establishment";
import { Stock } from "../entity/Stock";

export class StockController {
    
    static async create(req: Request, res: Response) {
        const establishment_id = req.params.establishment_id;
        const { code } = req.body;

        try {
            const establishmentRespository = AppDataSource.getRepository(Establishment)
            const establishment = await establishmentRespository
                .createQueryBuilder("establishment")
                .select("establishment")
                .where("id = :id", { id: establishment_id})
                .getOne();
            if (!establishment) {
                return res.status(500).json({ message: "Estabelecimento não existe" })
            }

            const stockRepository = AppDataSource.getRepository(Stock);
            const newStock = await stockRepository
                .createQueryBuilder("stock")
                .insert()
                .into("stock")
                .values(
                    { code: code, establishment: establishment}
                )
                .execute();

            res.status(201).json({ newStock, success: true});
        } catch (error) {
            res.status(500).json({ error, success: false });
        };
    }

    static async findOneById(req: Request, res: Response){
        const id = req.params.id;

        try {
            const stockRepository = AppDataSource.getRepository(Stock);
            const stock = await stockRepository
                .createQueryBuilder("stock")
                .select("stock").addSelect("establishment.id")
                .leftJoin("stock.establishment", "establishment")
                .where("stock.id = :id", { id: id})
                .getOne();

            res.status(201).json({ stock, success: true});
        } catch (error){
            res.status(500).json({ error, success: false });
        };
    }

    static async findAll(req: Request, res: Response){
        try {
            const stockRepository = AppDataSource.getRepository(Stock);
            const stock = await stockRepository
                .createQueryBuilder("stock")
                .select("stock").addSelect("establishment.id")
                .leftJoin("stock.establishment", "establishment")
                .getMany();

            res.status(201).json({ stock, success: true});
        } catch (error){
            res.status(500).json({ error, success: false });
        };
    }

    static async updateOne(req: Request, res: Response){
        const id = req.params.id;
        const establishment_id = req.params.establishment_id;
        const { code } = req.body;

        try{
            const establishmentRespository = AppDataSource.getRepository(Establishment)
            const establishment = await establishmentRespository
                .createQueryBuilder("establishment")
                .select("establishment")
                .where("id = :id", { id: establishment_id})
                .getOne();
            if (!establishment) {
                return res.status(500).json({ message: "Estabelecimento não existe" })
            }

            const stockRepository = AppDataSource.getRepository(Stock);
            const stockToUpdate = await stockRepository
                .createQueryBuilder("stock")
                .update("stock")
                .set({ code: code, establishment: establishment})
                .where("id = :id", { id: id})
                .execute()
            
                res.status(200).json({ stockToUpdate, success: true });
        } catch(error){
            res.status(500).json({ error, success: false });
        };
    }

    static async delete(req: Request, res: Response){
        const id = req.params.id;

        try {
            const stockRepository = AppDataSource.getRepository(Stock);
            await stockRepository
              .createQueryBuilder("stock")
              .delete()
              .from("stock")
              .where("id = :id", {id: id})
              .execute();
            
            res.status(200).json({ success: true });
          } catch (error) {
            res.status(500).json({ error, success: false });
          };
    };
}
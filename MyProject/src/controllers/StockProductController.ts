import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Stock_Product } from "../entity/Stock_Product";
import { Stock } from "../entity/Stock";
import { Product } from "../entity/Product";


export class stockProductController {
    static async addToStock(req: Request, res: Response){
        const stock_id = req.params.stock_id;
        const product_id = req.params.product_id;
        const AddQuantity = req.params.quantity;

        try {
            const stockRepository = AppDataSource.getRepository(Stock)
            const stock = await stockRepository
                .createQueryBuilder("stock")
                .select("stock")
                .where("stock.id = :stock_id", { stock_id: stock_id})
                .getOne();

            if(!stock){
                return res.status(500).json({ message: "Stock não existe!", success: false });
            }

            const productRepository = AppDataSource.getRepository(Product)
            const product = await productRepository
                .createQueryBuilder("product")
                .select("product")
                .where("product.id = :product_id", { product_id: product_id})
                .getOne();

            if(!product){
                return res.status(500).json({ message: "Produto não existe!", success: false });
            }

            const StockProductRepository = AppDataSource.getRepository(Stock_Product)
            const stock_product = await StockProductRepository
                .createQueryBuilder("stock_product")
                .select("stock_product")
                .where("stock_product.stock = :stock_id", { stock_id: stock_id})
                .andWhere("stock_product.product = :product_id", { product_id: product_id})
                .getOne();
                
            if(!stock_product){
                const newStockProduct = await StockProductRepository
                    .createQueryBuilder("stock_product")
                    .insert()
                    .into("stock_product")
                    .values(
                        { quantity: AddQuantity, stock: stock, product: product}
                    )
                    .execute();

                    res.status(200).json({ newStockProduct, success: true });
            } else {
                const newStockProduct = await StockProductRepository
                    .createQueryBuilder("stock_product")
                    .update("stock_product")
                    .set(
                        { quantity: stock_product.quantity + parseInt(AddQuantity) }
                    )
                    .where("stock_product.id = :id", { id: stock_product.id})
                    .execute()

                res.status(200).json({ newStockProduct, success: true });
            }
        } catch(error){
            res.status(500).json({ error, success: false });
        };
    };
}
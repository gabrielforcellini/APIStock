import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { Supplier } from "../entity/Supplier";

export class supplierProductController {

    static async associate(req: Request, res: Response) {
        const supplier_id = req.params.supplier_id;
        const product_id = req.params.product_id;

        try {
            const productRepository = AppDataSource.getRepository(Product)
            const product = await productRepository
                .createQueryBuilder("product")
                .select("product")
                .where("product.id = :product_id", { product_id: product_id })
                .getOne();

            if (!product) {
                return res.status(500).json({ message: "Produto não existe!", success: false });
            }

            const supplierRepository = AppDataSource.getRepository(Supplier)
            const supplier = await supplierRepository
                .createQueryBuilder("supplier")
                .select("supplier")
                .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
                .getOne();

            if (!supplier) {
                return res.status(500).json({ message: "Fornecedor não existe!", success: false });
            }

            const supplierProductRepository = AppDataSource.getRepository(Supplier);
            const supplier_product = await supplierProductRepository
                .createQueryBuilder()
                .insert()
                .into("supplier_product")
                .values(
                    { supplierId: supplier, productId: product }
                )
                .execute();

            res.status(200).json({ supplier_product, success: true });
        } catch (error) {
            return res.status(500).json({ error, success: false });
        };
    };
}
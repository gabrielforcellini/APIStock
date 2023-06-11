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
            let supplier = await supplierRepository
                .createQueryBuilder("supplier")
                .select("supplier")
                .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
                .getOne();

            if (!supplier) {
                return res.status(500).json({ message: "Fornecedor não existe!", success: false });
            }

            const supplier_product = await supplierRepository
                .createQueryBuilder("supplier")
                .leftJoinAndSelect("supplier.products", "product")
                .where("product.id = :product_id", { product_id: product_id })
                .andWhere("supplier.id = :supplier_id", { supplier_id: supplier_id })
                .getOne();

            if (supplier_product) {
                return res.status(500).json({ message: "Esse produto já está cadastrado para esse fornecedor!", success: false });
            } else {
                supplier.products.push();
                res.status(200).json({ supplier, success: true });
            }
        } catch (error) {
            return res.status(500).json({ error, success: false });
        };
    };

    static async findProductsBySupplier(req: Request, res: Response) {
        const supplier_id = req.params.supplier_id;

        try {
            const supplierRepository = AppDataSource.getRepository(Supplier)
            const supplier = await supplierRepository
                .createQueryBuilder("supplier")
                .select("supplier")
                .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
                .getOne();

            if (!supplier) {
                return res.status(500).json({ message: "Fornecedor não existe!", success: false });
            }

            const suppliers = await AppDataSource.manager
                .createQueryBuilder()
                .select("supplier_product")
                .leftJoin("supplier_product.supplierId", "supplier")
                .leftJoin("supplier_product.productId", "product")
                .where("supplier_product.supplierId = :supplier_id", { supplier_id: supplier_id })
                .getMany();

            res.status(200).json({ suppliers, success: true });
        } catch (error) {
            return res.status(500).json({ error, success: false });
        };
    };
}
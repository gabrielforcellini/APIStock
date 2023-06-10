import { Product } from '../entity/Product';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Category } from '../entity/Category';

export class ProductController {
  static async register(req: Request, res: Response) {
    const category_id  = req.params.category_id;
    const { name, part_number, bar_code, buy_price, sale_price, active_status, brand } = req.body;

    try {
      const categoryRepository = AppDataSource.getRepository(Category)
      const category = await categoryRepository
        .createQueryBuilder("category")
        .select("category")
        .where("id = :id", { id: category_id})
        .getOne();
      
      if(!category){
        return res.status(500).json({ message: "Categoria não existe" })
      }

      const productRepository = AppDataSource.getRepository(Product);
      const newProduct = productRepository
        .createQueryBuilder("product")
        .insert()
        .into("product")
        .values(
          { 
            name: name,
            part_number: part_number,
            bar_code: bar_code,
            buy_price: buy_price,
            sale_price: sale_price,
            active_status: active_status,
            brand: brand,
            category: category
          }
        )
        .execute();

      res.status(201).json({ newProduct, success: true});
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository
        .createQueryBuilder("product")
        .select("product").addSelect("category")
        .leftJoin("product.category", "category")
        .where("product.id = :id", { id: id})
        .getOne();

      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const productRespository = AppDataSource.getRepository(Product);
      const product = await productRespository
        .createQueryBuilder("product")
        .select("product").addSelect("category")
        .leftJoin("product.category", "category")
        .getMany();

      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;
    const { name, part_number, bar_code, buy_price, sale_price, category, active_status, brand } = req.body;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const productToUpdate = await productRepository
        .createQueryBuilder("product")
        .update("product")
        .set(
          {
            name: name,
            part_number: part_number,
            bar_code: bar_code,
            buy_price: buy_price,
            sale_price: sale_price,
            active_status: active_status,
            brand: brand,
          }
        )
        .where("id = :id", { id: id})
        .execute();
        
      res.status(200).json({ productToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      await productRepository
        .createQueryBuilder("product")
        .delete()
        .from("product")
        .where("id = :id", { id: id})
        .execute();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
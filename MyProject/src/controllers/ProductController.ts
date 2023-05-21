import { Product } from '../entity/Product';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class ProductController {
  static async register(req: Request, res: Response) {
    const {
      name,
      part_number,
      bar_code,
      buy_price,
      sale_price,
      category,
      supplier,
      active_status,
      create_date,
      update_date,
      brand,
    } = req.body;

    const product = new Product();
    product.name = name;
    product.part_number = part_number;
    product.bar_code = bar_code;
    product.buy_price = buy_price;
    product.sale_price = sale_price;
    product.category = category;
    product.suppliers = supplier;
    product.active_status = active_status;
    product.create_date = create_date;
    product.update_date = update_date;
    product.brand = brand;

    try {
      const newProduct = await AppDataSource.manager.save(product);
      res.status(201).json({
        newProduct,
        success: true
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const productRespository = AppDataSource.getRepository(Product);
      const product = await productRespository.find();
      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      name,
      part_number,
      bar_code,
      buy_price,
      sale_price,
      category,
      supplier,
      active_status,
      create_date,
      update_date,
      brand,
    } = req.body;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const productToUpdate = await productRepository.findOneBy({
        id: parseInt(id)
      });

      productToUpdate.name = name;
      productToUpdate.part_number = part_number;
      productToUpdate.bar_code = bar_code;
      productToUpdate.buy_price = buy_price;
      productToUpdate.sale_price = sale_price;
      productToUpdate.category = category;
      productToUpdate.suppliers = supplier;
      productToUpdate.active_status = active_status;
      productToUpdate.create_date = create_date;
      productToUpdate.update_date = update_date;
      productToUpdate.brand = brand;

      await productRepository.save(productToUpdate);
      res.status(200).json({ productToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const productToDelete = await productRepository.findOneBy({
        id: parseInt(id)
      });
      await productRepository.remove(productToDelete);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
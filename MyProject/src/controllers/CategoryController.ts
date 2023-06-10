import { Request, Response } from 'express';
import { Category } from '../entity/Category';
import { AppDataSource } from '../data-source';

export class CategoryController {

  static async register(req: Request, res: Response) {
    const { code, description } = req.body;

    try {
      const categoryRepository = AppDataSource.getRepository(Category)
      const newCategory = await categoryRepository
        .createQueryBuilder("category")
        .insert()
        .into("category")
        .values(
          { code: code, description: description }
        )
        .execute();

      res.status(200).json({ newCategory, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const category = await categoryRepository
        .createQueryBuilder("category")
        .select("category")
        .where("id = :id", { id: id })
        .getOne();

      res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const categoryRespository = AppDataSource.getRepository(Category);
      const categories = await categoryRespository
        .createQueryBuilder("category")
        .select("category")
        .getMany();

      res.status(200).json({ categories, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const { code, description } = req.body;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categoryToUpdate = await categoryRepository
        .createQueryBuilder("category")
        .update("category")
        .set(
          { code: code, description: description }
        )
        .where("id = :id", { id: id })
        .execute();

      res.status(200).json({ categoryToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categoryToUpdate = await categoryRepository
        .createQueryBuilder("category")
        .delete()
        .from("category")
        .where("id = :id", { id: id })
        .execute();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
import { Request, Response } from 'express';
import { Category } from '../entity/Category';
import { AppDataSource } from '../data-source';

export class CategoryController {
  /**
   * Register an category
   */
  static async register(req: Request, res: Response) {
    const {
      code,
      description
    } = req.body;

    const category = new Category();
    category.code = code;
    category.description = description;

    try {
      const newCategory = await AppDataSource.manager.save(category);
      res.status(200).json({ newCategory, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  /**
   * Find a category by id
   */
  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const category = await categoryRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  /**
   * Find all categories from database
   */
  static async findAll(req: Request, res: Response) {
    try {
      const categoryRespository = AppDataSource.getRepository(Category);
      const categories = await categoryRespository.find();
      res.status(200).json({ categories, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  /**
   * Update an category by id
   */
  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      code,
      description
    } = req.body;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categoryToUpdate = await categoryRepository.findOneBy({
        id: parseInt(id)
      });
      categoryToUpdate.code = code;
      categoryToUpdate.description = description;
      await categoryRepository.save(categoryToUpdate);
      res.status(200).json({ categoryToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  };

  /**
   * Delete an category by id
   */
  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categoryToUpdate = await categoryRepository.findOneBy({
        id: parseInt(id)
      });
      await categoryRepository.remove(categoryToUpdate);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
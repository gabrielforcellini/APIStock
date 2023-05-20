import { Request, Response } from 'express';
import { Category } from '../entity/Category';
import { AppDataSource } from '../data-source';

export class CategoryController {
  static async register(req: Request, res: Response) {
    const {
      code,
      description
    } = req.body;

    const category = new Category();
    category.code = code;
    category.description = description;

    try {
      await AppDataSource.manager.save(category);
      res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const userRepository = AppDataSource.getRepository(Category);
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ user, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const categoryRespository = AppDataSource.getRepository(Category);
      const category = await categoryRespository.find();
      res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

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
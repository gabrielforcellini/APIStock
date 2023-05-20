import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Establishment } from '../entity/Establishment';

export class EstablishmentController {
  static async register(req: Request, res: Response) {
    const {
      name,
      code,
      address,
    } = req.body;

    const establishment = new Establishment();
    establishment.name = name;
    establishment.code = code;
    establishment.address = address

    try {
      await AppDataSource.manager.save(establishment);
      res.status(201).json({
        message: "Registered establishment!",
        success: true
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const establishment = await establishmentRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ establishment, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findAll(req: Request, res: Response) {
    try {
      const establishmentRespository = AppDataSource.getRepository(Establishment);
      const establishment = await establishmentRespository.find();
      res.status(200).json({ establishment, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      name,
      code,
      address,
    } = req.body;

    try {
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const establishmentToUpdate = await establishmentRepository.findOneBy({
        id: parseInt(id)
      });

      establishmentToUpdate.name = name;
      establishmentToUpdate.code = code;
      establishmentToUpdate.address = address;

      await establishmentRepository.save(establishmentToUpdate);
      res.status(200).json({ establishmentToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const establishmentToDelete = await establishmentRepository.findOneBy({
        id: parseInt(id)
      });
      await establishmentRepository.remove(establishmentToDelete);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
}
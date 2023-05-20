import { Supplier } from '../entity/Supplier';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class SupplierController {
  static async register(req: Request, res: Response) {
    const {
      nome,
      endereco_id,
      observacoes,
    } = req.body;

    const supplier = new Supplier();
    supplier.nome = nome;
    supplier.endereco_id = endereco_id;
    if (observacoes) {
      supplier.observacoes = observacoes;
    };

    try {
      await AppDataSource.manager.save(supplier);
      res.status(201).json({
        message: "Registered supplier!",
        success: true
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplier = await supplierRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ supplier, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const supplierRespository = AppDataSource.getRepository(Supplier);
      const supplier = await supplierRespository.find();
      res.status(200).json({ supplier, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      nome,
      endereco_id,
      observacoes
    } = req.body;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplierToUpdate = await supplierRepository.findOneBy({
        id: parseInt(id)
      });
      supplierToUpdate.nome = nome;
      supplierToUpdate.endereco_id = endereco_id;
      supplierToUpdate.observacoes = observacoes;
      await supplierRepository.save(supplierToUpdate);
      res.status(200).json({ supplierToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplierToDelete = await supplierRepository.findOneBy({
        id: parseInt(id)
      });
      await supplierRepository.remove(supplierToDelete);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
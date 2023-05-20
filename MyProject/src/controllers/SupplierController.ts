import { Supplier } from '../entity/Supplier';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class SupplierController {
  static async register(req: Request, res: Response) {
    const {
      name,
      telephone,
      mail,
      address,
      cnpj,
      fantasy_name,
      active_status
    } = req.body;

    const supplier = new Supplier();
    supplier.name = name;
    supplier.telephone = telephone;
    supplier.mail = mail;
    supplier.address = address;
    supplier.cnpj = cnpj;
    supplier.fantasy_name = fantasy_name;
    supplier.active_status = active_status;

    try {
      const newSupplier = await AppDataSource.manager.save(supplier);
      res.status(201).json({
        newSupplier,
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
      name,
      address
    } = req.body;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplierToUpdate = await supplierRepository.findOneBy({
        id: parseInt(id)
      });
      supplierToUpdate.name = name;
      supplierToUpdate.address = address;
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
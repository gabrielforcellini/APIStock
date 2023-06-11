import { Supplier } from '../entity/Supplier';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Address } from '../entity/Address/Address';

export class SupplierController {
  
  static async register(req: Request, res: Response) {
    const  address_id = req.params.address_id
    const { name, telephone, mail, cnpj, fantasy_name, active_status } = req.body;
    
    try {
      const addressRepository = AppDataSource.getRepository(Address)
      const address = await addressRepository
        .createQueryBuilder("address")
        .select("address")
        .where("id = :id", {id: address_id})
        .getOne();

      if (!address) {
        return res.status(500).json({ message: "Endereço não existe" })
      }

      const supplierRepository = AppDataSource.getRepository(Supplier)
      const newSupplier = await supplierRepository
        .createQueryBuilder("supplier")
        .insert()
        .into("supplier")
        .values(
          { name: name, telephone: telephone, mail: mail, cnpj: cnpj, fantasy_name: fantasy_name, active_status: active_status, address: address}
        )
        .execute();

      res.status(201).json({ newSupplier, success: true});
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplier = await supplierRepository
        .createQueryBuilder("supplier")
        .select("supplier").addSelect("address.id")
        .leftJoin("supplier.address", "address")
        .where("supplier.id = :id", { id: id})
        .getOne();

      res.status(200).json({ supplier, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const supplierRespository = AppDataSource.getRepository(Supplier);
      const supplier = await supplierRespository
        .createQueryBuilder("supplier")
        .select("supplier").addSelect("address.id")
        .leftJoin("supplier.address", "address")
        .getMany();

      res.status(200).json({ supplier, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;
    const { name, telephone, mail, cnpj, fantasy_name, active_status } = req.body;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplierToUpdate = await supplierRepository
        .createQueryBuilder("supplier")
        .update("supplier")
        .set(
          { name: name, telephone: telephone, mail: mail, cnpj: cnpj, fantasy_name: fantasy_name, active_status: active_status,}
        )
        .where("id = :id", { id: id})
        .execute();

      res.status(200).json({ supplierToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier);
      const supplierToDelete = await supplierRepository
        .createQueryBuilder("supplier")
        .delete()
        .from("supplier")
        .where("id = :id", { id: id})
        .execute();
        
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
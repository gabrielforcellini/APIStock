import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Establishment } from '../entity/Establishment';
import { Address } from '../entity/Address/Address';

export class EstablishmentController {

  static async register(req: Request, res: Response) {
    const { name, code } = req.body;
    const address_id = req.params.address_id

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

      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const newEstablishment = await establishmentRepository
        .createQueryBuilder("establishment")
        .insert()
        .into("establishment")
        .values(
          { name: name, code: code, address: address}
        )
        .execute();

      res.status(201).json({ newEstablishment, success: true});
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      
      const establishment = await establishmentRepository
        .createQueryBuilder("establishment")
        .select("establishment").addSelect("address.id")
        .leftJoin("establishment.address", "address")
        .where("establishment.id = :id", {id: id})
        .getOne();

      res.status(200).json({ establishment, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const establishmentRespository = AppDataSource.getRepository(Establishment);

      const establishment = await establishmentRespository
        .createQueryBuilder("establishment")
        .select("establishment").addSelect("address.id")
        .leftJoin("establishment.address", "address")
        .getMany();

      res.status(200).json({ establishment, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;
    const { name, code } = req.body;

    try {
      
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const establishmentToUpdate = await establishmentRepository
        .createQueryBuilder("establishment")
        .update("establishment")
        .set({ name: name , code: code })
        .where("id = :id", {id: id})
        .execute();

      res.status(200).json({ establishmentToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const establishment_id = req.params.id;

    try {
      const establishmentRepository = AppDataSource.getRepository(Establishment);
      await establishmentRepository
        .createQueryBuilder("establishment")
        .delete()
        .from("establishment")
        .where("id = :id", {id: establishment_id})
        .execute();
      
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
}
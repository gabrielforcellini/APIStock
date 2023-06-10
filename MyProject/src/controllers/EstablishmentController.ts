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
      const address = await addressRepository.findOneBy({ id: parseInt(address_id) });

      if (!address) {
        return res.status(500).json({ message: "Endereço não existe" })
      }

      const establishment = new Establishment();
      establishment.name = name;
      establishment.code = code;
      establishment.address = address;

      const establishmentRepository = AppDataSource.getRepository(Establishment);
      const newEstablishment = await establishmentRepository.save(establishment);
      res.status(201).json({
        newEstablishment, success: true
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
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
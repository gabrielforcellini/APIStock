import { Supplier } from '../entity/Supplier';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Address } from '../entity/Address/Address';
import { Product } from '../entity/Product';

export class SupplierController {

  static async register(req: Request, res: Response) {
    const address_id = req.params.address_id
    const { name, telephone, mail, cnpj, fantasy_name, active_status } = req.body;

    try {
      const addressRepository = AppDataSource.getRepository(Address)
      const address = await addressRepository
        .createQueryBuilder("address")
        .select("address")
        .where("id = :id", { id: address_id })
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
          { name: name, telephone: telephone, mail: mail, cnpj: cnpj, fantasy_name: fantasy_name, active_status: active_status, address: address }
        )
        .execute();

      res.status(201).json({ newSupplier, success: true });
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
        .where("supplier.id = :id", { id: id })
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
          { name: name, telephone: telephone, mail: mail, cnpj: cnpj, fantasy_name: fantasy_name, active_status: active_status, }
        )
        .where("id = :id", { id: id })
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
        .where("id = :id", { id: id })
        .execute();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findProductsBySupplier(req: Request, res: Response) {
    const supplier_id = req.params.supplier_id;

    try {
      const supplierRepository = AppDataSource.getRepository(Supplier)
      const supplier = await supplierRepository
        .createQueryBuilder("supplier")
        .select("supplier")
        .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
        .getOne();

      if (!supplier) {
        return res.status(500).json({ message: "Fornecedor não existe!", success: false });
      }

      const suppliers = await supplierRepository
        .createQueryBuilder("supplier")
        .select("supplier")
        .leftJoinAndSelect("supplier.products", "product")
        .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
        .getMany();

      res.status(200).json({ suppliers, success: true });
    } catch (error) {
      return res.status(500).json({ error, success: false });
    };
  };

  static async associate(req: Request, res: Response) {
    const supplier_id = req.params.supplier_id;
    const product_id = req.params.product_id;

    try {
      const productRepository = AppDataSource.getRepository(Product)
      const product = await productRepository
        .createQueryBuilder("product")
        .select("product")
        .where("product.id = :product_id", { product_id: product_id })
        .getOne();

      if (!product) {
        return res.status(500).json({ message: "Produto não existe!", success: false });
      }

      const supplierRepository = AppDataSource.getRepository(Supplier)
      let supplier = await supplierRepository
        .createQueryBuilder("supplier")
        .select("supplier")
        .leftJoinAndSelect("supplier.products", "product")
        .where("supplier.id = :supplier_id", { supplier_id: supplier_id })
        .getOne();

      if (!supplier) {
        return res.status(500).json({ message: "Fornecedor não existe!", success: false });
      }

      const supplier_product = await supplierRepository
        .createQueryBuilder("supplier")
        .leftJoin("supplier.products", "product")
        .andWhere("supplier.id = :supplier_id", { supplier_id: supplier_id })
        .andWhere("product.id = :product_id", { product_id: product_id })
        .getOne();

      if (supplier_product) {
        return res.status(500).json({ message: "Esse produto já está cadastrado para esse fornecedor!", success: false });
      } else {
        supplier.addProduct(product)
        await supplierRepository.save(supplier);
        res.status(200).json({ supplier, success: true });
      }
    } catch (error) {
      return res.status(500).json({ error, success: false });
    };
  };
};
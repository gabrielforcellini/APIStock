import { Product } from '../entity/Product';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class ProductController {
  static async register(req: Request, res: Response) {
    const {
      nome,
      descricao,
      categoria,
      preco_compra,
      preco_venda,
      quantidade_estoque,
      unidade_medida,
      fornecedor_id,
      codigo_barras,
      data_criacao,
      data_atualizacao,
      marca,
      item_consumo,
      item_venda,
      status
    } = req.body;

    const product = new Product();
    product.nome = nome;
    product.descricao = descricao;
    product.categoria = categoria;
    product.preco_compra = preco_compra;
    product.preco_venda = preco_venda;
    product.quantidade_estoque = quantidade_estoque;
    product.unidade_medida = unidade_medida;
    product.fornecedor_id = fornecedor_id;
    product.codigo_barras = codigo_barras;
    product.data_criacao = data_criacao;
    product.data_atualizacao = data_atualizacao;
    product.marca = marca;
    product.item_consumo = item_consumo;
    product.item_venda = item_venda;
    product.status = status;

    try {
      await AppDataSource.manager.save(product);
      res.status(201).json({
        message: "Registered product!",
        success: true
      });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const productRespository = AppDataSource.getRepository(Product);
      const product = await productRespository.find();
      res.status(200).json({ product, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      nome,
      descricao,
      categoria,
      preco_compra,
      preco_venda,
      quantidade_estoque,
      unidade_medida,
      fornecedor_id,
      codigo_barras,
      data_criacao,
      data_atualizacao,
      marca,
      item_consumo,
      item_venda,
      status
    } = req.body;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const productToUpdate = await productRepository.findOneBy({
        id: parseInt(id)
      });

      productToUpdate.nome = nome;
      productToUpdate.descricao = descricao;
      productToUpdate.categoria = categoria;
      productToUpdate.preco_compra = preco_compra;
      productToUpdate.preco_venda = preco_venda;
      productToUpdate.quantidade_estoque = quantidade_estoque;
      productToUpdate.unidade_medida = unidade_medida;
      productToUpdate.fornecedor_id = fornecedor_id;
      productToUpdate.codigo_barras = codigo_barras;
      productToUpdate.data_criacao = data_criacao;
      productToUpdate.data_atualizacao = data_atualizacao;
      productToUpdate.marca = marca;
      productToUpdate.item_consumo = item_consumo;
      productToUpdate.item_venda = item_venda;
      productToUpdate.status = status;

      await productRepository.save(productToUpdate);
      res.status(200).json({ productToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const productRepository = AppDataSource.getRepository(Product);
      const productToDelete = await productRepository.findOneBy({
        id: parseInt(id)
      });
      await productRepository.remove(productToDelete);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};
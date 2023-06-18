import { Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./Supplier";
import { Product } from "./Product";

@Entity({ name: "supplier_product" })
export class Supplier_Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Supplier, supplier => supplier.products)
  @JoinColumn({ name: "supplier_id" })
  suppliers: Supplier;

  @ManyToMany(() => Product, product => product.suppliers)
  @JoinColumn({ name: "product_id" })
  products: Product;
};
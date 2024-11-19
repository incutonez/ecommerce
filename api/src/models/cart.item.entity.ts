import { ProductListEntity } from "src/models/product.entity";

export class CartItemEntity {
  userId: string;
  productId: string;
  count: number;
  createdDate?: number;
  product?: ProductListEntity;
  readonly id?: number;
}

export class CartCheckoutItemEntity {
  userId: string;
  productId: string;
  count: number;
  product: ProductListEntity;
  subTotal: number;
  readonly id?: number;
}

export class CartItemAddEntity {
  userId?: string;
  productId: string;
}

export class CartItemUpdateEntity {
  total: number;
}

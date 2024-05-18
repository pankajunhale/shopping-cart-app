import { Expose, Type } from "class-transformer";
import { ResponseDto } from "../../../common/dto/response";

export class ProductListFilterRequestDto {
    term: string = '';
}

export class ProductListResponseDto extends ResponseDto {
    @Expose()
    @Type(() => Array<Product>)
    result: Array<Product> | [] = [];

    constructor() {
        super();
    }
}

export class ProductDetailsResponseDto extends ResponseDto {
    @Expose()
    @Type(() => Product)
    result: Product | null = null;

    constructor() {
        super();
    }
}

export class Product {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    category: string;

    @Expose()
    price: string;

    @Expose()
    description: string;

    constructor() {
        this.id = 0;
        this.title = "";
        this.category = "";
        this.price = "0.00";
        this.description = "";
    }

}

export class CartListResponseDto extends ResponseDto {
    @Expose()
    @Type(() => Array<Cart>)
    result: Array<Cart> | [] = [];

    constructor() {
        super();
    }
}
export class Cart {
    @Expose()
    id: number;

    @Expose()
    productId: number;

    @Expose()
    quantity: number;

    constructor() {
        this.id = 0;
        this.productId = 0;
        this.quantity = 0;
    }
}


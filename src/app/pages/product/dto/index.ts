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

    @Expose()
    cartTotal: number;

    @Expose()
    itemCount: number;

    constructor() {
        super();
        this.cartTotal = 0.00;
        this.itemCount = 0;
    }
}
export class Cart {

    @Expose()
    id: number;

    @Expose()
    productId: number;

    @Expose()
    shoppingCartId: number;

    @Expose()
    quantity: number;

    @Expose()
    itemTotal: number;

    @Type(() => Product)
    @Expose() product: Product | null;

    constructor() {
        this.id = 0;
        this.shoppingCartId = 0;
        this.productId = 0;
        this.quantity = 0;
        this.product = null;
        this.itemTotal = 0;
    }
}

export class AddCartItemRequestDto {
    @Expose()
    id?: number;

    @Expose()
    productId: number;

    @Expose()
    quantity?: number;

    constructor() {
        this.id = 0;
        this.productId = 0;
        this.quantity = 0;
    }
}

export class AddCartItemReponseDto extends ResponseDto {

    @Expose()
    @Type(() => AddCartItemResponse)
    result: AddCartItemResponse | null = null;

    constructor() {
        super();

    }
}

export class AddCartItemResponse {
    @Expose()
    id: number;

    @Expose()
    productId: number;

    @Expose()
    quantity: number;

    @Expose()
    shoppingCartId: number;

    @Expose()
    totalCartItemCount: number;

    constructor() {
        this.id = 0;
        this.productId = 0;
        this.quantity = 0;
        this.shoppingCartId = 0;
        this.totalCartItemCount = 0;
    }
}


export class CartSubtotalAndItemCountResponseDto extends ResponseDto {

    @Expose()
    @Type(() => CartSubtotalAndItemCountResponse)
    result: CartSubtotalAndItemCountResponse | null = null;

    constructor() {
        super();
    }
}
export class CartSubtotalAndItemCountResponse {
    @Expose()
    total: number;

    @Expose()
    count: number;

    constructor() {
        this.total = 0;
        this.count = 0;
    }
}




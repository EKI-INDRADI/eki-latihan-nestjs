import { Injectable } from '@nestjs/common';
import { ProductSchema } from './interface-schema/product-schema.interface';

@Injectable()
export class ProductsService {
    arr_products: any = []
    // logic
    insert_arr(product) {
        this.arr_products.push(product)
        return this.arr_products
    }


    arr_products_with_schema: ProductSchema[] = []
    // logic
    insert_arr_with_schema(product_schema: ProductSchema) {
        this.arr_products_with_schema.push(product_schema)
        return this.arr_products_with_schema
    }

    findAll_arr_with_schema(): ProductSchema[] {
        return this.arr_products_with_schema
    }

    findOne_arr_with_schema(id: string): ProductSchema {
        // ada bug di number parah emang -_-
        // jadi hrs covert string
        return this.arr_products_with_schema.find((get_data: any) => String(get_data.id) === String(id))
    }


    deleteOne_arr_with_schema(id: string): ProductSchema[] {
        const get_index = this.arr_products_with_schema.findIndex((get_data: any) => String(get_data.id) === String(id))
        this.arr_products_with_schema.splice(get_index, 1) // tutorial
        // delete this.arr_products_with_schema[get_index] // cara cepet
        return this.arr_products_with_schema;
    }
}

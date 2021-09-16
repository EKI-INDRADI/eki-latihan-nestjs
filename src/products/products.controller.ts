import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DTO_CreateProductSchema } from './data-transfer-object/create-product.dto';
import { ProductSchema } from './interface-schema/product-schema.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    //======================= call services
    constructor(private products_service: ProductsService) { }
    //======================= call services

    //============================================================================================== NESTJS DEFAULT
    @Get() // ini Deccorator
    findAll(): String {
        return 'Find All';
    }

    @Get('/all') // ini Deccorator
    findAll2(): String {
        return 'Find All2';
    }

    @Get('/view-token') // ini Deccorator
    @HttpCode(204)
    @Header('Authorization', 'Bearer ASASSASFas123212')
    findAll3(): any {
        // lihat get request pada postman akan terisi header
        return 'Authorization';
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }

    @Get('find-all-with-schema')
    async find_with_schema(): Promise<ProductSchema[]> {
        return this.products_service.findAll_arr_with_schema()
    }


    @Get('/find-one-with-schema/:id')
    async findOne_with_schema(@Param() params): Promise<ProductSchema> {
        return this.products_service.findOne_arr_with_schema(params.id)
    }


    @Delete('/delete-one-with-schema/:id')
    async deleteOne_with_schema(@Param() params): Promise<ProductSchema[]> {
        return this.products_service.deleteOne_arr_with_schema(params.id)
    }


    @Get(':id')
    findOne(@Param() params): string {
        return params;
    }

    //============================================================================================== /NESTJS DEFAULT
    //============================================================================================== NESTJS EXPRESS
    @Post('/ex/request')
    find_req_ex(
        @Req()
        express_request: Request,
        @Res()
        express_response: Response,
    ): any {

        let res_json = express_response.json({
            statusCode: express_response.statusCode,
            request: express_request.body
        })
        return res_json
    }


    //======================= call services
    @Post('/ex/insert-object')
    create_express(
        @Req()
        express_request: Request,
        @Res()
        express_response: Response,
    ): any {
        this.products_service.insert_arr(express_request.body)

        let res_json = express_response.json({
            statusCode: express_response.statusCode,
            request: express_request.body,
            message: "saved!",
            list: this.products_service.arr_products
        })
        return res_json
    }
    //======================= /call services


    //======================= call services schema
    @Post('/ex/insert-object-with-schema')
    async create_express_schema(
        @Req()
        express_request: Request,
        @Res()
        express_response: Response,
        @Body() create_product_schema: DTO_CreateProductSchema  // class validator + class transformer + data transfer object
    ): Promise<ProductSchema[]> {
        this.products_service.insert_arr_with_schema(create_product_schema)
        let res_json: any = express_response.json({
            statusCode: express_response.statusCode,
            request: express_request.body,
            message: "saved!",
            list: this.products_service.arr_products_with_schema
        })
        return res_json
    }
    //======================= /call services schema

    //============================================================================================== /NESTJS EXPRESS

    //============================================================================================== NESTJS FASTIFY

    @Post('/fa/request')
    find_req_fa(
        @Req() fastify_request,
        @Res() fastify_reply
    ): any {
        let res_json
        res_json = fastify_reply
            // .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                statusCode: fastify_reply.statusCode,
                request: fastify_request.body
            })
        return res_json


        // https://www.fastify.io/docs/latest/Reply/
        // https://www.fastify.io/docs/latest/Request/

        //=============== nestJS tidak perlu buat error handle request
        // if (fastify_reply.statusCode >= 299) {
        //     res_json = fastify_reply.header('Content-Type', 'application/json; charset=utf-8')
        //         .send({
        //             statusCode: 0,
        //             request: null
        //         })
        // } else {
        // res_json = fastify_reply
        //     // .code(200)
        //     .header('Content-Type', 'application/json; charset=utf-8')
        //     .send({
        //         statusCode: fastify_reply.statusCode,
        //         request: fastify_request.body
        //     })
        // }
        //=============== nestJS tidak perlu buat error handle request
        return res_json
    }

    //======================= call services
    @Post('/fa/insert-object')
    create_fastfiy(
        @Req() fastify_request,
        @Res() fastify_reply
    ): any {
        this.products_service.insert_arr(fastify_request.body)
        let res_json = fastify_reply
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                statusCode: fastify_reply.statusCode,
                request: fastify_request.body,
                message: "saved!",
                list: this.products_service.arr_products
            })

        return res_json
    }
    //======================= /call services

    //======================= call services with schema
    @Post('/fa/insert-object-with-schema')
    async create_fastfiy_schema(
        @Req() fastify_request,
        @Res() fastify_reply,
        @Body() create_product_schema: DTO_CreateProductSchema  // class validator + class transformer + data transfer object
    ): Promise<ProductSchema[]> {
        this.products_service.insert_arr_with_schema(create_product_schema)

        let res_json: any = fastify_reply
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                statusCode: fastify_reply.statusCode,
                request: fastify_request.body,
                message: "saved!",
                list: this.products_service.arr_products_with_schema
            })
        return res_json
    }
    //======================= /call services with schema

    //============================================================================================== /NESTJS FASTIFY
}

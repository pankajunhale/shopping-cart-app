import { Expose } from "class-transformer";

export class ResponseDto {
    @Expose()
    status: boolean = false;

    @Expose()
    statusCode: number = 0;

    @Expose()
    path: string = '';

}

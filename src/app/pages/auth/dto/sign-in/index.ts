import { Expose, Type } from "class-transformer";
import { ResponseDto } from "../../../../common/dto/response";

export class SignInRequestDto {
    email: string;
    password: string;

    constructor(_email: string, _password: string) {
        this.email = _email;
        this.password = _password;
    }
}

export class SignInResponseDto extends ResponseDto {
    @Expose()
    @Type(() => AccessToken)
    result: AccessToken | undefined = undefined;

    constructor() {
        super();
    }
}

export class AccessToken {
    @Expose()
    accessToken: string = '';
}
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import {UAParser} from "ua-parser-js";

export const UserAgent = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const useragent = request.headers['user-agent']
    const parse = new UAParser(useragent)
    return parse.getResult()
})
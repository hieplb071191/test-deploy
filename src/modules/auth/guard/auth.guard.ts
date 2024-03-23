import { AuthGuard } from "@nestjs/passport";

export class AutJwthGuard extends AuthGuard('jwt') {}
import { PickType } from "@nestjs/swagger";
import { ListProductDetailDto } from "./productdetail-list.dto";

export class ProductDetailByInfo extends PickType(ListProductDetailDto, ['size', 'color']) {

}
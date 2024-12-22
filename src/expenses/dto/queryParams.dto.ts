import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max } from 'class-validator';

export class QueryParamsDto {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  page: number = 1;
  
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  @Max(7)
  take: number = 5;
}

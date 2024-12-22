import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString({ message: 'Category must be string' })
  category: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}

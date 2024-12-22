import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'New Year',
      productName: 'Christmas tree',
      quantity: 15,
      price: 548,
    },
    {
      id: 2,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
    },
  ];
  create(createExpenseDto: CreateExpenseDto) {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      category: createExpenseDto.category,
      productName: createExpenseDto.productName,
      quantity: createExpenseDto.quantity,
      price: createExpenseDto.price,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);

    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    this.expenses[index] = {
      id: this.expenses[index].id,
      category: updateExpenseDto.category || this.expenses[index].category,
      productName:
        updateExpenseDto.productName || this.expenses[index].productName,
      quantity: updateExpenseDto.quantity || this.expenses[index].quantity,
      price: updateExpenseDto.price || this.expenses[index].price,
    };
    return ['Expense updated', this.expenses[index]];
  }

  remove(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(index, 1);
    return ['Deleted succesfully', deletedExpense];
  }
}

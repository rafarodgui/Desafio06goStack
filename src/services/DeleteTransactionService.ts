import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsResopitory from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsResopitory);

    const transaction = await transactionRepository.findOne({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new AppError('Transaction not found');
    }

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;

import { describe, it, expect, jest } from '@jest/globals';
import { BankAccount, Client, Currency, Bank, DepositCommand, WithdrawCommand, TransactionQueue } from './patterns';

describe('Bank System', () => {
  let client: Client;
  let account: BankAccount;
  let bank: Bank;
  let transactionQueue: TransactionQueue;

  beforeEach(() => {
    client = new Client('John', 'Doe');
    account = new BankAccount(client, 1000, Currency.USD);
    bank = Bank.getInstance();
    transactionQueue = new TransactionQueue();
  });

  it('should initialize BankAccount with correct values', () => {
    expect(account.owner).toBe(client);
    expect(account.balance).toBe(1000);
    expect(account.currency).toBe(Currency.USD);
  });

  it('should deposit and withdraw money correctly', () => {
    account.deposit(500);
    expect(account.balance).toBe(1500);
    account.withdraw(500);
    expect(account.balance).toBe(1000);
  });

  it('should not withdraw money if insufficient balance', () => {
    console.error = jest.fn();
    account.withdraw(1500);
    expect(account.balance).toBe(1000);
    expect(console.error).toHaveBeenCalledWith('Not enough funds!');
  });

  it('should create and close an account in Bank', () => {
    const newAccount = bank.createAccount(client, 2000, Currency.EUR);
    expect(newAccount.balance).toBe(2000);
    expect(client.fullName).toBe('John Doe');
    bank.closeAccount(newAccount.accountNumber);
  });

  it('should execute and undo transactions', () => {
    const depositCommand = new DepositCommand(account, 300);
    transactionQueue.addTransaction(depositCommand);
    expect(account.balance).toBe(1300);
    transactionQueue.undoLast();
    expect(account.balance).toBe(1000);

    const withdrawCommand = new WithdrawCommand(account, 200);
    transactionQueue.addTransaction(withdrawCommand);
    expect(account.balance).toBe(800);
    transactionQueue.undoLast();
    expect(account.balance).toBe(1000);
  });
});

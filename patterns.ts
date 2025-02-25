interface IBankAccount {
  readonly accountNumber: string;
  readonly balance: number;
  owner: Client;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

type TransactionType = "deposit" | "withdraw";

enum Currency {
  USD = "USD",
  EUR = "EUR",
  UAH = "UAH",
}

class BankAccount implements IBankAccount {
  private _balance: number;
  private _owner: Client;
  private _currency: Currency;

  public readonly accountNumber = this.generateAccountNumber();

  public get balance(): number {
    return this._balance;
  }

  public get owner(): Client {
    return this._owner;
  }

  public set owner(value: Client) {
    this._owner = value;
  }

  public get currency(): Currency {
    return this._currency;
  }

  constructor(owner: Client, balance: number, currency: Currency) {
    this._balance = balance;
    this._owner = owner;
    this._currency = currency;
  }

  public deposit(amount: number): void {
    this._balance += amount;
    console.info(`Deposit ${amount} ${this.currency}. Balance: ${this.balance}`);
  }

  public withdraw(amount: number): void {
    if (amount > this._balance) {
      console.error(`Not enough funds!`);
      return;
    }
    this._balance -= amount;
    console.info(`Withdraw ${amount} ${this.currency}. Balance: ${this.balance}`);
  }

  private generateAccountNumber(): string {
    return `ACC-${Math.floor(Math.random() * 10000)}`;
  }
}

class Client {
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly accounts = new Map<string, IBankAccount>();

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public addAccount(account: BankAccount): void {
    this.accounts.set(account.accountNumber, account);
  }

  public removeAccount(accountNumber: string): void {
    this.accounts.delete(accountNumber);
  }
}

// Singleton: Bank
class Bank {
  private static instance: Bank;
  private accounts = new Map<string, BankAccount>();

  private constructor() {}

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  public createAccount(client: Client, initialBalance: number, currency: Currency): BankAccount {
    const account = new BankAccount(client, initialBalance, currency);
    this.accounts.set(account.accountNumber, account);
    client.addAccount(account);
    return account;
  }

  public closeAccount(accountNumber: string): void {
    this.accounts.delete(accountNumber);
  }
}

// Command Pattern for Transactions
interface ICommand {
  execute(): void;
  undo(): void;
}

class DepositCommand implements ICommand {
  private account: BankAccount;
  private amount: number;

  constructor(account: BankAccount, amount: number) {
    this.account = account;
    this.amount = amount;
  }

  execute(): void {
    this.account.deposit(this.amount);
  }

  undo(): void {
    this.account.withdraw(this.amount);
  }
}

class WithdrawCommand implements ICommand {
  private account: BankAccount;
  private amount: number;

  constructor(account: BankAccount, amount: number) {
    this.account = account;
    this.amount = amount;
  }

  execute(): void {
    this.account.withdraw(this.amount);
  }

  undo(): void {
    this.account.deposit(this.amount);
  }
}

// Transaction Manager
class TransactionQueue {
  private queue: ICommand[] = [];

  public addTransaction(command: ICommand): void {
    this.queue.push(command);
    command.execute();
  }

  public undoLast(): void {
    const command = this.queue.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage Example
const bank = Bank.getInstance();
const client = new Client("John", "Doe");

const accountUSD = bank.createAccount(client, 1000, Currency.USD);
const accountEUR = bank.createAccount(client, 500, Currency.EUR);

const transactionQueue = new TransactionQueue();
transactionQueue.addTransaction(new DepositCommand(accountUSD, 200));
transactionQueue.addTransaction(new WithdrawCommand(accountEUR, 100));

console.log(`Final USD Balance: ${accountUSD.balance}`);
console.log(`Final EUR Balance: ${accountEUR.balance}`);

transactionQueue.undoLast();
console.log(`After undo, EUR Balance: ${accountEUR.balance}`);

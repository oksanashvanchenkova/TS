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
  
    public createAccount(owner: Client, balance: number, currency: string): BankAccount {
      const account = new BankAccount(owner, balance, currency);
      this.accounts.set(account.accountNumber, account);
      return account;
    }
  
    public closeAccount(accountNumber: string): void {
      this.accounts.delete(accountNumber);
    }
  }
  
  class BankAccount implements IBankAccount {
    private _balance: number;
    private _owner: Client;
    public readonly currency: string;
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
  
    constructor(owner: Client, balance: number, currency: string) {
      this._balance = balance;
      this._owner = owner;
      this.currency = currency;
    }
  
    public deposit(amount: number): void {
      this._balance += amount;
      console.info(`Operation: Deposit ${amount} ${this.currency}. Balance: ${this.balance}`);
    }
  
    public withdraw(amount: number): void {
      if (amount > this._balance) {
        console.error("Insufficient funds!");
        return;
      }
      this._balance -= amount;
      console.info(`Operation: Withdraw ${amount} ${this.currency}. Balance: ${this.balance}`);
    }
  
    private generateAccountNumber(): string {
      return `ACC-${Math.floor(Math.random() * 10000)}`;
    }
  }
  
  interface ICommand {
    execute(): void;
    undo(): void;
  }
  
  class DepositCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}
    
    execute(): void {
      this.account.deposit(this.amount);
    }
    
    undo(): void {
      this.account.withdraw(this.amount);
    }
  }
  
  class WithdrawCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}
  
    execute(): void {
      this.account.withdraw(this.amount);
    }
    
    undo(): void {
      this.account.deposit(this.amount);
    }
  }
  
  class TransactionQueue {
    private queue: ICommand[] = [];
    private history: ICommand[] = [];
  
    public addTransaction(command: ICommand): void {
      this.queue.push(command);
    }
  
    public processTransactions(): void {
      while (this.queue.length > 0) {
        const command = this.queue.shift();
        command?.execute();
        this.history.push(command!);
      }
    }
  
    public undoLastTransaction(): void {
      const command = this.history.pop();
      command?.undo();
    }
  }
  
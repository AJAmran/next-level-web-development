class BankAccouns {
  readonly userId: number;
  userName: string;
  private userBalance: number;

  constructor(userId: number, userName: string, userBlance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBlance;
  }

  addBalance(balance: number) {
    this.userBalance = this.userBalance + balance;
  }
}

const amranBankAc = new BankAccouns(1234, "Amran", 234);

amranBankAc.addBalance(10);

console.log(amranBankAc)
import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class FlashLoan extends Contract {
  deposited = LocalStateKey<number>();

  @allow.call('OptIn')
  @allow.call('NoOp')
  deposit(payment: PayTxn): void {
    assert(payment.receiver === this.app.address);
    this.deposited(this.txn.sender).value = this.deposited(this.txn.sender).value
      + payment.amount;
  }

  withdraw(amount: number): void {
    this.deposited(this.txn.sender).value = this.deposited(this.txn.sender).value
      - amount;
    sendPayment({
      receiver: this.txn.sender,
      amount: amount,
      fee: 0,
    });
  }

  closeOutOfApplication(): void {
    if (this.deposited(this.txn.sender).exists) {
      sendPayment({
        receiver: this.txn.sender,
        amount: this.deposited(this.txn.sender).value,
        fee: 0,
      });
    }
  }

  openFlashLoan(amount: number): void {
    assert(this.txn.groupIndex === 0);
    assert(this.txnGroup[this.txnGroup.length - 1].typeEnum === TransactionType.ApplicationCall);
    assert(this.txnGroup[this.txnGroup.length - 1].applicationID === globals.currentApplicationID);
    assert(this.txnGroup[this.txnGroup.length - 1].applicationArgs[0] === method('closeFlashLoan(pay)void'));

    sendPayment({
      receiver: this.txn.sender,
      amount: amount,
      fee: 0,
    });
  }

  closeFlashLoan(repay: PayTxn): void {
    assert(this.txn.groupIndex === this.txnGroup.length - 1);
    assert(this.txnGroup[0].typeEnum === TransactionType.ApplicationCall);
    assert(this.txnGroup[0].applicationID === globals.currentApplicationID);
    assert(this.txnGroup[0].applicationArgs[0] === method('openFlashLoan(uint64)void'));

    assert(repay.receiver === this.app.address);
    assert(repay.amount === btoi(this.txnGroup[0].applicationArgs[1]));
  }
}

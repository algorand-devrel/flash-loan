import {
  describe, test, expect, beforeAll, beforeEach
} from '@jest/globals';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { microAlgos } from '@algorandfoundation/algokit-utils';
import { FlashLoanClient } from '../contracts/clients/FlashLoanClient';

const fixture = algorandFixture();

let appClient: FlashLoanClient;

describe('FlashLoan', () => {
  let algod: algosdk.Algodv2;
  let testAccount: algosdk.Account;
  let lender: algosdk.Account;
  let borrower: algosdk.Account;
  let buyer: algosdk.Account;
  let seller: algosdk.Account;
  let assetIndex: number;
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    algod = fixture.context.algod;
    testAccount = fixture.context.testAccount;
    const { kmd } = fixture.context;

    // Create all accounts involved in the arbitrage.
    [lender, borrower, buyer, seller] = await Promise.all([
      algokit.getOrCreateKmdWalletAccount({ name: 'flash-loan-lender' }, algod, kmd),
      algosdk.generateAccount(),
      algokit.getOrCreateKmdWalletAccount({ name: 'flash-loan-buyer' }, algod, kmd),
      algokit.getOrCreateKmdWalletAccount({ name: 'flash-loan-seller' }, algod, kmd),
    ]);
    await Promise.all([
      algokit.ensureFunded({
        accountToFund: lender.addr,
        // Has to have enough to just hold ALGO, opt in to app, deposit 1 million ALGO,
        //  send 4 transactions total.
        minSpendingBalance: algokit.microAlgos(128_500 + 1e12 + 4e3),
      }, algod, kmd),
      algokit.ensureFunded({
        accountToFund: borrower.addr,
        // Has to have enough to hold ALGO and ASA, send 8 transactions total.
        minSpendingBalance: algokit.microAlgos(1e5 + 8e3),
      }, algod, kmd),
      algokit.ensureFunded({
        accountToFund: buyer.addr,
        // Has to have enough to hold ALGO and ASA, pay 1 million ALGO, send 2 transactions total.
        minSpendingBalance: algokit.microAlgos(1e12 + 1e5 + 2e3),
      }, algod, kmd),
      algokit.ensureFunded({
        accountToFund: seller.addr,
        // Has to have enough to hold ALGO and ASA, send 2 transactions total.
        minSpendingBalance: algokit.microAlgos(1e5 + 2e3),
      }, algod, kmd),
    ]);

    // Create the ASA that will be used for the arbitrage.
    const createTicket = await algod.sendRawTransaction(
      algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: testAccount.addr,
        suggestedParams: await algod.getTransactionParams().do(),
        defaultFrozen: false,
        total: 10,
        decimals: 0,
      }).signTxn(testAccount.sk),
    ).do();
    assetIndex = await algosdk.waitForConfirmation(algod, createTicket.txId, 3).then((x) => x['asset-index']);

    // Opt-in to the ASA. The borrower will opt-in and opt-out in the context of the flash loan.
    await Promise.all([buyer, seller].map(async (account) => {
      const optinTicket = await algod.sendRawTransaction(
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: account.addr,
          suggestedParams: await algod.getTransactionParams().do(),
          to: account.addr,
          assetIndex,
          amount: 0,
        }).signTxn(account.sk),
      ).do();
      await algosdk.waitForConfirmation(algod, optinTicket.txId, 3);
    }));

    // Send the ASA to the seller.
    const transferTicket = await algod.sendRawTransaction(
      algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: testAccount.addr,
        suggestedParams: await algod.getTransactionParams().do(),
        to: seller.addr,
        assetIndex,
        amount: 10,
      }).signTxn(testAccount.sk),
    ).do();
    await algosdk.waitForConfirmation(algod, transferTicket.txId, 3);

    appClient = new FlashLoanClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod,
    );

    await appClient.create.bare();
  }, 20_000);

  test('deposit', async () => {
    const { appAddress } = await appClient.appClient.getAppReference();
    const deposit = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: lender.addr,
      to: appAddress,
      amount: 1e12,
      suggestedParams: await algod.getTransactionParams().do(),
    });
    await appClient.optIn.deposit({ payment: deposit }, { sender: lender });
  });

  // PLEASE REFER TO THE README FOR SOME CONSIDERATION ON THIS TEST AND
  //  THE ASSUMPTIONS THAT IT RELIES ON.
  test('flashLoan', async () => {
    const sp = await algod.getTransactionParams().do();

    const borrowerOptIn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: borrower.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: borrower.addr,
      assetIndex,
      amount: 0,
    });
    const sellerGiveTx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: seller.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: borrower.addr,
      assetIndex,
      amount: 10,
    });
    const sellerGetTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: borrower.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: seller.addr,
      amount: 1e11,
    });
    const buyerGiveTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: buyer.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: borrower.addr,
      amount: 1e12,
    });
    const buyerGetTx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: borrower.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: buyer.addr,
      assetIndex,
      amount: 10,
    });
    const borrowerOptOut = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: borrower.addr,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
      to: testAccount.addr,
      assetIndex,
      amount: 0,
      closeRemainderTo: testAccount.addr,
    });

    const { appAddress } = await appClient.appClient.getAppReference();
    const repayTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: borrower.addr,
      to: appAddress,
      amount: 1e12,
      suggestedParams: { ...sp, flatFee: true, fee: 1e3 },
    });

    const borrowerInfoPreFlashLoan = await algod.accountInformation(borrower.addr).do();
    // The borrower has a balance that only allows them to hold ALGO and ASA and
    //  send 8 transactions.
    expect(borrowerInfoPreFlashLoan.amount).toBe(2e5 + 8e3);

    await appClient
      .compose()
      .openFlashLoan(
        { amount: 1e12 },
        { sender: borrower, sendParams: { fee: algokit.microAlgos(2e3) } },
      )
      .addTransaction(borrowerOptIn, borrower)
      .addTransaction(sellerGiveTx, seller)
      .addTransaction(sellerGetTx, borrower)
      .addTransaction(buyerGiveTx, buyer)
      .addTransaction(buyerGetTx, borrower)
      .addTransaction(borrowerOptOut, borrower)
      .closeFlashLoan({ repay: repayTx }, { sender: borrower })
      .execute();

    const borrowerInfoPostFlashLoan = await algod.accountInformation(borrower.addr).do();
    // The borrower should have profited 900k ALGO for the arbitrage minus fees.
    expect(borrowerInfoPostFlashLoan.amount - borrowerInfoPreFlashLoan.amount).toBe(9e11 - 8e3);
  });

  test('withdraw', async () => {
    await appClient.withdraw(
      { amount: 1e12 },
      { sender: lender, sendParams: { fee: microAlgos(2e4) } },
    );
  });
});

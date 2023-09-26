import {
  describe, test, expect, beforeAll, beforeEach
} from '@jest/globals';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { FlashLoanClient } from '../contracts/clients/FlashLoanClient';
import {microAlgos} from "@algorandfoundation/algokit-utils";

const fixture = algorandFixture();

let appClient: FlashLoanClient;

describe('FlashLoan', () => {
  let algod: algosdk.Algodv2;
  let lender: algosdk.Account;
  let borrower: algosdk.Account;
  let buyer: algosdk.Account;
  let seller: algosdk.Account;
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    algod = fixture.context.algod;
    const { testAccount, kmd } = fixture.context;

    // Create all accounts involved in the arbitrage.
    [lender, borrower, buyer, seller] = await Promise.all([
      algokit.getOrCreateKmdWalletAccount({
        name: 'flash-loan-lender',
      }, algod, kmd),
      algokit.getOrCreateKmdWalletAccount({
        name: 'flash-loan-borrower',
      }, algod, kmd),
      algokit.getOrCreateKmdWalletAccount({
        name: 'flash-loan-buyer',
      }, algod, kmd),
      algokit.getOrCreateKmdWalletAccount({
        name: 'flash-loan-seller',
      }, algod, kmd),
    ]);
    await Promise.all([
      algokit.ensureFunded({
        accountToFund: lender.addr,
        minSpendingBalance: algokit.algos(1e6 + 10),
      }, algod, kmd),
      algokit.ensureFunded({
        accountToFund: borrower.addr,
        minSpendingBalance: algokit.microAlgos(0),
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
    const result = await algosdk.waitForConfirmation(algod, createTicket.txId, 3);

    // Opt-in to the ASA. The borrower will opt-in and opt-out in the context of the flash loan.
    await Promise.all([buyer, seller].map(async (account) => {
      const optinTicket = await algod.sendRawTransaction(
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: account.addr,
          suggestedParams: await algod.getTransactionParams().do(),
          to: account.addr,
          assetIndex: result['asset-index'],
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
        assetIndex: result['asset-index'],
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
    const deposit = algosdk.makePaymentTxnWithSuggestedParams(
      lender.addr,
      appAddress,
      1e12,
      undefined,
      undefined,
      await algod.getTransactionParams().do(),
    );
    await appClient.optIn.deposit({ payment: deposit }, { sender: lender });
  });

  // test('flashLoan', async () => {
  //
  // });

  test('withdraw', async () => {
    await appClient.withdraw(
      { amount: 1e12 },
      { sender: lender, sendParams: { fee: microAlgos(2e4) } },
    );
  });
});

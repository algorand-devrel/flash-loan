import {
  describe, test, expect, beforeAll, beforeEach
} from '@jest/globals';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { FlashLoanClient } from '../contracts/clients/FlashLoanClient';

const fixture = algorandFixture();

let appClient: FlashLoanClient;

describe('FlashLoan', () => {
  let algod: algosdk.Algodv2;
  let sender: algosdk.Account;
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    algod = fixture.context.algod;
    const { testAccount, kmd } = fixture.context;
    sender = await algokit.getOrCreateKmdWalletAccount({
      name: 'flash-loan-sender',
    }, algod, kmd);
    await algokit.ensureFunded({
      accountToFund: sender.addr,
      minSpendingBalance: algokit.algos(1e6 + 10),
    }, algod, kmd);

    appClient = new FlashLoanClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod,
    );

    await appClient.create.bare();
  });

  test('deposit', async () => {
    const { appAddress } = await appClient.appClient.getAppReference();
    const deposit = algosdk.makePaymentTxnWithSuggestedParams(
      sender.addr,
      appAddress,
      1e12,
      undefined,
      undefined,
      await algod.getTransactionParams().do(),
    );
    await appClient.optIn.deposit({ payment: deposit }, { sender });
  });
});

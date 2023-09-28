# Flash Loans on Algorand

## ! Disclaimer !
**This code should not be considered a reference implementation or a set of guidelines on how to implement
flash loans on Algorand. This is only a demonstration of the Layer-1 capabilities of the protocol.  
This code is written in the context of [this](https://developer.algorand.org/solutions/temp-do-not-publish-flash-loans-on-tealscript-vs-solidity/) article on Algorand Developer Portal**

## Introduction
This project is a proof of concept for flash loans on Algorand. It implements flash loans as atomic group transactions
involving an abstract Flash loan platform a lender, a borrower, a seller and a buyer.  
The use case for this flash loan is to do arbitrage on the price of an abstract ASA.  
These are roughly the steps taken by the test file which will demonstrate the use of a flash loan:
1. The lender will deposit a huge sum of money in the flash loan platform.
2. The borrower will borrow the money and buy the ASA from the seller.
3. The borrower will sell the ASA to the buyer and repay the loan.
4. The lender will withdraw their money.

The result is a that the borrower will have made a profit, opted in and out of the ASA all in the same group.

## How to run
This project was written using [TEALScript Algokit Template](https://github.com/algorand-devrel/tealscript-algokit-template/).
The commands and prerequisites are the same as the template.

## Assumptions and considerations
- The flash loan platform does not take into account trading fees or interests on the loan.
- The arbitrage is implemented using simply 4 signed transaction involving (borrower, seller, buyer) parties.  
This means that (buyer, seller) have to sign transactions taking into account the full group of transactions.
This will not be the case in the majority of applications because the trades will be implemented either using
smart contracts or delegated logic signatures (which do not require a priori knowledge of the entire group).
So while you read the test file, just keep in mind that the trade was implemented that way for simplicity but
it is entirely equivalent to a smart contract implementation.
/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import {
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  CoreAppCallArgs,
  RawAppCallArgs,
  AppState,
  TealTemplateParams,
  ABIAppCallArg,
} from '@algorandfoundation/algokit-utils/types/app'
import {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import { SendTransactionResult, TransactionToSign, SendTransactionFrom } from '@algorandfoundation/algokit-utils/types/transaction'
import { Algodv2, OnApplicationComplete, Transaction, TransactionWithSigner, AtomicTransactionComposer } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "deposit(pay)void": {
      "call_config": {
        "opt_in": "CALL",
        "no_op": "CALL"
      }
    },
    "withdraw(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "closeOutOfApplication()void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "openFlashLoan(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "closeFlashLoan(pay)void": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "bare_call_config": {
    "no_op": "CREATE",
    "opt_in": "NEVER",
    "close_out": "NEVER",
    "update_application": "NEVER",
    "delete_application": "NEVER"
  },
  "schema": {
    "local": {
      "declared": {
        "deposited": {
          "type": "uint64",
          "key": "deposited"
        }
      },
      "reserved": {}
    },
    "global": {
      "declared": {},
      "reserved": {}
    }
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 1
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDkKCnR4biBBcHBsaWNhdGlvbklECmludCAwCj4KaW50IDYKKgp0eG4gT25Db21wbGV0aW9uCisKc3dpdGNoIGNyZWF0ZV9Ob09wIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgTk9UX0lNUExFTUVOVEVEIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgY2FsbF9Ob09wIGNhbGxfT3B0SW4KCk5PVF9JTVBMRU1FTlRFRDoKCWVycgoKYWJpX3JvdXRlX2RlcG9zaXQ6CgkvLyBubyBkdXBuIG5lZWRlZAoJdHhuIEdyb3VwSW5kZXgKCWludCAxCgktCglkdXAKCWd0eG5zIFR5cGVFbnVtCglpbnQgcGF5Cgk9PQoJYXNzZXJ0CgljYWxsc3ViIGRlcG9zaXQKCWludCAxCglyZXR1cm4KCmRlcG9zaXQ6Cglwcm90byAxIDAKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjEwCgkvLyBhc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gdGhpcy5hcHAuYWRkcmVzcykKCWZyYW1lX2RpZyAtMSAvLyBwYXltZW50OiBwYXkKCWd0eG5zIFJlY2VpdmVyCgl0eG5hIEFwcGxpY2F0aW9ucyAwCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglhc3NlcnQKCT09Cglhc3NlcnQKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjExCgkvLyB0aGlzLmRlcG9zaXRlZCh0aGlzLnR4bi5zZW5kZXIpLnZhbHVlID0gdGhpcy5kZXBvc2l0ZWQodGhpcy50eG4uc2VuZGVyKS52YWx1ZQoJdHhuIFNlbmRlcgoJYnl0ZSAiZGVwb3NpdGVkIgoJdHhuIFNlbmRlcgoJYnl0ZSAiZGVwb3NpdGVkIgoJYXBwX2xvY2FsX2dldAoJZnJhbWVfZGlnIC0xIC8vIHBheW1lbnQ6IHBheQoJZ3R4bnMgQW1vdW50CgkrCglhcHBfbG9jYWxfcHV0CglyZXRzdWIKCmFiaV9yb3V0ZV93aXRoZHJhdzoKCS8vIG5vIGR1cG4gbmVlZGVkCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglidG9pCgljYWxsc3ViIHdpdGhkcmF3CglpbnQgMQoJcmV0dXJuCgp3aXRoZHJhdzoKCXByb3RvIDEgMAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MTYKCS8vIHRoaXMuZGVwb3NpdGVkKHRoaXMudHhuLnNlbmRlcikudmFsdWUgPSB0aGlzLmRlcG9zaXRlZCh0aGlzLnR4bi5zZW5kZXIpLnZhbHVlCgl0eG4gU2VuZGVyCglieXRlICJkZXBvc2l0ZWQiCgl0eG4gU2VuZGVyCglieXRlICJkZXBvc2l0ZWQiCglhcHBfbG9jYWxfZ2V0CglmcmFtZV9kaWcgLTEgLy8gYW1vdW50OiB1aW50NjQKCS0KCWFwcF9sb2NhbF9wdXQKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjE4CgkvLyBzZW5kUGF5bWVudCh7CglpdHhuX2JlZ2luCglpbnQgcGF5CglpdHhuX2ZpZWxkIFR5cGVFbnVtCgoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czoxOQoJLy8gcmVjZWl2ZXI6IHRoaXMudHhuLnNlbmRlcgoJdHhuIFNlbmRlcgoJaXR4bl9maWVsZCBSZWNlaXZlcgoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MjAKCS8vIGFtb3VudDogYW1vdW50CglmcmFtZV9kaWcgLTEgLy8gYW1vdW50OiB1aW50NjQKCWl0eG5fZmllbGQgQW1vdW50CgoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czoyMQoJLy8gZmVlOiAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CglyZXRzdWIKCmFiaV9yb3V0ZV9jbG9zZU91dE9mQXBwbGljYXRpb246CgkvLyBubyBkdXBuIG5lZWRlZAoJY2FsbHN1YiBjbG9zZU91dE9mQXBwbGljYXRpb24KCWludCAxCglyZXR1cm4KCmNsb3NlT3V0T2ZBcHBsaWNhdGlvbjoKCXByb3RvIDAgMAoKCS8vIGlmMF9jb25kaXRpb24KCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MjYKCS8vIHRoaXMuZGVwb3NpdGVkKHRoaXMudHhuLnNlbmRlcikuZXhpc3RzCgl0eG4gU2VuZGVyCgl0eG5hIEFwcGxpY2F0aW9ucyAwCglieXRlICJkZXBvc2l0ZWQiCglhcHBfbG9jYWxfZ2V0X2V4Cglzd2FwCglwb3AKCWJ6IGlmMF9lbmQKCgkvLyBpZjBfY29uc2VxdWVudAoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czoyNwoJLy8gc2VuZFBheW1lbnQoewoJaXR4bl9iZWdpbgoJaW50IHBheQoJaXR4bl9maWVsZCBUeXBlRW51bQoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MjgKCS8vIHJlY2VpdmVyOiB0aGlzLnR4bi5zZW5kZXIKCXR4biBTZW5kZXIKCWl0eG5fZmllbGQgUmVjZWl2ZXIKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjI5CgkvLyBhbW91bnQ6IHRoaXMuZGVwb3NpdGVkKHRoaXMudHhuLnNlbmRlcikudmFsdWUKCXR4biBTZW5kZXIKCWJ5dGUgImRlcG9zaXRlZCIKCWFwcF9sb2NhbF9nZXQKCWl0eG5fZmllbGQgQW1vdW50CgoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czozMAoJLy8gZmVlOiAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CgppZjBfZW5kOgoJcmV0c3ViCgphYmlfcm91dGVfb3BlbkZsYXNoTG9hbjoKCS8vIG5vIGR1cG4gbmVlZGVkCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglidG9pCgljYWxsc3ViIG9wZW5GbGFzaExvYW4KCWludCAxCglyZXR1cm4KCm9wZW5GbGFzaExvYW46Cglwcm90byAxIDAKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjM2CgkvLyBhc3NlcnQodGhpcy50eG4uZ3JvdXBJbmRleCA9PT0gMCkKCXR4biBHcm91cEluZGV4CglpbnQgMAoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MzcKCS8vIGFzc2VydCh0aGlzLnR4bkdyb3VwW3RoaXMudHhuR3JvdXAubGVuZ3RoIC0gMV0udHlwZUVudW0gPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwpCglnbG9iYWwgR3JvdXBTaXplCglpbnQgMQoJLQoJZ3R4bnMgVHlwZUVudW0KCWludCBhcHBsCgk9PQoJYXNzZXJ0CgoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czozOAoJLy8gYXNzZXJ0KHRoaXMudHhuR3JvdXBbdGhpcy50eG5Hcm91cC5sZW5ndGggLSAxXS5hcHBsaWNhdGlvbklEID09PSBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbklEKQoJZ2xvYmFsIEdyb3VwU2l6ZQoJaW50IDEKCS0KCWd0eG5zIEFwcGxpY2F0aW9uSUQKCWdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6MzkKCS8vIGFzc2VydCh0aGlzLnR4bkdyb3VwW3RoaXMudHhuR3JvdXAubGVuZ3RoIC0gMV0uYXBwbGljYXRpb25BcmdzWzBdID09PSBtZXRob2QoJ2Nsb3NlRmxhc2hMb2FuKHBheSl2b2lkJykpCglnbG9iYWwgR3JvdXBTaXplCglpbnQgMQoJLQoJZ3R4bnMgQXBwbGljYXRpb25BcmdzIDAKCW1ldGhvZCAiY2xvc2VGbGFzaExvYW4ocGF5KXZvaWQiCgk9PQoJYXNzZXJ0CgoJLy8gY29udHJhY3RzL2ZsYXNoLWxvYW4uYWxnby50czo0MQoJLy8gc2VuZFBheW1lbnQoewoJaXR4bl9iZWdpbgoJaW50IHBheQoJaXR4bl9maWVsZCBUeXBlRW51bQoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6NDIKCS8vIHJlY2VpdmVyOiB0aGlzLnR4bi5zZW5kZXIKCXR4biBTZW5kZXIKCWl0eG5fZmllbGQgUmVjZWl2ZXIKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjQzCgkvLyBhbW91bnQ6IGFtb3VudAoJZnJhbWVfZGlnIC0xIC8vIGFtb3VudDogdWludDY0CglpdHhuX2ZpZWxkIEFtb3VudAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6NDQKCS8vIGZlZTogMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoJcmV0c3ViCgphYmlfcm91dGVfY2xvc2VGbGFzaExvYW46CgkvLyBubyBkdXBuIG5lZWRlZAoJdHhuIEdyb3VwSW5kZXgKCWludCAxCgktCglkdXAKCWd0eG5zIFR5cGVFbnVtCglpbnQgcGF5Cgk9PQoJYXNzZXJ0CgljYWxsc3ViIGNsb3NlRmxhc2hMb2FuCglpbnQgMQoJcmV0dXJuCgpjbG9zZUZsYXNoTG9hbjoKCXByb3RvIDEgMAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6NDkKCS8vIGFzc2VydCh0aGlzLnR4bi5ncm91cEluZGV4ID09PSB0aGlzLnR4bkdyb3VwLmxlbmd0aCAtIDEpCgl0eG4gR3JvdXBJbmRleAoJZ2xvYmFsIEdyb3VwU2l6ZQoJaW50IDEKCS0KCT09Cglhc3NlcnQKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjUwCgkvLyBhc3NlcnQodGhpcy50eG5Hcm91cFswXS50eXBlRW51bSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCkKCWludCAwCglndHhucyBUeXBlRW51bQoJaW50IGFwcGwKCT09Cglhc3NlcnQKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjUxCgkvLyBhc3NlcnQodGhpcy50eG5Hcm91cFswXS5hcHBsaWNhdGlvbklEID09PSBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbklEKQoJaW50IDAKCWd0eG5zIEFwcGxpY2F0aW9uSUQKCWdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6NTIKCS8vIGFzc2VydCh0aGlzLnR4bkdyb3VwWzBdLmFwcGxpY2F0aW9uQXJnc1swXSA9PT0gbWV0aG9kKCdvcGVuRmxhc2hMb2FuKHVpbnQ2NCl2b2lkJykpCglpbnQgMAoJZ3R4bnMgQXBwbGljYXRpb25BcmdzIDAKCW1ldGhvZCAib3BlbkZsYXNoTG9hbih1aW50NjQpdm9pZCIKCT09Cglhc3NlcnQKCgkvLyBjb250cmFjdHMvZmxhc2gtbG9hbi5hbGdvLnRzOjU0CgkvLyBhc3NlcnQocmVwYXkucmVjZWl2ZXIgPT09IHRoaXMuYXBwLmFkZHJlc3MpCglmcmFtZV9kaWcgLTEgLy8gcmVwYXk6IHBheQoJZ3R4bnMgUmVjZWl2ZXIKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKCWFzc2VydAoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9mbGFzaC1sb2FuLmFsZ28udHM6NTUKCS8vIGFzc2VydChyZXBheS5hbW91bnQgPT09IGJ0b2kodGhpcy50eG5Hcm91cFswXS5hcHBsaWNhdGlvbkFyZ3NbMV0pKQoJZnJhbWVfZGlnIC0xIC8vIHJlcGF5OiBwYXkKCWd0eG5zIEFtb3VudAoJaW50IDAKCWd0eG5zIEFwcGxpY2F0aW9uQXJncyAxCglidG9pCgk9PQoJYXNzZXJ0CglyZXRzdWIKCmFiaV9yb3V0ZV9kZWZhdWx0VEVBTFNjcmlwdENyZWF0ZToKCWludCAxCglyZXR1cm4KCmNyZWF0ZV9Ob09wOgoJdHhuIE51bUFwcEFyZ3MKCWJ6IGFiaV9yb3V0ZV9kZWZhdWx0VEVBTFNjcmlwdENyZWF0ZQoJZXJyCgpjYWxsX05vT3A6CgltZXRob2QgImRlcG9zaXQocGF5KXZvaWQiCgltZXRob2QgIndpdGhkcmF3KHVpbnQ2NCl2b2lkIgoJbWV0aG9kICJjbG9zZU91dE9mQXBwbGljYXRpb24oKXZvaWQiCgltZXRob2QgIm9wZW5GbGFzaExvYW4odWludDY0KXZvaWQiCgltZXRob2QgImNsb3NlRmxhc2hMb2FuKHBheSl2b2lkIgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAoJbWF0Y2ggYWJpX3JvdXRlX2RlcG9zaXQgYWJpX3JvdXRlX3dpdGhkcmF3IGFiaV9yb3V0ZV9jbG9zZU91dE9mQXBwbGljYXRpb24gYWJpX3JvdXRlX29wZW5GbGFzaExvYW4gYWJpX3JvdXRlX2Nsb3NlRmxhc2hMb2FuCgllcnIKCmNhbGxfT3B0SW46CgltZXRob2QgImRlcG9zaXQocGF5KXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCBhYmlfcm91dGVfZGVwb3NpdAoJZXJy",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDkKaW50IDE="
  },
  "contract": {
    "name": "FlashLoan",
    "desc": "",
    "methods": [
      {
        "name": "deposit",
        "args": [
          {
            "name": "payment",
            "type": "pay",
            "desc": ""
          }
        ],
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        }
      },
      {
        "name": "withdraw",
        "args": [
          {
            "name": "amount",
            "type": "uint64",
            "desc": ""
          }
        ],
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        }
      },
      {
        "name": "closeOutOfApplication",
        "args": [],
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        }
      },
      {
        "name": "openFlashLoan",
        "args": [
          {
            "name": "amount",
            "type": "uint64",
            "desc": ""
          }
        ],
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        }
      },
      {
        "name": "closeFlashLoan",
        "args": [
          {
            "name": "repay",
            "type": "pay",
            "desc": ""
          }
        ],
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        }
      }
    ]
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt 
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

/**
 * Defines the types of available calls and state of the FlashLoan smart contract.
 */
export type FlashLoan = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'deposit(pay)void' | 'deposit', {
      argsObj: {
        payment: TransactionToSign | Transaction | Promise<SendTransactionResult>
      }
      argsTuple: [payment: TransactionToSign | Transaction | Promise<SendTransactionResult>]
      returns: void
    }>
    & Record<'withdraw(uint64)void' | 'withdraw', {
      argsObj: {
        amount: bigint | number
      }
      argsTuple: [amount: bigint | number]
      returns: void
    }>
    & Record<'closeOutOfApplication()void' | 'closeOutOfApplication', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
    & Record<'openFlashLoan(uint64)void' | 'openFlashLoan', {
      argsObj: {
        amount: bigint | number
      }
      argsTuple: [amount: bigint | number]
      returns: void
    }>
    & Record<'closeFlashLoan(pay)void' | 'closeFlashLoan', {
      argsObj: {
        repay: TransactionToSign | Transaction | Promise<SendTransactionResult>
      }
      argsTuple: [repay: TransactionToSign | Transaction | Promise<SendTransactionResult>]
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    local: {
      'deposited'?: IntegerState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type FlashLoanSig = keyof FlashLoan['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends FlashLoanSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the FlashLoan smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends FlashLoanSig> = FlashLoan['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the FlashLoan smart contract to the method's return type
 */
export type MethodReturn<TSignature extends FlashLoanSig> = FlashLoan['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type FlashLoanCreateCalls = (typeof FlashLoanCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type FlashLoanCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type FlashLoanDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: FlashLoanCreateCalls) => FlashLoanCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class FlashLoanCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the FlashLoan smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Gets available optIn call factories
   */
  static get optIn() {
    return {
      /**
       * Constructs an opt in call for the FlashLoan smart contract using the deposit(pay)void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      deposit(args: MethodArgs<'deposit(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return {
          method: 'deposit(pay)void' as const,
          methodArgs: Array.isArray(args) ? args : [args.payment],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the deposit(pay)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static deposit(args: MethodArgs<'deposit(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'deposit(pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.payment],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the withdraw(uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static withdraw(args: MethodArgs<'withdraw(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'withdraw(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.amount],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the closeOutOfApplication()void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static closeOutOfApplication(args: MethodArgs<'closeOutOfApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'closeOutOfApplication()void' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the openFlashLoan(uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static openFlashLoan(args: MethodArgs<'openFlashLoan(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'openFlashLoan(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.amount],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the closeFlashLoan(pay)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static closeFlashLoan(args: MethodArgs<'closeFlashLoan(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'closeFlashLoan(pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.repay],
      ...params,
    }
  }
}

/**
 * A client to make calls to the FlashLoan smart contract
 */
export class FlashLoanClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `FlashLoanClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue }
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof FlashLoan['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the FlashLoan smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: FlashLoanDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(FlashLoanCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the FlashLoan smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & CoreAppCallArgs & (OnCompleteNoOp) = {}): Promise<AppCallTransactionResultOfType<undefined>> {
        return $this.appClient.create(args) as unknown as Promise<AppCallTransactionResultOfType<undefined>>
      },
    }
  }

  /**
   * Gets available optIn methods
   */
  public get optIn() {
    const $this = this
    return {
      /**
       * Opts the user into an existing instance of the FlashLoan smart contract using the deposit(pay)void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The optIn result
       */
      async deposit(args: MethodArgs<'deposit(pay)void'>, params: AppClientCallCoreParams = {}): Promise<AppCallTransactionResultOfType<MethodReturn<'deposit(pay)void'>>> {
        return $this.mapReturnValue(await $this.appClient.optIn(FlashLoanCallFactory.optIn.deposit(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the FlashLoan smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the deposit(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public deposit(args: MethodArgs<'deposit(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FlashLoanCallFactory.deposit(args, params))
  }

  /**
   * Calls the withdraw(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public withdraw(args: MethodArgs<'withdraw(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FlashLoanCallFactory.withdraw(args, params))
  }

  /**
   * Calls the closeOutOfApplication()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public closeOutOfApplication(args: MethodArgs<'closeOutOfApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FlashLoanCallFactory.closeOutOfApplication(args, params))
  }

  /**
   * Calls the openFlashLoan(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public openFlashLoan(args: MethodArgs<'openFlashLoan(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FlashLoanCallFactory.openFlashLoan(args, params))
  }

  /**
   * Calls the closeFlashLoan(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public closeFlashLoan(args: MethodArgs<'closeFlashLoan(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FlashLoanCallFactory.closeFlashLoan(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's local state wrapped in a strongly typed accessor with options to format the stored value
   *
   * @param account The address of the account for which to read local state from
   */
  public async getLocalState(account: string | SendTransactionFrom): Promise<FlashLoan['state']['local']> {
    const state = await this.appClient.getLocalState(account)
    return {
      get deposited() {
        return FlashLoanClient.getIntegerState(state, 'deposited')
      },
    }
  }

  public compose(): FlashLoanComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      deposit(args: MethodArgs<'deposit(pay)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.deposit(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      withdraw(args: MethodArgs<'withdraw(uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.withdraw(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      closeOutOfApplication(args: MethodArgs<'closeOutOfApplication()void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.closeOutOfApplication(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      openFlashLoan(args: MethodArgs<'openFlashLoan(uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.openFlashLoan(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      closeFlashLoan(args: MethodArgs<'closeFlashLoan(pay)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.closeFlashLoan(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      get optIn() {
        const $this = this
        return {
          deposit(args: MethodArgs<'deposit(pay)void'>, params?: AppClientCallCoreParams) {
            promiseChain = promiseChain.then(() => client.optIn.deposit(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
            resultMappers.push(undefined)
            return $this
          },
        }
      },
      clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async execute() {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams: {} }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as FlashLoanComposer
  }
}
export type FlashLoanComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the deposit(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  deposit(args: MethodArgs<'deposit(pay)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, MethodReturn<'deposit(pay)void'>]>

  /**
   * Calls the withdraw(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  withdraw(args: MethodArgs<'withdraw(uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, MethodReturn<'withdraw(uint64)void'>]>

  /**
   * Calls the closeOutOfApplication()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  closeOutOfApplication(args: MethodArgs<'closeOutOfApplication()void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, MethodReturn<'closeOutOfApplication()void'>]>

  /**
   * Calls the openFlashLoan(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  openFlashLoan(args: MethodArgs<'openFlashLoan(uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, MethodReturn<'openFlashLoan(uint64)void'>]>

  /**
   * Calls the closeFlashLoan(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  closeFlashLoan(args: MethodArgs<'closeFlashLoan(pay)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, MethodReturn<'closeFlashLoan(pay)void'>]>

  /**
   * Gets available optIn methods
   */
  readonly optIn: {
    /**
     * Opts the user into an existing instance of the FlashLoan smart contract using the deposit(pay)void ABI method.
     *
     * @param args The arguments for the smart contract call
     * @param params Any additional parameters for the call
     * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
     */
    deposit(args: MethodArgs<'deposit(pay)void'>, params?: AppClientCallCoreParams): FlashLoanComposer<[...TReturns, MethodReturn<'deposit(pay)void'>]>
  }

  /**
   * Makes a clear_state call to an existing instance of the FlashLoan smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs): FlashLoanComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): FlashLoanComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Executes the transaction group and returns an array of results
   */
  execute(): Promise<FlashLoanComposerResults<TReturns>>
}
export type FlashLoanComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}

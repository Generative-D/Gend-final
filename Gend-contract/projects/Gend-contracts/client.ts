/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "hello(string)string": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "store_my_data(uint64,address[],string)uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "buy_data(uint64,address,pay)uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuYXBwcm92YWxfcHJvZ3JhbToKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBibnogbWFpbl9lbnRyeXBvaW50QDIKICAgIGNhbGxzdWIgX19pbml0X18KCm1haW5fZW50cnlwb2ludEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NgogICAgLy8gY2xhc3MgR2VuZENvbnRyYWN0KEFSQzRDb250cmFjdCk6CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9iYXJlX3JvdXRpbmdAOQogICAgbWV0aG9kICJoZWxsbyhzdHJpbmcpc3RyaW5nIgogICAgbWV0aG9kICJzdG9yZV9teV9kYXRhKHVpbnQ2NCxhZGRyZXNzW10sc3RyaW5nKXVpbnQ2NCIKICAgIG1ldGhvZCAiYnV5X2RhdGEodWludDY0LGFkZHJlc3MscGF5KXVpbnQ2NCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5faGVsbG9fcm91dGVANCBtYWluX3N0b3JlX215X2RhdGFfcm91dGVANSBtYWluX2J1eV9kYXRhX3JvdXRlQDYKICAgIGVyciAvLyByZWplY3QgdHJhbnNhY3Rpb24KCm1haW5faGVsbG9fcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEzCiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NgogICAgLy8gY2xhc3MgR2VuZENvbnRyYWN0KEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToxMwogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgaGVsbG8KICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXR1cm4KCm1haW5fc3RvcmVfbXlfZGF0YV9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MTcKICAgIC8vIEBhcmM0LmFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gaXMgbm90IGNyZWF0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo2CiAgICAvLyBjbGFzcyBHZW5kQ29udHJhY3QoQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjE3CiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgY2FsbHN1YiBzdG9yZV9teV9kYXRhCiAgICBieXRlIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnQgMQogICAgcmV0dXJuCgptYWluX2J1eV9kYXRhX3JvdXRlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMAogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBpcyBub3QgY3JlYXRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjYKICAgIC8vIGNsYXNzIEdlbmRDb250cmFjdChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludCAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnQgcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMAogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgYnV5X2RhdGEKICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXR1cm4KCm1haW5fYmFyZV9yb3V0aW5nQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo2CiAgICAvLyBjbGFzcyBHZW5kQ29udHJhY3QoQVJDNENvbnRyYWN0KToKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyByZWplY3QgdHJhbnNhY3Rpb24KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICBhc3NlcnQgLy8gaXMgY3JlYXRpbmcKICAgIGludCAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuaGVsbG8obmFtZTogYnl0ZXMpIC0+IGJ5dGVzOgpoZWxsbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEzLTE0CiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgLy8gZGVmIGhlbGxvKHNlbGYsIG5hbWU6IGFyYzQuU3RyaW5nKSAtPiBhcmM0LlN0cmluZzoKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MTUKICAgIC8vIHJldHVybiAiSGVsbG8sICIgKyBuYW1lCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMiAwCiAgICBieXRlIDB4NDg2NTZjNmM2ZjJjMjAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5nZW5kX2NvbnRyYWN0LmNvbnRyYWN0LkdlbmRDb250cmFjdC5zdG9yZV9teV9kYXRhKHVuaXF1ZV9pZDogYnl0ZXMsIG93bmVyX2FkZHI6IGJ5dGVzLCBwcm9tcHQ6IGJ5dGVzKSAtPiBieXRlczoKc3RvcmVfbXlfZGF0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjE3LTIyCiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgLy8gZGVmIHN0b3JlX215X2RhdGEoCiAgICAvLyAgICAgIHNlbGYsCiAgICAvLyAgICAgIHVuaXF1ZV9pZDogYXJjNC5VSW50NjQsCiAgICAvLyAgICAgIG93bmVyX2FkZHI6IEFkZHJBcnJheSwKICAgIC8vICAgICAgcHJvbXB0OiBhcmM0LlN0cmluZykgLT4gYXJjNC5VSW50NjQ6CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjI0CiAgICAvLyBzZWxmLnVuaXF1ZV9pZCA9IHVuaXF1ZV9pZAogICAgYnl0ZSAidW5pcXVlX2lkIgogICAgZnJhbWVfZGlnIC0zCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MjUKICAgIC8vIHNlbGYub3duZXJfYWRkciA9IG93bmVyX2FkZHIuY29weSgpCiAgICBieXRlICJvd25lcl9hZGRyIgogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MjYKICAgIC8vIHNlbGYucHJvbXB0ID0gcHJvbXB0CiAgICBieXRlICJwcm9tcHQiCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToyOAogICAgLy8gcmV0dXJuIHVuaXF1ZV9pZAogICAgZnJhbWVfZGlnIC0zCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuYnV5X2RhdGEodW5pcXVlX2lkOiBieXRlcywgYnV5ZXI6IGJ5dGVzLCB0eDogdWludDY0KSAtPiBieXRlczoKYnV5X2RhdGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMC0zMQogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBidXlfZGF0YShzZWxmLCB1bmlxdWVfaWQ6IGFyYzQuVUludDY0LCBidXllcjogYXJjNC5BZGRyZXNzLCB0eDogZ3R4bi5QYXltZW50VHJhbnNhY3Rpb24pIC0+IGFyYzQuVUludDY0OgogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMwogICAgLy8gYXNzZXJ0IFVJbnQ2NCgxMDAwMDAwKSAqIHNlbGYub3duZXJfYWRkci5sZW5ndGggPT0gdHguYW1vdW50LCAiYW1vdW50IGlzIG5vdCBtYXRjaGVkIgogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBpbnQgMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludCAxMDAwMDAwCiAgICAqCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBjb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGFtb3VudCBpcyBub3QgbWF0Y2hlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzUKICAgIC8vIGxlbiA9IHNlbGYub3duZXJfYWRkci5sZW5ndGgKICAgIGludCAwCiAgICBieXRlICJvd25lcl9hZGRyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBvd25lcl9hZGRyIGV4aXN0cwogICAgaW50IDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNgogICAgLy8gYW10ID0gdHguYW1vdW50ICogVUludDY0KDkpIC8vIFVJbnQ2NCgxMCkKICAgIGludCA5CiAgICAqCiAgICBpbnQgMTAKICAgIC8KICAgIGludCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNwogICAgLy8gZm9yIGluZGV4LCBpdGVtIGluIHVlbnVtZXJhdGUodXJhbmdlKGxlbikpOgogICAgZHVwCgpidXlfZGF0YV9mb3JfaGVhZGVyQDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNwogICAgLy8gZm9yIGluZGV4LCBpdGVtIGluIHVlbnVtZXJhdGUodXJhbmdlKGxlbikpOgogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2RpZyAwCiAgICA8CiAgICBieiBidXlfZGF0YV9hZnRlcl9mb3JANgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzgKICAgIC8vIGFkZHIgPSBzZWxmLm93bmVyX2FkZHJbaW5kZXhdLmNvcHkoKQogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50IDMyCiAgICAqCiAgICBpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBJbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzktNDIKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIC8vICAgcmVjZWl2ZXI9YWRkci5uYXRpdmUsCiAgICAvLyAgIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgLy8gKS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDEKICAgIC8vIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAwCiAgICAvCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzkKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIGludCBwYXkKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludCAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzktNDIKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIC8vICAgcmVjZWl2ZXI9YWRkci5uYXRpdmUsCiAgICAvLyAgIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgLy8gKS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjM3CiAgICAvLyBmb3IgaW5kZXgsIGl0ZW0gaW4gdWVudW1lcmF0ZSh1cmFuZ2UobGVuKSk6CiAgICBmcmFtZV9kaWcgMwogICAgaW50IDEKICAgICsKICAgIHN3YXAKICAgIGludCAxCiAgICArCiAgICBmcmFtZV9idXJ5IDIKICAgIGZyYW1lX2J1cnkgMwogICAgYiBidXlfZGF0YV9mb3JfaGVhZGVyQDEKCmJ1eV9kYXRhX2FmdGVyX2ZvckA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDQKICAgIC8vIHNlbGYub3duZXJfYWRkci5hcHBlbmQoYnV5ZXIuY29weSgpKQogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBpbnQgMzIKICAgIC8KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDUKICAgIC8vIHJldHVybiB1bmlxdWVfaWQKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuX19pbml0X18oKSAtPiB2b2lkOgpfX2luaXRfXzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjgKICAgIC8vIGRlZiBfX2luaXRfXyhzZWxmKSAtPiBOb25lOgogICAgcHJvdG8gMCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo5CiAgICAvLyBzZWxmLnVuaXF1ZV9pZCA9IGFyYzQuVUludDY0KDApCiAgICBieXRlICJ1bmlxdWVfaWQiCiAgICBieXRlIDB4MDAwMDAwMDAwMDAwMDAwMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEwCiAgICAvLyBzZWxmLnByb21wdCA9IGFyYzQuU3RyaW5nKCIiKQogICAgYnl0ZSAicHJvbXB0IgogICAgYnl0ZSAweDAwMDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToxMQogICAgLy8gc2VsZi5vd25lcl9hZGRyID0gQWRkckFycmF5KCkKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBieXRlIDB4MDAwMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1Ygo=",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuY2xlYXJfc3RhdGVfcHJvZ3JhbToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjYKICAgIC8vIGNsYXNzIEdlbmRDb250cmFjdChBUkM0Q29udHJhY3QpOgogICAgaW50IDEKICAgIHJldHVybgo="
  },
  "state": {
    "global": {
      "num_byte_slices": 3,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "owner_addr": {
          "type": "bytes",
          "key": "owner_addr"
        },
        "prompt": {
          "type": "bytes",
          "key": "prompt"
        },
        "unique_id": {
          "type": "bytes",
          "key": "unique_id"
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "GendContract",
    "methods": [
      {
        "name": "hello",
        "args": [
          {
            "type": "string",
            "name": "name"
          }
        ],
        "returns": {
          "type": "string"
        }
      },
      {
        "name": "store_my_data",
        "args": [
          {
            "type": "uint64",
            "name": "unique_id"
          },
          {
            "type": "address[]",
            "name": "owner_addr"
          },
          {
            "type": "string",
            "name": "prompt"
          }
        ],
        "returns": {
          "type": "uint64"
        }
      },
      {
        "name": "buy_data",
        "args": [
          {
            "type": "uint64",
            "name": "unique_id"
          },
          {
            "type": "address",
            "name": "buyer"
          },
          {
            "type": "pay",
            "name": "tx"
          }
        ],
        "returns": {
          "type": "uint64"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {
    "no_op": "CREATE"
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
   * Gets the state value as a BigInt.
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

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  /**
   * Any overrides for the storage schema to request for the created app; by default the schema indicated by the app spec is used.
   */
  schema?: Partial<AppStorageSchema>
}

/**
 * Defines the types of available calls and state of the GendContract smart contract.
 */
export type GendContract = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'hello(string)string' | 'hello', {
      argsObj: {
        name: string
      }
      argsTuple: [name: string]
      returns: string
    }>
    & Record<'store_my_data(uint64,address[],string)uint64' | 'store_my_data', {
      argsObj: {
        uniqueId: bigint | number
        ownerAddr: string[]
        prompt: string
      }
      argsTuple: [uniqueId: bigint | number, ownerAddr: string[], prompt: string]
      returns: bigint
    }>
    & Record<'buy_data(uint64,address,pay)uint64' | 'buy_data', {
      argsObj: {
        uniqueId: bigint | number
        buyer: string
        tx: TransactionToSign | Transaction | Promise<SendTransactionResult>
      }
      argsTuple: [uniqueId: bigint | number, buyer: string, tx: TransactionToSign | Transaction | Promise<SendTransactionResult>]
      returns: bigint
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      ownerAddr?: BinaryState
      prompt?: BinaryState
      uniqueId?: BinaryState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type GendContractSig = keyof GendContract['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends GendContractSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the GendContract smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends GendContractSig> = GendContract['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the GendContract smart contract to the method's return type
 */
export type MethodReturn<TSignature extends GendContractSig> = GendContract['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type GendContractCreateCalls = (typeof GendContractCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type GendContractCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type GendContractDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: GendContractCreateCalls) => GendContractCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class GendContractCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the GendContract smart contract using a bare call
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
   * Constructs a no op call for the hello(string)string ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static hello(args: MethodArgs<'hello(string)string'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'hello(string)string' as const,
      methodArgs: Array.isArray(args) ? args : [args.name],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the store_my_data(uint64,address[],string)uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static storeMyData(args: MethodArgs<'store_my_data(uint64,address[],string)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'store_my_data(uint64,address[],string)uint64' as const,
      methodArgs: Array.isArray(args) ? args : [args.uniqueId, args.ownerAddr, args.prompt],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the buy_data(uint64,address,pay)uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static buyData(args: MethodArgs<'buy_data(uint64,address,pay)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'buy_data(uint64,address,pay)uint64' as const,
      methodArgs: Array.isArray(args) ? args : [args.uniqueId, args.buyer, args.tx],
      ...params,
    }
  }
}

/**
 * A client to make calls to the GendContract smart contract
 */
export class GendContractClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `GendContractClient`
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
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof GendContract['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the GendContract smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: GendContractDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(GendContractCallFactory.create)
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
       * Creates a new instance of the GendContract smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      async bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<undefined, AppCreateCallTransactionResult>(await $this.appClient.create(args))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the GendContract smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the hello(string)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public hello(args: MethodArgs<'hello(string)string'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(GendContractCallFactory.hello(args, params))
  }

  /**
   * Calls the store_my_data(uint64,address[],string)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public storeMyData(args: MethodArgs<'store_my_data(uint64,address[],string)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(GendContractCallFactory.storeMyData(args, params))
  }

  /**
   * Calls the buy_data(uint64,address,pay)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public buyData(args: MethodArgs<'buy_data(uint64,address,pay)uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(GendContractCallFactory.buyData(args, params))
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
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<GendContract['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get ownerAddr() {
        return GendContractClient.getBinaryState(state, 'owner_addr')
      },
      get prompt() {
        return GendContractClient.getBinaryState(state, 'prompt')
      },
      get uniqueId() {
        return GendContractClient.getBinaryState(state, 'unique_id')
      },
    }
  }

  public compose(): GendContractComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      hello(args: MethodArgs<'hello(string)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.hello(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      storeMyData(args: MethodArgs<'store_my_data(uint64,address[],string)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.storeMyData(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      buyData(args: MethodArgs<'buy_data(uint64,address,pay)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.buyData(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
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
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as GendContractComposer
  }
}
export type GendContractComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the hello(string)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  hello(args: MethodArgs<'hello(string)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): GendContractComposer<[...TReturns, MethodReturn<'hello(string)string'>]>

  /**
   * Calls the store_my_data(uint64,address[],string)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  storeMyData(args: MethodArgs<'store_my_data(uint64,address[],string)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): GendContractComposer<[...TReturns, MethodReturn<'store_my_data(uint64,address[],string)uint64'>]>

  /**
   * Calls the buy_data(uint64,address,pay)uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  buyData(args: MethodArgs<'buy_data(uint64,address,pay)uint64'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): GendContractComposer<[...TReturns, MethodReturn<'buy_data(uint64,address,pay)uint64'>]>

  /**
   * Makes a clear_state call to an existing instance of the GendContract smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): GendContractComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): GendContractComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<GendContractComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<GendContractComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type GendContractComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type GendContractComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
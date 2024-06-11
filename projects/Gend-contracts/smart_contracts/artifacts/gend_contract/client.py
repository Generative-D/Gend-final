# flake8: noqa
# fmt: off
# mypy: disable-error-code="no-any-return, no-untyped-call, misc, type-arg"
# This file was automatically generated by algokit-client-generator.
# DO NOT MODIFY IT BY HAND.
# requires: algokit-utils@^1.2.0
import base64
import dataclasses
import decimal
import typing
from abc import ABC, abstractmethod

import algokit_utils
import algosdk
from algosdk.v2client import models
from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer,
    AtomicTransactionResponse,
    SimulateAtomicTransactionResponse,
    TransactionSigner,
    TransactionWithSigner
)

_APP_SPEC_JSON = r"""{
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
        "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuYXBwcm92YWxfcHJvZ3JhbToKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBibnogbWFpbl9lbnRyeXBvaW50QDIKICAgIGNhbGxzdWIgX19pbml0X18KCm1haW5fZW50cnlwb2ludEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NgogICAgLy8gY2xhc3MgR2VuZENvbnRyYWN0KEFSQzRDb250cmFjdCk6CiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogbWFpbl9iYXJlX3JvdXRpbmdAOQogICAgbWV0aG9kICJoZWxsbyhzdHJpbmcpc3RyaW5nIgogICAgbWV0aG9kICJzdG9yZV9teV9kYXRhKHVpbnQ2NCxhZGRyZXNzW10sc3RyaW5nKXVpbnQ2NCIKICAgIG1ldGhvZCAiYnV5X2RhdGEodWludDY0LGFkZHJlc3MscGF5KXVpbnQ2NCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5faGVsbG9fcm91dGVANCBtYWluX3N0b3JlX215X2RhdGFfcm91dGVANSBtYWluX2J1eV9kYXRhX3JvdXRlQDYKICAgIGVyciAvLyByZWplY3QgdHJhbnNhY3Rpb24KCm1haW5faGVsbG9fcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEzCiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NgogICAgLy8gY2xhc3MgR2VuZENvbnRyYWN0KEFSQzRDb250cmFjdCk6CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToxMwogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgaGVsbG8KICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXR1cm4KCm1haW5fc3RvcmVfbXlfZGF0YV9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MTcKICAgIC8vIEBhcmM0LmFiaW1ldGhvZCgpCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gaXMgbm90IGNyZWF0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo2CiAgICAvLyBjbGFzcyBHZW5kQ29udHJhY3QoQVJDNENvbnRyYWN0KToKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjE3CiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgY2FsbHN1YiBzdG9yZV9teV9kYXRhCiAgICBieXRlIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnQgMQogICAgcmV0dXJuCgptYWluX2J1eV9kYXRhX3JvdXRlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMAogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBpcyBub3QgY3JlYXRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjYKICAgIC8vIGNsYXNzIEdlbmRDb250cmFjdChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludCAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnQgcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMAogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgYnV5X2RhdGEKICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXR1cm4KCm1haW5fYmFyZV9yb3V0aW5nQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo2CiAgICAvLyBjbGFzcyBHZW5kQ29udHJhY3QoQVJDNENvbnRyYWN0KToKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyByZWplY3QgdHJhbnNhY3Rpb24KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICBhc3NlcnQgLy8gaXMgY3JlYXRpbmcKICAgIGludCAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuaGVsbG8obmFtZTogYnl0ZXMpIC0+IGJ5dGVzOgpoZWxsbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEzLTE0CiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgLy8gZGVmIGhlbGxvKHNlbGYsIG5hbWU6IGFyYzQuU3RyaW5nKSAtPiBhcmM0LlN0cmluZzoKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MTUKICAgIC8vIHJldHVybiAiSGVsbG8sLCAiICsgbmFtZQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDIgMAogICAgYnl0ZSAweDQ4NjU2YzZjNmYyYzJjMjAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5nZW5kX2NvbnRyYWN0LmNvbnRyYWN0LkdlbmRDb250cmFjdC5zdG9yZV9teV9kYXRhKHVuaXF1ZV9pZDogYnl0ZXMsIG93bmVyX2FkZHI6IGJ5dGVzLCBwcm9tcHQ6IGJ5dGVzKSAtPiBieXRlczoKc3RvcmVfbXlfZGF0YToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjE3LTIyCiAgICAvLyBAYXJjNC5hYmltZXRob2QoKQogICAgLy8gZGVmIHN0b3JlX215X2RhdGEoCiAgICAvLyAgICAgIHNlbGYsCiAgICAvLyAgICAgIHVuaXF1ZV9pZDogYXJjNC5VSW50NjQsCiAgICAvLyAgICAgIG93bmVyX2FkZHI6IEFkZHJBcnJheSwKICAgIC8vICAgICAgcHJvbXB0OiBhcmM0LlN0cmluZykgLT4gYXJjNC5VSW50NjQ6CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjI0CiAgICAvLyBzZWxmLnVuaXF1ZV9pZCA9IHVuaXF1ZV9pZAogICAgYnl0ZSAidW5pcXVlX2lkIgogICAgZnJhbWVfZGlnIC0zCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MjUKICAgIC8vIHNlbGYub3duZXJfYWRkciA9IG93bmVyX2FkZHIuY29weSgpCiAgICBieXRlICJvd25lcl9hZGRyIgogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MjYKICAgIC8vIHNlbGYucHJvbXB0ID0gcHJvbXB0CiAgICBieXRlICJwcm9tcHQiCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToyOAogICAgLy8gcmV0dXJuIHVuaXF1ZV9pZAogICAgZnJhbWVfZGlnIC0zCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuYnV5X2RhdGEodW5pcXVlX2lkOiBieXRlcywgYnV5ZXI6IGJ5dGVzLCB0eDogdWludDY0KSAtPiBieXRlczoKYnV5X2RhdGE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMC0zMQogICAgLy8gQGFyYzQuYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBidXlfZGF0YShzZWxmLCB1bmlxdWVfaWQ6IGFyYzQuVUludDY0LCBidXllcjogYXJjNC5BZGRyZXNzLCB0eDogZ3R4bi5QYXltZW50VHJhbnNhY3Rpb24pIC0+IGFyYzQuVUludDY0OgogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozMwogICAgLy8gYXNzZXJ0IFVJbnQ2NCgxMDAwMDAwKSAqIHNlbGYub3duZXJfYWRkci5sZW5ndGggPT0gdHguYW1vdW50LCAiYW1vdW50IGlzIG5vdCBtYXRjaGVkIgogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBpbnQgMAogICAgZXh0cmFjdF91aW50MTYKICAgIGludCAxMDAwMDAwCiAgICAqCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBjb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGFtb3VudCBpcyBub3QgbWF0Y2hlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzUKICAgIC8vIGxlbiA9IHNlbGYub3duZXJfYWRkci5sZW5ndGgKICAgIGludCAwCiAgICBieXRlICJvd25lcl9hZGRyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBvd25lcl9hZGRyIGV4aXN0cwogICAgaW50IDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNgogICAgLy8gYW10ID0gdHguYW1vdW50ICogVUludDY0KDkpIC8vIFVJbnQ2NCgxMCkKICAgIGludCA5CiAgICAqCiAgICBpbnQgMTAKICAgIC8KICAgIGludCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNwogICAgLy8gZm9yIGluZGV4LCBpdGVtIGluIHVlbnVtZXJhdGUodXJhbmdlKGxlbikpOgogICAgZHVwCgpidXlfZGF0YV9mb3JfaGVhZGVyQDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTozNwogICAgLy8gZm9yIGluZGV4LCBpdGVtIGluIHVlbnVtZXJhdGUodXJhbmdlKGxlbikpOgogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2RpZyAwCiAgICA8CiAgICBieiBidXlfZGF0YV9hZnRlcl9mb3JANgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzgKICAgIC8vIGFkZHIgPSBzZWxmLm93bmVyX2FkZHJbaW5kZXhdLmNvcHkoKQogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50IDMyCiAgICAqCiAgICBpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBJbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzktNDIKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIC8vICAgcmVjZWl2ZXI9YWRkci5uYXRpdmUsCiAgICAvLyAgIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgLy8gKS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDEKICAgIC8vIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2RpZyAwCiAgICAvCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzkKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIGludCBwYXkKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludCAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6MzktNDIKICAgIC8vIGl0eG4uUGF5bWVudCgKICAgIC8vICAgcmVjZWl2ZXI9YWRkci5uYXRpdmUsCiAgICAvLyAgIGFtb3VudD0gYW10IC8vIChsZW4pLAogICAgLy8gKS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjM3CiAgICAvLyBmb3IgaW5kZXgsIGl0ZW0gaW4gdWVudW1lcmF0ZSh1cmFuZ2UobGVuKSk6CiAgICBmcmFtZV9kaWcgMwogICAgaW50IDEKICAgICsKICAgIHN3YXAKICAgIGludCAxCiAgICArCiAgICBmcmFtZV9idXJ5IDIKICAgIGZyYW1lX2J1cnkgMwogICAgYiBidXlfZGF0YV9mb3JfaGVhZGVyQDEKCmJ1eV9kYXRhX2FmdGVyX2ZvckA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDQKICAgIC8vIHNlbGYub3duZXJfYWRkci5hcHBlbmQoYnV5ZXIuY29weSgpKQogICAgaW50IDAKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIG93bmVyX2FkZHIgZXhpc3RzCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgbGVuCiAgICBpbnQgMzIKICAgIC8KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2dlbmRfY29udHJhY3QvY29udHJhY3QucHk6NDUKICAgIC8vIHJldHVybiB1bmlxdWVfaWQKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZ2VuZF9jb250cmFjdC5jb250cmFjdC5HZW5kQ29udHJhY3QuX19pbml0X18oKSAtPiB2b2lkOgpfX2luaXRfXzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjgKICAgIC8vIGRlZiBfX2luaXRfXyhzZWxmKSAtPiBOb25lOgogICAgcHJvdG8gMCAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weTo5CiAgICAvLyBzZWxmLnVuaXF1ZV9pZCA9IGFyYzQuVUludDY0KDApCiAgICBieXRlICJ1bmlxdWVfaWQiCiAgICBieXRlIDB4MDAwMDAwMDAwMDAwMDAwMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9nZW5kX2NvbnRyYWN0L2NvbnRyYWN0LnB5OjEwCiAgICAvLyBzZWxmLnByb21wdCA9IGFyYzQuU3RyaW5nKCIiKQogICAgYnl0ZSAicHJvbXB0IgogICAgYnl0ZSAweDAwMDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvZ2VuZF9jb250cmFjdC9jb250cmFjdC5weToxMQogICAgLy8gc2VsZi5vd25lcl9hZGRyID0gQWRkckFycmF5KCkKICAgIGJ5dGUgIm93bmVyX2FkZHIiCiAgICBieXRlIDB4MDAwMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1Ygo=",
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
}"""
APP_SPEC = algokit_utils.ApplicationSpecification.from_json(_APP_SPEC_JSON)
_TReturn = typing.TypeVar("_TReturn")


class _ArgsBase(ABC, typing.Generic[_TReturn]):
    @staticmethod
    @abstractmethod
    def method() -> str:
        ...


_TArgs = typing.TypeVar("_TArgs", bound=_ArgsBase[typing.Any])


@dataclasses.dataclass(kw_only=True)
class _TArgsHolder(typing.Generic[_TArgs]):
    args: _TArgs


def _filter_none(value: dict | typing.Any) -> dict | typing.Any:
    if isinstance(value, dict):
        return {k: _filter_none(v) for k, v in value.items() if v is not None}
    return value


def _as_dict(data: typing.Any, *, convert_all: bool = True) -> dict[str, typing.Any]:
    if data is None:
        return {}
    if not dataclasses.is_dataclass(data):
        raise TypeError(f"{data} must be a dataclass")
    if convert_all:
        result = dataclasses.asdict(data)
    else:
        result = {f.name: getattr(data, f.name) for f in dataclasses.fields(data)}
    return _filter_none(result)


def _convert_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.TransactionParametersDict:
    return typing.cast(algokit_utils.TransactionParametersDict, _as_dict(transaction_parameters))


def _convert_call_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.OnCompleteCallParametersDict:
    return typing.cast(algokit_utils.OnCompleteCallParametersDict, _as_dict(transaction_parameters))


def _convert_create_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
    on_complete: algokit_utils.OnCompleteActionName,
) -> algokit_utils.CreateCallParametersDict:
    result = typing.cast(algokit_utils.CreateCallParametersDict, _as_dict(transaction_parameters))
    on_complete_enum = on_complete.replace("_", " ").title().replace(" ", "") + "OC"
    result["on_complete"] = getattr(algosdk.transaction.OnComplete, on_complete_enum)
    return result


def _convert_deploy_args(
    deploy_args: algokit_utils.DeployCallArgs | None,
) -> algokit_utils.ABICreateCallArgsDict | None:
    if deploy_args is None:
        return None

    deploy_args_dict = typing.cast(algokit_utils.ABICreateCallArgsDict, _as_dict(deploy_args))
    if isinstance(deploy_args, _TArgsHolder):
        deploy_args_dict["args"] = _as_dict(deploy_args.args)
        deploy_args_dict["method"] = deploy_args.args.method()

    return deploy_args_dict


@dataclasses.dataclass(kw_only=True)
class HelloArgs(_ArgsBase[str]):
    name: str

    @staticmethod
    def method() -> str:
        return "hello(string)string"


@dataclasses.dataclass(kw_only=True)
class StoreMyDataArgs(_ArgsBase[int]):
    unique_id: int
    owner_addr: list[str]
    prompt: str

    @staticmethod
    def method() -> str:
        return "store_my_data(uint64,address[],string)uint64"


@dataclasses.dataclass(kw_only=True)
class BuyDataArgs(_ArgsBase[int]):
    unique_id: int
    buyer: str
    tx: TransactionWithSigner

    @staticmethod
    def method() -> str:
        return "buy_data(uint64,address,pay)uint64"


class ByteReader:
    def __init__(self, data: bytes):
        self._data = data

    @property
    def as_bytes(self) -> bytes:
        return self._data

    @property
    def as_str(self) -> str:
        return self._data.decode("utf8")

    @property
    def as_base64(self) -> str:
        return base64.b64encode(self._data).decode("utf8")

    @property
    def as_hex(self) -> str:
        return self._data.hex()


class GlobalState:
    def __init__(self, data: dict[bytes, bytes | int]):
        self.owner_addr = ByteReader(typing.cast(bytes, data.get(b"owner_addr")))
        self.prompt = ByteReader(typing.cast(bytes, data.get(b"prompt")))
        self.unique_id = ByteReader(typing.cast(bytes, data.get(b"unique_id")))


@dataclasses.dataclass(kw_only=True)
class SimulateOptions:
    allow_more_logs: bool = dataclasses.field(default=False)
    allow_empty_signatures: bool = dataclasses.field(default=False)
    extra_opcode_budget: int = dataclasses.field(default=0)
    exec_trace_config: models.SimulateTraceConfig | None         = dataclasses.field(default=None)


class Composer:

    def __init__(self, app_client: algokit_utils.ApplicationClient, atc: AtomicTransactionComposer):
        self.app_client = app_client
        self.atc = atc

    def build(self) -> AtomicTransactionComposer:
        return self.atc

    def simulate(self, options: SimulateOptions | None = None) -> SimulateAtomicTransactionResponse:
        request = models.SimulateRequest(
            allow_more_logs=options.allow_more_logs,
            allow_empty_signatures=options.allow_empty_signatures,
            extra_opcode_budget=options.extra_opcode_budget,
            exec_trace_config=options.exec_trace_config,
            txn_groups=[]
        ) if options else None
        result = self.atc.simulate(self.app_client.algod_client, request)
        return result

    def execute(self) -> AtomicTransactionResponse:
        return self.app_client.execute_atc(self.atc)

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = HelloArgs(
            name=name,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def store_my_data(
        self,
        *,
        unique_id: int,
        owner_addr: list[str],
        prompt: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `store_my_data(uint64,address[],string)uint64` ABI method
        
        :param int unique_id: The `unique_id` ABI parameter
        :param list[str] owner_addr: The `owner_addr` ABI parameter
        :param str prompt: The `prompt` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = StoreMyDataArgs(
            unique_id=unique_id,
            owner_addr=owner_addr,
            prompt=prompt,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def buy_data(
        self,
        *,
        unique_id: int,
        buyer: str,
        tx: TransactionWithSigner,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `buy_data(uint64,address,pay)uint64` ABI method
        
        :param int unique_id: The `unique_id` ABI parameter
        :param str buyer: The `buyer` ABI parameter
        :param TransactionWithSigner tx: The `tx` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = BuyDataArgs(
            unique_id=unique_id,
            buyer=buyer,
            tx=tx,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to create an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        self.app_client.compose_create(
            self.atc,
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return self

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> "Composer":
        """Adds a call to the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass"""
    
        self.app_client.compose_clear_state(self.atc, _convert_transaction_parameters(transaction_parameters), app_args)
        return self


class GendContractClient:
    """A class for interacting with the GendContract app providing high productivity and
    strongly typed methods to deploy and call the app"""

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account | None = None,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        """
        GendContractClient can be created with an app_id to interact with an existing application, alternatively
        it can be created with a creator and indexer_client specified to find existing applications by name and creator.
        
        :param AlgodClient algod_client: AlgoSDK algod client
        :param int app_id: The app_id of an existing application, to instead find the application by creator and name
        use the creator and indexer_client parameters
        :param str | Account creator: The address or Account of the app creator to resolve the app_id
        :param IndexerClient indexer_client: AlgoSDK indexer client, only required if deploying or finding app_id by
        creator and app name
        :param AppLookup existing_deployments:
        :param TransactionSigner | Account signer: Account or signer to use to sign transactions, if not specified and
        creator was passed as an Account will use that.
        :param str sender: Address to use as the sender for all transactions, will use the address associated with the
        signer if not specified.
        :param TemplateValueMapping template_values: Values to use for TMPL_* template variables, dictionary keys should
        *NOT* include the TMPL_ prefix
        :param str | None app_name: Name of application to use when deploying, defaults to name defined on the
        Application Specification
            """

        self.app_spec = APP_SPEC
        
        # calling full __init__ signature, so ignoring mypy warning about overloads
        self.app_client = algokit_utils.ApplicationClient(  # type: ignore[call-overload, misc]
            algod_client=algod_client,
            app_spec=self.app_spec,
            app_id=app_id,
            creator=creator,
            indexer_client=indexer_client,
            existing_deployments=existing_deployments,
            signer=signer,
            sender=sender,
            suggested_params=suggested_params,
            template_values=template_values,
            app_name=app_name,
        )

    @property
    def algod_client(self) -> algosdk.v2client.algod.AlgodClient:
        return self.app_client.algod_client

    @property
    def app_id(self) -> int:
        return self.app_client.app_id

    @app_id.setter
    def app_id(self, value: int) -> None:
        self.app_client.app_id = value

    @property
    def app_address(self) -> str:
        return self.app_client.app_address

    @property
    def sender(self) -> str | None:
        return self.app_client.sender

    @sender.setter
    def sender(self, value: str) -> None:
        self.app_client.sender = value

    @property
    def signer(self) -> TransactionSigner | None:
        return self.app_client.signer

    @signer.setter
    def signer(self, value: TransactionSigner) -> None:
        self.app_client.signer = value

    @property
    def suggested_params(self) -> algosdk.transaction.SuggestedParams | None:
        return self.app_client.suggested_params

    @suggested_params.setter
    def suggested_params(self, value: algosdk.transaction.SuggestedParams | None) -> None:
        self.app_client.suggested_params = value

    def get_global_state(self) -> GlobalState:
        """Returns the application's global state wrapped in a strongly typed class with options to format the stored value"""

        state = typing.cast(dict[bytes, bytes | int], self.app_client.get_global_state(raw=True))
        return GlobalState(state)

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[str]:
        """Calls `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[str]: The result of the transaction"""

        args = HelloArgs(
            name=name,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def store_my_data(
        self,
        *,
        unique_id: int,
        owner_addr: list[str],
        prompt: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[int]:
        """Calls `store_my_data(uint64,address[],string)uint64` ABI method
        
        :param int unique_id: The `unique_id` ABI parameter
        :param list[str] owner_addr: The `owner_addr` ABI parameter
        :param str prompt: The `prompt` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[int]: The result of the transaction"""

        args = StoreMyDataArgs(
            unique_id=unique_id,
            owner_addr=owner_addr,
            prompt=prompt,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def buy_data(
        self,
        *,
        unique_id: int,
        buyer: str,
        tx: TransactionWithSigner,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[int]:
        """Calls `buy_data(uint64,address,pay)uint64` ABI method
        
        :param int unique_id: The `unique_id` ABI parameter
        :param str buyer: The `buyer` ABI parameter
        :param TransactionWithSigner tx: The `tx` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[int]: The result of the transaction"""

        args = BuyDataArgs(
            unique_id=unique_id,
            buyer=buyer,
            tx=tx,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Creates an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.TransactionResponse: The result of the transaction"""

        result = self.app_client.create(
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return result

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Calls the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass
        :returns algokit_utils.TransactionResponse: The result of the transaction"""
    
        return self.app_client.clear_state(_convert_transaction_parameters(transaction_parameters), app_args)

    def deploy(
        self,
        version: str | None = None,
        *,
        signer: TransactionSigner | None = None,
        sender: str | None = None,
        allow_update: bool | None = None,
        allow_delete: bool | None = None,
        on_update: algokit_utils.OnUpdate = algokit_utils.OnUpdate.Fail,
        on_schema_break: algokit_utils.OnSchemaBreak = algokit_utils.OnSchemaBreak.Fail,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        create_args: algokit_utils.DeployCallArgs | None = None,
        update_args: algokit_utils.DeployCallArgs | None = None,
        delete_args: algokit_utils.DeployCallArgs | None = None,
    ) -> algokit_utils.DeployResponse:
        """Deploy an application and update client to reference it.
        
        Idempotently deploy (create, update/delete if changed) an app against the given name via the given creator
        account, including deploy-time template placeholder substitutions.
        To understand the architecture decisions behind this functionality please see
        <https://github.com/algorandfoundation/algokit-cli/blob/main/docs/architecture-decisions/2023-01-12_smart-contract-deployment.md>
        
        ```{note}
        If there is a breaking state schema change to an existing app (and `on_schema_break` is set to
        'ReplaceApp' the existing app will be deleted and re-created.
        ```
        
        ```{note}
        If there is an update (different TEAL code) to an existing app (and `on_update` is set to 'ReplaceApp')
        the existing app will be deleted and re-created.
        ```
        
        :param str version: version to use when creating or updating app, if None version will be auto incremented
        :param algosdk.atomic_transaction_composer.TransactionSigner signer: signer to use when deploying app
        , if None uses self.signer
        :param str sender: sender address to use when deploying app, if None uses self.sender
        :param bool allow_delete: Used to set the `TMPL_DELETABLE` template variable to conditionally control if an app
        can be deleted
        :param bool allow_update: Used to set the `TMPL_UPDATABLE` template variable to conditionally control if an app
        can be updated
        :param OnUpdate on_update: Determines what action to take if an application update is required
        :param OnSchemaBreak on_schema_break: Determines what action to take if an application schema requirements
        has increased beyond the current allocation
        :param dict[str, int|str|bytes] template_values: Values to use for `TMPL_*` template variables, dictionary keys
        should *NOT* include the TMPL_ prefix
        :param algokit_utils.DeployCallArgs | None create_args: Arguments used when creating an application
        :param algokit_utils.DeployCallArgs | None update_args: Arguments used when updating an application
        :param algokit_utils.DeployCallArgs | None delete_args: Arguments used when deleting an application
        :return DeployResponse: details action taken and relevant transactions
        :raises DeploymentError: If the deployment failed"""

        return self.app_client.deploy(
            version,
            signer=signer,
            sender=sender,
            allow_update=allow_update,
            allow_delete=allow_delete,
            on_update=on_update,
            on_schema_break=on_schema_break,
            template_values=template_values,
            create_args=_convert_deploy_args(create_args),
            update_args=_convert_deploy_args(update_args),
            delete_args=_convert_deploy_args(delete_args),
        )

    def compose(self, atc: AtomicTransactionComposer | None = None) -> Composer:
        return Composer(self.app_client, atc or AtomicTransactionComposer())

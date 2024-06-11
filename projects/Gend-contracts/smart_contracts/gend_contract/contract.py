from algopy import *
import typing

AddrArray: typing.TypeAlias = arc4.DynamicArray[arc4.Address]

class GendContract(ARC4Contract):

    def __init__(self) -> None:
        self.unique_id = arc4.UInt64(0)
        self.prompt = arc4.String("")
        self.owner_addr = AddrArray()

    @arc4.abimethod()
    def hello(self, name: arc4.String) -> arc4.String:
        return "Hello, " + name

    @arc4.abimethod()
    def store_my_data(
         self, 
         unique_id: arc4.UInt64,
         owner_addr: AddrArray, 
         prompt: arc4.String) -> arc4.UInt64:
        
        self.unique_id = unique_id
        self.owner_addr = owner_addr.copy()
        self.prompt = prompt

        return unique_id

    @arc4.abimethod()
    def buy_data(self, unique_id: arc4.UInt64, buyer: arc4.Address, tx: gtxn.PaymentTransaction) -> arc4.UInt64:
         
         assert UInt64(1000000) * self.owner_addr.length == tx.amount, "amount is not matched"

         len = self.owner_addr.length
         amt = tx.amount * UInt64(9) // UInt64(10)
         for index, item in uenumerate(urange(len)):
            addr = self.owner_addr[index].copy()
            itxn.Payment(
              receiver=addr.native,
              amount= amt // (len),
            ).submit()

         self.owner_addr.append(buyer.copy())
         return unique_id

//import * as algokit from "@algorandfoundation/algokit-utils";
import { HelloWorldClient } from "./contracts/gend";
import * as algokit from "@algorandfoundation/algokit-utils";
export const helloNft = async (helloWorldAppClient: HelloWorldClient) => {
  const name = "NFT";
  try {
    const result = await helloWorldAppClient.hello({
      name,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
//uint64,address[],uint64,string,string,string,string,string[],string
export const storeMyNft = async (
  helloWorldAppClient: HelloWorldClient,
  activeAddress: string
) => {
  const nft = {
    uniqueId: BigInt("1"),
    prompt: "1 1 1",
  };
  try {
    const result = await helloWorldAppClient.storeMyData({
      uniqueId: nft.uniqueId,
      ownerAddr: [activeAddress],
      prompt: nft.prompt,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export const buyNft = async (
  algorand: algokit.AlgorandClient,
  helloWorldAppClient: HelloWorldClient,
  activeAddress: string
) => {
  const nft = {
    uniqueId: BigInt("1"),
  };

  const buyerTxn = await algorand.transactions.payment({
    sender: activeAddress,
    receiver: activeAddress,
    amount: algokit.algos(0.1 + 0.1),
    extraFee: algokit.algos(0.001),
  });

  try {
    const result = await helloWorldAppClient.buyData({
      uniqueId: nft.uniqueId,
      buyer: activeAddress,
      tx: buyerTxn,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

//uint64,address,pay
// export const buyNft = async (
//   algorand: algokit.AlgorandClient,
//   helloWorldAppClient: HelloWorldClient,
//   sender: string,
//   appAddress: string
// ) => {
// const buyerTxn = await algorand.transactions.payment({
//   sender,
//   receiver: appAddress,
//   amount :algokit.microAlgos(Number(1)),
// });
// try{
//   //const ass
// }
//};

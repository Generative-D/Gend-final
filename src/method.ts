import * as algokit from "@algorandfoundation/algokit-utils";
import { HelloWorldClient } from "./contracts/gend";

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
export const storeMyNft = async (helloWorldAppClient: HelloWorldClient) => {
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
//uint64,address,pay
export const buyNft = async (
  algorand: algokit.AlgorandClient,
  helloWorldAppClient: HelloWorldClient,
  sender: string,
  appAddress: string
) => {
  // const buyerTxn = await algorand.transactions.payment({
  //   sender,
  //   receiver: appAddress,
  //   amount :algokit.microAlgos(Number(1)),
  // });
  // try{
  //   //const ass
  // }
};

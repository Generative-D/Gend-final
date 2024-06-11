//import * as algokit from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import { GendContractClient } from "./contracts/gend";
import * as algokit from "@algorandfoundation/algokit-utils";
import { gedDAppId } from "./utils/helloWorldAppId";

export const helloNft = async (helloWorldAppClient: GendContractClient) => {
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
//uniqueId,ownerAddr,prompt
export const storeMyNft = async (
  helloWorldAppClient: GendContractClient,
  activeAddress: string
) => {
  const nft = {
    uniqueId: BigInt("2"),
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
  helloWorldAppClient: GendContractClient,
  activeAddress: string,
  amount: number
) => {
  const nft = {
    uniqueId: BigInt("1"),
  };
  const appAddress = algosdk.getApplicationAddress(gedDAppId);
  const buyerTxn = await algorand.transactions.payment({
    sender: activeAddress, // 돈을 보내는 사람
    receiver: appAddress, // 돈을 받는 사람
    amount: algokit.algos(1), // 이만큼을 지불하겠다 : seller에게 가는 돈
    extraFee: algokit.algos(5),
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

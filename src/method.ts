import * as algokit from "@algorandfoundation/algokit-utils";
import { HelloWorldClient } from "./contracts/gend";
import { helloWorldAppId } from "./utils/helloWorldAppId";

export const storeNft = async (
  algorand: algokit.AlgorandClient,
  helloWorldAppClient: HelloWorldClient,
  sender: string
  //   unitaryPrice: bigint,
  //   quantity: bigint,
  //   assetBeingSold: bigint,
) => {
  const storeResult = await helloWorldAppClient.create.bare();

  //   const mbrTxn = await algorand.transactions.payment({
  //     sender,
  //     receiver: storeResult.appAddress,
  //     amount: algokit.algos(0.1 + 0.1),
  //   });

  const name = "NFT";

  await helloWorldAppClient.hello({
    name,
  });

  await algorand
    .newGroup()
    .addMethodCall({
      sender: sender,
      appId: BigInt(helloWorldAppId),
      method: helloWorldAppClient.appClient.getABIMethod("hello")!,
      args: [storeResult.appId],
    })
    .execute();
};

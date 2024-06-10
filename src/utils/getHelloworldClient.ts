import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { TransactionSigner } from "algosdk";
import { HelloWorldClient } from "../contracts/gend";

export const getHelloWorldClient = (
  algorandClient: AlgorandClient,
  currentAppId: bigint | number,
  activeAddress: string,
  signer: TransactionSigner
): HelloWorldClient => {
  const helloWorldClient = new HelloWorldClient(
    {
      resolveBy: "id",
      id: currentAppId,
      sender: { addr: activeAddress, signer },
    },
    algorandClient.client.algod
  );
  return helloWorldClient;
};

import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { TransactionSigner } from "algosdk";
import { HelloWorldClient } from "../contracts/gend";
import { helloWorldAppId } from "./helloWorldAppId";

export const getHelloWorldClient = (
  algorandClient: AlgorandClient,
  activeAddress: string,
  signer: TransactionSigner
): HelloWorldClient => {
  const helloWorldClient = new HelloWorldClient(
    {
      resolveBy: "id",
      id: helloWorldAppId,
      sender: { addr: activeAddress, signer },
    },
    algorandClient.client.algod
  );
  return helloWorldClient;
};

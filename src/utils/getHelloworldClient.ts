import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { TransactionSigner } from "algosdk";
import { GendContractClient } from "../contracts/gend";
import { gedDAppId } from "./helloWorldAppId";

export const getHelloWorldClient = (
  algorandClient: AlgorandClient,
  activeAddress: string,
  signer: TransactionSigner
): GendContractClient => {
  const helloWorldClient = new GendContractClient(
    {
      resolveBy: "id",
      id: gedDAppId,
      sender: { addr: activeAddress, signer },
    },
    algorandClient.client.algod
  );
  return helloWorldClient;
};

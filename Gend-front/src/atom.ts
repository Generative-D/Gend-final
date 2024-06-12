import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { atom } from "jotai";
import { GendContractClient } from "./contracts/gend";

export const algorandClientAtom = atom<AlgorandClient | null>(null);
export const helloWorldClientAtom = atom<GendContractClient | null>(null);
export const isSellingAtom = atom<boolean>(false);

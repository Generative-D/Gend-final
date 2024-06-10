import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { atom } from "jotai";
import { HelloWorldClient } from "./contracts/gend";

export const algorandClientAtom = atom<AlgorandClient | null>(null);
export const helloWorldClientAtom = atom<HelloWorldClient | null>(null);
export const isSellingAtom = atom<boolean>(false);
export const healthAtom = atom<boolean>(false);

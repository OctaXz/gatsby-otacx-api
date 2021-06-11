import BigNumber from "bignumber.js";
import { getContract } from "./web3";
import router from "./abis/pancakerouterv2.json";

const routerAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
const contract = getContract(router, routerAdress);

export const getAmountsIn = async (amount:number,pairs:Array<string>): Promise<BigNumber> => {
  const [amountIn,amountOut] = await contract.methods.getAmountsIn(amount,pairs).call();

  return new BigNumber(amountOut);
};
import { ChainId, Token } from "@pancakeswap-libs/sdk";

// BEP-20 addresses.
export const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
export const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const DEAD = "0x000000000000000000000000000000000000dEaD";

// Contract addresses.
export const CAKE_BNB_FARM = "0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6";
export const MASTERCHEF_CONTRACT = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";
export const LOTTERY_CONTRACT = "0x06Aa6fF2aF2b656AA555622383ac8339a23Ab9f1";
export const MULTICALL_CONTRACT = "0x174BE9fBcc00D93A3d447Bc01d0918EbB7F17bA6" ;

// PancakeSwap SDK Token.
export const CAKE_TOKEN = new Token(ChainId.MAINNET, CAKE, 18);
export const WBNB_TOKEN = new Token(ChainId.MAINNET, WBNB, 18);
export const CAKE_BNB_TOKEN = new Token(ChainId.MAINNET, CAKE_BNB_FARM, 18);



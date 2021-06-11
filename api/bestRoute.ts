import { NowRequest, NowRequestQuery, NowResponse } from "@vercel/node";
import { getAmountsIn , getAmountOut } from '../utils/findRate'
import {getBurnedSupply, getTotalSupply} from "../utils/supply";
import pairToken from "../utils/tokenPair";

interface pairInfo {
    token0: string
    token1: string
}

interface stringToken {
    tid: number
    tokenSymbol: string;
    tokenAddress: string;
}

const pairs:pairInfo[] = [{
    token0: '',
    token1: ''
}]

const botToken: stringToken[] = [
    {
      tid: 0,
      tokenSymbol: 'WBNB',
      tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 
    }, 
    {
      tid: 1,
      tokenSymbol: 'BUSD',
      tokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 
    }, 
    {
      tid: 2,
      tokenSymbol: 'USDT',
      tokenAddress: '0x55d398326f99059fF775485246999027B3197955',  
    }, 
    {
      tid: 3,
      tokenSymbol: 'USDC',
      tokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 

    }, 
    {
      tid: 4,
      tokenSymbol: 'UST',
      tokenAddress: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC', 
    }, 
    {
      tid: 5,
      tokenSymbol: 'OCTAX',
      tokenAddress:'0x39cab1DdaFDa34B9202F5a41f71B15d2F3EbA2aC', 
    }, 
    {
      tid: 6,
      tokenSymbol: 'OCTAG',
      tokenAddress: '0x4F1498da0f50F94e97F900b7e6E13d8e5220aBE9',  
    }, 
    {
      tid: 7,
      tokenSymbol: 'ADA',
      tokenAddress:
           '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', 
     
    }, 
    {
      tid: 8,
      tokenSymbol: 'CAKE',
      tokenAddress:
           '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 
   
    },   
    {
      tid: 9,
      tokenSymbol: 'BAT',
      tokenAddress:
           '0x101d82428437127bF1608F699CD651e6Abf9766E', 
     
    },
    {
      tid: 10,
      tokenSymbol: 'BCH',
      tokenAddress:
           '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf', 
      
    },
    {
      tid: 11,
      tokenSymbol: 'COMP',
      tokenAddress:
           '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8', 
    
    },
    {
      tid: 12,
      tokenSymbol: 'DOGE',
      tokenAddress:
           '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 
     
    },
    {
      tid: 13,
      tokenSymbol: 'EOS',
      tokenAddress:
           '0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6', 
     
    },
    {
      tid: 14,
      tokenSymbol: 'ETH',
      tokenAddress:
           '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', 
       
    },
    {
      tid: 15,
      tokenSymbol: 'LINK',
      tokenAddress:
           '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', 
     
    },
    {
      tid: 16,
      tokenSymbol: 'LTC',
      tokenAddress:
           '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94', 
       
    },
    {
      tid: 17,
      tokenSymbol: 'TRX',
      tokenAddress:
           '0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B', 
       
    },
    {
      tid: 18,
      tokenSymbol: 'ZEC',
      tokenAddress:
           '0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb', 
        
    },
    {
      tid: 19,
      tokenSymbol: 'ZIL',
      tokenAddress:
           '0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787', 
      
    },
  ]


export default async (req: NowRequest, res: NowResponse): Promise<void> => {

    const { amount, tokenid } = req.query ;
    const amountVal = typeof amount !== "undefined" ? Number(amount) : 0
    const tokenIdVal = typeof tokenid !== "undefined" ? Number(tokenid) : -1
    // if(amount || tokenid) return 0
    const pair0 = botToken.filter((b)=>b.tid===tokenIdVal)[0].tokenAddress // bot address

    const pair1 = '0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787'
    const amountOut =  await getAmountOut(amountVal, [pair0,pair1]);
    let routes = []
    for (let i =0 ;  i < pairToken.length ;i++)
    {

    }

  res.json({
    amountOut: amountOut.toNumber()
  });
};

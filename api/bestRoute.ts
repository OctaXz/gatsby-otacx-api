import { NowRequest, NowRequestQuery, NowResponse } from "@vercel/node";
import {  AmountProps} from '../utils/findRate'
import {getBurnedSupply, getTotalSupply} from "../utils/supply";
import pairToken from "../utils/tokenPair";
import {PromisifyBatchRequest} from "../lib/PromiseBatchRequest";
import {getContract} from "../utils/web3";
import router from "../utils/abis/pancakerouterv2.json";
import BigNumber from "bignumber.js";
import {sha3Raw} from "web3-utils";

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
      tid: 1,
      tokenSymbol: 'BUSD',
      tokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    },
    {
      tid: 2,
      tokenSymbol: 'ADA',
      tokenAddress: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47'
    }
  ]

const routerAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
const contract = getContract(router, routerAdress);



const fetchBestPrice = async (originalSymbol : string ,originTokenAddress : string ,amountVal :number , amountValFix : string) => {

    const pairActual = pairToken.filter((b) => b.tokenAddress !== originTokenAddress)
    const pairBUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    const batch1 = new PromisifyBatchRequest();
    const batch2 = new PromisifyBatchRequest();
    // #################################### FETCH SWAP AMOUNT ORIGINAL TO TARGET TOKEN #############################################
    const allPairTokens = pairActual.filter((b) => b.tokenAddress !== originTokenAddress).map(async (target) => {
        const targetToken = target.tokenAddress
        const amountMul = new BigNumber(amountValFix)
        batch1.add(contract.methods.getAmountsOut(amountMul, [originTokenAddress, targetToken]).call)
    })

    //###################################### FETCH PRICE ALL TARGET TOKEN ##########################################################
    const pricePairTokens = pairActual.filter((b) => b.tokenAddress !== originTokenAddress).map((target) => {
        const amountMul = new BigNumber(1).times(1e18).toFixed()
        // botToken.filter((b)=>b.tokenSymbol !=="BUSD")[0].tokenAddress
        batch2.add(contract.methods.getAmountsOut(amountMul, [target.tokenAddress, pairBUSD]).call)
    })


    let originValue = amountVal
    let originPricePerUnit =  amountVal
    if (originTokenAddress != pairBUSD )
    {
        const amountMul = new BigNumber(1).times(1e18).toFixed()
        batch2.add(contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call)
    }

    const amountTokens =  await  batch1.execute()
    //  console.log(amountTokens)
    const amountPrices = await batch2.execute()
    // console.log(amountPrices)

    if (originTokenAddress != pairBUSD )
    {
        const originCheckVal  = amountPrices[amountPrices.length - 1 ]
        // @ts-ignore
        originPricePerUnit = new BigNumber(originCheckVal[1]).div(1e18).toNumber()
        originValue = originPricePerUnit * amountVal
    }
    //###################################### MAPPING BETWEEN PRICE AND AMOUNT TARGET TOKEN ########################################
    const resultX = amountTokens.map((info ,index  ) =>
    {
            const targetTokenInfo = pairActual[index]
            // @ts-ignore
            // console.log(info[0],info[1])
            // @ts-ignore
            const amountOriginTokenFix = info[0]
            const amountOriginToken = new BigNumber(amountOriginTokenFix).div(1e18).toNumber()
            // @ts-ignore
            const amountTargetTokenFix = info[1]
            const amountTargetToken = new BigNumber(amountTargetTokenFix).div(1e18).toNumber()

            const targetSymbol = targetTokenInfo.tokenSymbol
            const targetAddress = targetTokenInfo.tokenAddress
            // const tokenB = n.tokenB
            // @ts-ignore
            const targetPricePerBUSD = new BigNumber(amountPrices[index][1]).div(1e18).toNumber()

            // @ts-ignore
            const targetQtyPerUnit = new BigNumber(amountPrices[index][0]).div(1e18).toNumber()
            // //
            const targetValue = amountTargetToken * targetPricePerBUSD

            // //
            //  console.log("amountTokenA,amountTokenB,tokenA,tokenB,pricePerBUSD,tokenValue",amountTokenA,amountTokenB,tokenA, tokenAddress ,pricePerBUSD,amountTokenA_Remaining,tokenValue)
            //return [amountTokenA, amountTokenB, tokenA_Address, tokenAddress, pricePerBUSD, amountTokenA_Remaining, tokenValue, tokenA]

        return {
                "originTokenAddress": originTokenAddress ,
                "originSymbol": originalSymbol ,
                "originAmount" : amountOriginToken,
                "originAmountFix" : amountOriginTokenFix,
                "originPricePerUnit" : originPricePerUnit,
                "originValue" : originValue,
                "targetTokenAddress" : targetAddress,
                "targetSymbol" : targetSymbol,
                "targetAmount" : amountTargetToken,
                "targetAmountFix" : amountTargetTokenFix,
                "targetPricePerBUSD" : targetPricePerBUSD,
                "targetValue" : targetValue
                }


    });
    return resultX;
}

const fetchReturnToken = async (originalSymbol : string ,originTokenAddress : string ,currentAmount :number , currentAmountFix :string , targetTokenSymbol:string, targetTokenAddress:string) => {

    const batch1 = new PromisifyBatchRequest();
    const batch2 = new PromisifyBatchRequest();
    const amountMul1 = new BigNumber(currentAmountFix)
    batch1.add(contract.methods.getAmountsOut(amountMul1, [originTokenAddress,targetTokenAddress]).call)

    const amountMul2 = new BigNumber(1).times(1e18).toFixed()
    const pairBUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

    if  (targetTokenAddress !== pairBUSD) {
        batch2.add(contract.methods.getAmountsOut(amountMul2, [targetTokenAddress, pairBUSD]).call)
    }


    let originValue = currentAmount
    let originPricePerUnit =  currentAmount
    if (originTokenAddress != pairBUSD )
    {
        const amountMul = new BigNumber(1).times(1e18).toFixed()
        batch2.add(contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call)
    }


    const amountTokens =  await  batch1.execute()
    const amountPrices = await batch2.execute()

    if (originTokenAddress != pairBUSD )
    {
        const originCheckVal  = amountPrices[amountPrices.length - 1 ]
        // @ts-ignore
        originPricePerUnit = new BigNumber(originCheckVal[1]).div(1e18).toNumber()
        originValue = currentAmount * originPricePerUnit
    }

    const resultX = amountTokens.map((info ,index  ) =>
    {

            // @ts-ignore
            // console.log("info",info)


            const targetTokenInfo =  pairToken.filter((b) => b.tokenAddress === targetTokenAddress)[0]

            // @ts-ignore
            // console.log(info[0],info[1])
            // @ts-ignore
            const amountOriginTokenFix = info[0]
            const amountOriginToken = new BigNumber(amountOriginTokenFix).div(1e18).toNumber()
            // @ts-ignore
            const amountTargetTokenFix = info[1]
            const amountTargetToken = new BigNumber(amountTargetTokenFix).div(1e18).toNumber()

            const targetSymbol =  targetTokenSymbol //targetTokenInfo.tokenSymbol
            const targetAddress =  targetTokenAddress // targetTokenInfo.tokenAddress
            // const tokenB = n.tokenB
            // @ts-ignore
            let targetPricePerBUSD = 1; //new BigNumber(amountPrices[index][1]).div(1e18).toNumber()

            // @ts-ignore
            let targetQtyPerUnit = 1 ; // new BigNumber(amountPrices[index][0]).div(1e18).toNumber()
            // //
            let targetValue = amountTargetToken * targetPricePerBUSD

            if ( targetTokenAddress !== pairBUSD) { // @ts-ignore
                // @ts-ignore
                targetPricePerBUSD = new BigNumber(amountPrices[index][1]).div(1e18).toNumber()
                // @ts-ignore
                targetQtyPerUnit = new BigNumber(amountPrices[index][0]).div(1e18).toNumber()
                targetValue = amountTargetToken  * targetPricePerBUSD
            }

        return {
                "originTokenAddress": originTokenAddress ,
                "originSymbol": originalSymbol ,
                "originAmount" : amountOriginToken,
                "originAmountFix" : amountOriginTokenFix,
                "originPricePerUnit" : originPricePerUnit,
                "originValue" : originValue,
                "targetTokenAddress" : targetAddress,
                "targetSymbol" : targetSymbol,
                "targetAmount" : amountTargetToken,
                "targetAmountFix" : amountTargetTokenFix,
                "targetPricePerBUSD" : targetPricePerBUSD,
                "targetValue" : targetValue
                }


    });
    return resultX;
}


export const  fetchInfo =  async  (amountVal: number, tokenIdVal: number) => {
    const tokenMinimumValue = amountVal
    let routePath = []
    let lastBestPrice = tokenMinimumValue

    const token = botToken.filter((b) => b.tid === tokenIdVal)[0]
    const originalTokenAddress = token.tokenAddress // bot address
    const originalSymbol = token.tokenSymbol // bot address
    const amountValFix = new BigNumber(amountVal).times(1e18).toFixed()

    //################################################ 1 HOP ##############################################
    let resultX = await fetchBestPrice(originalSymbol, originalTokenAddress, amountVal, amountValFix)
    let bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
    console.log("Hop 1", bestPrices)
    let price1 = bestPrices.targetValue as number
    lastBestPrice = price1
    routePath.push(bestPrices)

    //################################################ 2 HOP ##############################################
    resultX = await fetchBestPrice(bestPrices.targetSymbol, bestPrices.targetTokenAddress, bestPrices.targetAmount, bestPrices.targetAmountFix)
    bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
    console.log("Hop 2 ", bestPrices)
    let price2 = bestPrices.targetValue
    if (price2 > lastBestPrice && price2 > tokenMinimumValue) {
        lastBestPrice = price2
        routePath.push(bestPrices)
    }

    //################################################ 3 HOP ##############################################
    resultX = await fetchBestPrice(bestPrices.targetSymbol, bestPrices.targetTokenAddress, bestPrices.targetAmount, bestPrices.targetAmountFix)
    bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
    console.log("Hop 3", bestPrices)
    let price3 = bestPrices.targetValue
    if (price3 > lastBestPrice && price3 > tokenMinimumValue) {
        lastBestPrice = price3
        routePath.push(bestPrices)
    }

    //################################################ 4 HOP ##############################################
    resultX = await fetchBestPrice(bestPrices.targetSymbol, bestPrices.targetTokenAddress, bestPrices.targetAmount, bestPrices.targetAmountFix)
    bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
    console.log("Hop 4 ", bestPrices)
    let price4 = bestPrices.targetValue
    if (price4 > lastBestPrice && price4 > tokenMinimumValue) {
        routePath.push(bestPrices)
    }

    //################################################ 5 HOP RETURN ORIGINAL TOKEN #######################
    if (bestPrices.targetSymbol !== originalSymbol) {
        resultX = await fetchReturnToken(bestPrices.targetSymbol, bestPrices.targetTokenAddress, bestPrices.targetAmount, bestPrices.targetAmountFix, originalSymbol, originalTokenAddress)
        bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
        console.log("Hop 5", bestPrices)
        routePath.push(bestPrices)
    }


    let status = 0
    let profite = 0
    if (routePath.length > 1)
    {
        const last_route =  routePath[routePath.length -1 ]
        if (last_route.targetAmount >  tokenMinimumValue) {
            status = 1
            profite = last_route.targetAmount - tokenMinimumValue
        }
        else
        {
            routePath = []
        }
    }
    else
    {
        routePath = []
    }




    let userAmount = amountVal
    let resultAmount = 0

    let result = {
        "status": status,
        "userAmt": userAmount,
        "resultAmt": resultAmount,
        "profit": profite,
        "routes": routePath,
        "fee": 0
    }

    return result
}



export default async (req: NowRequest, res: NowResponse): Promise<void> =>
{
    const { amount, tokenid } = req.query ;
    const amountVal = typeof amount !== "undefined" ? Number(amount) : 0
    const tokenIdVal = typeof tokenid !== "undefined" ? Number(tokenid) : -1
    const result = await fetchInfo(amountVal,tokenIdVal)

    res.json(result);
};

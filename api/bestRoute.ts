import {NowRequest, NowRequestQuery, NowResponse} from "@vercel/node";
import {AmountProps} from '../utils/findRate'
import {getBurnedSupply, getTotalSupply} from "../utils/supply";
import pairToken from "../utils/tokenPair";
import {PromisifyBatchRequest} from "../lib/PromiseBatchRequest";
import {getContract} from "../utils/web3";
import router from "../utils/abis/pancakerouterv2.json";
import BigNumber from "bignumber.js";
import {sha3Raw} from "web3-utils";
import {pack, keccak256} from '@ethersproject/solidity'
import {getCreate2Address} from '@ethersproject/address'

interface pairInfo {
    token0: string
    token1: string
}

interface stringToken {
    tid: number
    tokenSymbol: string;
    tokenAddress: string;
}


const pairs: pairInfo[] = [{
    token0: '',
    token1: ''
}]

const botToken: stringToken[] = [
    {
        tid: 0,
        tokenSymbol: 'WBNB',
        tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    }
    ,
    {
        tid: 1,
        tokenSymbol: 'BUSD',
        tokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    },
    {
        tid: 2,
        tokenSymbol: 'USDT',
        tokenAddress: '0x55d398326f99059fF775485246999027B3197955'
    }
    ,
    {
        tid: 3,
        tokenSymbol: 'USDC',
        tokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
    }
    ,
    {
        tid: 4,
        tokenSymbol: 'UST',
        tokenAddress: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC'
    }
    ,
    {
        tid: 5,
        tokenSymbol: 'OCTAX',
        tokenAddress: '0x39cab1DdaFDa34B9202F5a41f71B15d2F3EbA2aC'
    },
    {
        tid: 6,
        tokenSymbol: 'OCTAG',
        tokenAddress: '0x4F1498da0f50F94e97F900b7e6E13d8e5220aBE9'
    },
    {
        tid: 7,
        tokenSymbol: 'ADA',
        tokenAddress: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47'
    },
    {
        tid: 8,
        tokenSymbol: 'CAKE',
        tokenAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
    },
    {
        tid: 9,
        tokenSymbol: 'BAT',
        tokenAddress: '0x101d82428437127bF1608F699CD651e6Abf9766E'
    },
    {
        tid: 10,
        tokenSymbol: 'BCH',
        tokenAddress: '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf'
    },
    {
        tid: 11,
        tokenSymbol: 'COMP',
        tokenAddress: '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8'
    },
    {
        tid: 12,
        tokenSymbol: 'DOGE',
        tokenAddress: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43'
    },
    {
        tid: 13,
        tokenSymbol: 'EOS',
        tokenAddress: '0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6'
    },
    {
        tid: 14,
        tokenSymbol: 'ETH',
        tokenAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
    },
    {
        tid: 15,
        tokenSymbol: 'LINK',
        tokenAddress: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD'
    },
    {
        tid: 16,
        tokenSymbol: 'LTC',
        tokenAddress: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94'
    },
    {
        tid: 17,
        tokenSymbol: 'TRX',
        tokenAddress: '0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B'
    },
    {
        tid: 18,
        tokenSymbol: 'ZEC',
        tokenAddress: '0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb'
    },
    {
        tid: 19,
        tokenSymbol: 'ZIL',
        tokenAddress: '0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787'
    }
]

const getLpAddress = (tokenA: string, tokenB: string) => {
    const tokens = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
    const address = getCreate2Address(
        '0xBCfCcbde45cE874adCB698cC183deBcF17952812',
        keccak256(['bytes'], [pack(['address', 'address'], [tokens[0], tokens[1]])]),
        '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66'
    )
    return address
}
const routerAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
const contract = getContract(router, routerAdress);

const fetchBestPrice = async (originalSymbol: string, originTokenAddress: string, amountVal: number, amountValFix: string , ignorLastAddress : string) => {

    // let amountTokens: any[] = []
    //  let  amountPrices : any[] = []
    // try {

    // @ts-ignore
    const pairActual = pairToken.filter((b) => b.tokenAddress !== originTokenAddress && b.tokenAddress != ignorLastAddress && b.pairTokens.indexOf(originalSymbol) > -1)
    // console.log(pairActual)

    const pairBUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    const batch1 = new PromisifyBatchRequest();
    const batch2 = new PromisifyBatchRequest();
    // #################################### FETCH SWAP AMOUNT ORIGINAL TO TARGET TOKEN #############################################
    const allPairTokens = pairActual.filter((b) => b.tokenAddress !== originTokenAddress).map(async (target) => {
        const targetToken = target.tokenAddress
        //console.log(amountValFix)
        // const amountMul = new BigNumber(amountValFix).toFixed()

        //const lbAddress = getLpAddress(originTokenAddress, targetToken)
        //console.log(lbAddress)
        //if (lbAddress) {

        //console.log(targetToken)
        //  console.log(amountValFix, originTokenAddress, targetToken)
        //const item  = await  contract.methods.getAmountsOut(amountValFix, [originTokenAddress, targetToken]).call()
        //console.log(item)
        //amountTokens.push(item)

        // const  item = await contract.methods.getAmountsOut('1000000000000000000000', ["0x4F1498da0f50F94e97F900b7e6E13d8e5220aBE9", "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"]).call()
        //console.log(item)
        // return item
        // console.log(amountValFix,originTokenAddress, targetToken)
        batch1.add(contract.methods.getAmountsOut(amountValFix, [originTokenAddress, targetToken]).call)
        //}
    })

    //###################################### FETCH PRICE ALL TARGET TOKEN ##########################################################
    const pricePairTokens = pairActual.filter((b) => b.tokenAddress !== originTokenAddress).map(async (target) => {

        const amountMul = new BigNumber(1).times(1e18).toFixed(0)
        // botToken.filter((b)=>b.tokenSymbol !=="BUSD")[0].tokenAddress

        //const lbAddress = getLpAddress(target.tokenAddress, pairBUSD)
        //console.log(lbAddress)
        // if (lbAddress) {

        //const  item = await contract.methods.getAmountsOut(amountMul, [target.tokenAddress, pairBUSD]).call()
        //  const item  =await contract.methods.getAmountsOut(amountMul, [target.tokenAddress, pairBUSD]).call()
        //  amountPrices.push(item)
        batch2.add(contract.methods.getAmountsOut(amountMul, [target.tokenAddress, pairBUSD]).call)
        //}
    })


    let originValue = amountVal
    let originPricePerUnit = amountVal
    if (originTokenAddress != pairBUSD) {
        const amountMul = new BigNumber(1).times(1e18).toFixed()
        // pricePairTokens.push(await  contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call())
        batch2.add(contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call)
        //  const item = contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call()
        //  amountTokens.push(item)
    }

    const amountTokens = await batch1.execute().catch(() => {
        console.log("error amountTokens")
        return [[0, 0]]
    }) // allPairTokens //
    //  console.log(amountTokens)
    const amountPrices = await batch2.execute().catch(() => {
        console.log("error amountPrices")
        return [[0, 0]]
    })  // pricePairTokens //
    // console.log(amountPrices)

    if (originTokenAddress != pairBUSD) {
        // @ts-ignore
        const originCheckVal = amountPrices[amountPrices.length - 1]
        // @ts-ignore
        originPricePerUnit = new BigNumber(originCheckVal[1]).div(1e18).toNumber()
        originValue = originPricePerUnit * amountVal
    }
    //###################################### MAPPING BETWEEN PRICE AND AMOUNT TARGET TOKEN ########################################
    // @ts-ignore
    const resultX = amountTokens.map((info: any[], index: string | number) => {
        // @ts-ignore
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


        return {
            "originTokenAddress": originTokenAddress,
            "originSymbol": originalSymbol,
            "originAmount": amountOriginToken,
            "originAmountFix": amountOriginTokenFix,
            "originPricePerUnit": originPricePerUnit,
            "originValue": originValue,
            "targetTokenAddress": targetAddress,
            "targetSymbol": targetSymbol,
            "targetAmount": amountTargetToken,
            "targetAmountFix": amountTargetTokenFix,
            "targetPricePerBUSD": targetPricePerBUSD,
            "targetValue": targetValue
        }
    });
    return resultX;
}

const fetchReturnToken = async (originalSymbol: string, originTokenAddress: string, currentAmount: number, currentAmountFix: string, targetTokenSymbol: string, targetTokenAddress: string) => {

    const batch1 = new PromisifyBatchRequest();
    const batch2 = new PromisifyBatchRequest();
    const amountMul1 = new BigNumber(currentAmountFix)
    batch1.add(contract.methods.getAmountsOut(amountMul1, [originTokenAddress, targetTokenAddress]).call)

    const amountMul2 = new BigNumber(1).times(1e18).toFixed()
    const pairBUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

    if (targetTokenAddress !== pairBUSD) {
        batch2.add(contract.methods.getAmountsOut(amountMul2, [targetTokenAddress, pairBUSD]).call)
    }


    let originValue = currentAmount
    let originPricePerUnit = currentAmount
    if (originTokenAddress != pairBUSD) {
        const amountMul = new BigNumber(1).times(1e18).toFixed()
        batch2.add(contract.methods.getAmountsOut(amountMul, [originTokenAddress, pairBUSD]).call)
    }


    const amountTokens = await batch1.execute().catch(() => {
        console.log("error amountTokens")
        return [[0, 0]]
    }) // allPairTokens //
    //  console.log(amountTokens)
    const amountPrices = await batch2.execute().catch(() => {
        console.log("error amountPrices")
        return [[0, 0]]
    })  // pricePairTokens //
    // console.log(amountPrices)


    if (originTokenAddress != pairBUSD) {
        const originCheckVal = amountPrices[amountPrices.length - 1]
        // @ts-ignore
        originPricePerUnit = new BigNumber(originCheckVal[1]).div(1e18).toNumber()
        originValue = currentAmount * originPricePerUnit
    }

    // @ts-ignore
    const resultX = amountTokens.map((info: any[], index: string | number) => {

        // @ts-ignore
        // console.log("info",info)


        const targetTokenInfo = pairToken.filter((b) => b.tokenAddress === targetTokenAddress)[0]

        // @ts-ignore
        // console.log(info[0],info[1])
        // @ts-ignore
        const amountOriginTokenFix = info[0]
        const amountOriginToken = new BigNumber(amountOriginTokenFix).div(1e18).toNumber()
        // @ts-ignore
        const amountTargetTokenFix = info[1]
        const amountTargetToken = new BigNumber(amountTargetTokenFix).div(1e18).toNumber()

        const targetSymbol = targetTokenSymbol //targetTokenInfo.tokenSymbol
        const targetAddress = targetTokenAddress // targetTokenInfo.tokenAddress
        // const tokenB = n.tokenB
        // @ts-ignore
        let targetPricePerBUSD = 1; //new BigNumber(amountPrices[index][1]).div(1e18).toNumber()

        // @ts-ignore
        let targetQtyPerUnit = 1; // new BigNumber(amountPrices[index][0]).div(1e18).toNumber()
        // //
        let targetValue = amountTargetToken * targetPricePerBUSD

        if (targetTokenAddress !== pairBUSD) { // @ts-ignore
            // @ts-ignore
            targetPricePerBUSD = new BigNumber(amountPrices[index][1]).div(1e18).toNumber()
            // @ts-ignore
            targetQtyPerUnit = new BigNumber(amountPrices[index][0]).div(1e18).toNumber()
            targetValue = amountTargetToken * targetPricePerBUSD
        }

        return {
            "originTokenAddress": originTokenAddress,
            "originSymbol": originalSymbol,
            "originAmount": amountOriginToken,
            "originAmountFix": amountOriginTokenFix,
            "originPricePerUnit": originPricePerUnit,
            "originValue": originValue,
            "targetTokenAddress": targetAddress,
            "targetSymbol": targetSymbol,
            "targetAmount": amountTargetToken,
            "targetAmountFix": amountTargetTokenFix,
            "targetPricePerBUSD": targetPricePerBUSD,
            "targetValue": targetValue
        }


    });
    return resultX;
}


export const fetchInfo = async (amountVal: number, tokenIdVal: number) => {
    const tokenMinimumValue = amountVal
    let routePath = []
    let lastBestPrice = tokenMinimumValue
    let hopCount = 0

    const token = botToken.filter((b) => b.tid === tokenIdVal)[0]
    const originalTokenAddress = token.tokenAddress // bot address
    const originalSymbol = token.tokenSymbol // bot address
    const amountValFix = new BigNumber(amountVal).times(1e18).toFixed()

    //################################################ 1 HOP ##############################################
    let resultX = await fetchBestPrice(originalSymbol, originalTokenAddress, amountVal, amountValFix, "")
    let bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
    console.log("Hop 1", bestPrices)
    let price1 = bestPrices.targetValue as number
    lastBestPrice = price1
    let lastHop = bestPrices
    routePath.push(bestPrices)
    hopCount++

    if (lastHop.originAmount > 0) {
        //################################################ 2 HOP ##############################################
        resultX = await fetchBestPrice(lastHop.targetSymbol, lastHop.targetTokenAddress, lastHop.targetAmount, lastHop.targetAmountFix, lastHop.originTokenAddress )
        if (resultX.length > 0) {
            bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
            console.log("Hop 2 ", bestPrices)
            if (bestPrices.originAmount > 0) {
                lastHop = bestPrices
                hopCount++
            }
            let price2 = bestPrices.targetValue
            if (price2 > lastBestPrice && price2 > tokenMinimumValue) {
                lastBestPrice = price2
                routePath.push(bestPrices)
            }
        }
    }

    //################################################ 3 HOP ##############################################
    if (lastHop.originAmount > 0) {
        resultX = await fetchBestPrice(lastHop.targetSymbol, lastHop.targetTokenAddress, lastHop.targetAmount, lastHop.targetAmountFix, lastHop.originTokenAddress )
        if (resultX.length > 0) {
            bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
            console.log("Hop 3", bestPrices)
            if (bestPrices.originAmount > 0) {
                lastHop = bestPrices
                hopCount++
            }
            let price3 = bestPrices.targetValue
            if (price3 > lastBestPrice && price3 > tokenMinimumValue) {
                lastBestPrice = price3
                routePath.push(bestPrices)
            }
        }
    }


    //################################################ 4 HOP ##############################################
    if (lastHop.originAmount > 0) {
        resultX = await fetchBestPrice(lastHop.targetSymbol, lastHop.targetTokenAddress, lastHop.targetAmount, lastHop.targetAmountFix, lastHop.originTokenAddress )
        if (resultX.length > 0) {
            bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
            console.log("Hop 4 ", bestPrices)
            if (bestPrices.originAmount > 0) {
                lastHop = bestPrices
                hopCount++
            }
            let price4 = bestPrices.targetValue
            if (price4 > lastBestPrice && price4 > tokenMinimumValue) {
                routePath.push(bestPrices)
            }
        }
    }

    //################################################ 5 HOP RETURN ORIGINAL TOKEN #######################
    if (lastHop.originAmount > 0) {
        if (lastHop.targetSymbol !== originalSymbol) {

            // CASE NO PATH  SOME TOKEN  WILL BE COMPARE TO WNBNB BEFORE RETURN TO ORIGINAL TOKEN
             // @ts-ignore
            const pairActual = pairToken.filter((b) => b.tokenAddress === lastHop.targetTokenAddress && b.pairTokens.indexOf(originalSymbol) > -1)
            // console.log(pairActual)
            if (pairActual.length == 0 && hopCount < 4) {
                // CONVERT TO WBNB
                const WBNB = botToken.filter((b) => b.tokenSymbol === "WBNB")[0]
                resultX = await fetchReturnToken(lastHop.targetSymbol, lastHop.targetTokenAddress, lastHop.targetAmount, lastHop.targetAmountFix, WBNB.tokenSymbol, WBNB.tokenAddress)
                if (resultX.length > 0) {
                    bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
                    console.log("Hop Bridge ", bestPrices)
                    if (bestPrices.originAmount > 0) {
                        lastHop = bestPrices
                        hopCount++
                    }
                    routePath.push(bestPrices)
                }
            }

            resultX = await fetchReturnToken(lastHop.targetSymbol, lastHop.targetTokenAddress, lastHop.targetAmount, lastHop.targetAmountFix, originalSymbol, originalTokenAddress)
            bestPrices = resultX.reduce((a, e) => e.targetValue > a.targetValue ? e : a)
            console.log("Hop 5", bestPrices)
            routePath.push(bestPrices)
        }
    }


    let status = 0
    let profite = 0


    if (false) {

        if (routePath.length > 1) {
            const last_route = routePath[routePath.length - 1]
            if (last_route.targetAmount > tokenMinimumValue) {
                status = 1
                profite = last_route.targetAmount - tokenMinimumValue
            } else {
                routePath = []
            }
        } else {
            routePath = []
        }
    }
    else
    {
        const last_route = routePath[routePath.length - 1]
        status = 1
        profite = last_route.targetAmount - tokenMinimumValue
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


export default async (req: NowRequest, res: NowResponse): Promise<void> => {
    const {amount, tokenid} = req.query;
    const amountVal = typeof amount !== "undefined" ? Number(amount) : 0
    const tokenIdVal = typeof tokenid !== "undefined" ? Number(tokenid) : -1
    const result = await fetchInfo(amountVal, tokenIdVal)

    res.json(result);
};

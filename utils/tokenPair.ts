

interface pairProps {
    tid: number
    tokenSymbol: string;
    tokenAddress: string;
}

const pairToken: pairProps[] =[
    {
      tid: 0,
      tokenSymbol: 'WBNB',
      tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
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
      tokenAddress: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',

    },
    {
      tid: 8,
      tokenSymbol: 'CAKE',
      tokenAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',

    },

  ]
export default  pairToken;


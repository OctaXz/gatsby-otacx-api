

interface pairProps {
    tid: number
    tokenSymbol: string;
    tokenAddress: string;
    pairTokens? : Array<string>
}

const pairToken: pairProps[] =[
    {
        tid: 0,
        tokenSymbol: 'WBNB',
        tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        pairTokens: ['BLAST', 'BIRD', 'SHARD', 'BABY', 'MEPAD', 'BSCS', 'FOC', 'LPOOL', 'VPP', 'LESS', 'pCWS', 'SHARK', 'HERO', 'FINE', 'Suter', 'ADA', 'BUSD', 'DPET', 'NUDEZ', 'XVS', 'CHIMOM', 'TBC', 'MBOX', 'USDT', 'HAM', 'NAFT', 'RAINI', 'LTC', 'BBKFI', 'BUNNY', 'SXP', 'LINK', 'CCAKE', 'CTT', 'BNU', 'TWT', 'ALICE', 'RICH', 'NFTART', 'JGN', 'TENFI', 'XPO', 'FTM', 'ADS', 'PEG', 'ORANGE', 'SAFECOOKIE', 'CHANGE', 'SAFEPLUTO', 'ELEPHANT', 'ORFANO', 'COMFY', 'BOG', 'CATZ', 'ALGOP', 'ALLEY', 'bPRIVA', 'FEED', 'INFINITY', 'RAPTOR', 'CHAD', 'HMNG', 'ATA', 'BIFI', 'EOS', 'PNT', 'PERI', 'ARI', 'MOONTOKEN', 'TCGCoin', 'wDOGE', 'GOATM', 'pBTC', 'ETH', 'NEKO', 'X', 'AQUA', 'SHEESHA', 'FIL', 'EDAO', 'mBTC', 'DOTA', 'PRV', 'MERL', 'BELT', 'UNI', 'CAKE', 'bURUS', 'CPX', 'KTN', 'WOW', 'GTON', 'GOD', 'FTS', 'KALM', 'BSCX', 'ELP', 'aDGNZ', 'GOAL', 'AVA', 'NFTS', 'CIFI', 'SKILL', 'PTE', 'MARSH', 'SFUND', 'ShibaPup', 'NFTD', 'CBIX-P', 'ROAD', 'KUN', 'CTK', 'BOGE', 'DAI', 'ROCKS', 'XRP', 'ODDZ', 'DOP', 'TOTM', 'ZEFI', 'ILUS', 'VFOX', 'LMT', 'TOKEN', 'EGGP', 'COLL', 'JAGUAR', 'DDOS', 'ZEE', 'ECHO', 'COV', 'TPAD', 'SATOZ', 'AIOZ', 'LDFI', 'bBAG', 'DMOD', 'LEXI', 'XEND', 'PEAK', 'DOGE', 'DVG', 'BSL', 'HOTCROSS', 'BUX', 'τDOGE', 'ROSN', 'UMB', 'CROX', 'TLOS', 'LTO', 'PLUM', 'WISB', 'PANTHER', 'ETNA', 'TSX', 'DERI', 'RTF', 'EGR', 'MEMEX', 'TRONPAD', 'FOMO', 'WILD', 'MELODY', 'MOMA', 'VLK', 'WGRLC', 'MLT', 'dART', 'LKM', 'GIFT', 'PHNX', 'LABO', 'BUCKS', 'ARGON', 'SMG', 'SRPH', 'WEX', 'SBT', 'MRCR', 'POLARv3', 'PARA', 'PACT', 'STACK', 'KETCHUP', '$ANRX', 'MOFI', 'XGT', 'MISO', 'WAULTx', 'UNFI', 'UTU', 'KGO', 'STARSHIP', 'TAPE', 'ERC20', 'FENIX', 'CHEE', 'CBD', 'bwJUP', 'GCAT', 'SWTH', 'MOONARCH', 'KPOP', 'MOZ', 'DOV', 'BBT', 'DCH', 'CROSS', 'PNST', 'JADE', 'GAX', 'FREL', 'TRYON', 'TRO', 'Arigato', 'AT', 'ITAM', 'FIRE', 'Mello', 'MMO', 'SRSB', 'MPAD', '$WNTR', 'HBX', 'CORXb', 'VRT', 'ALU', 'SURE', 'KIDS', 'EQL', 'Fwatch', 'HOODRAT', 'HUGO', 'SLF', 'OLE', 'PROPEL', 'HOPE', 'KRYPTO', 'SCV', 'GHD', 'VBit', 'SafeZone', '2LC', 'VENUS', 'CLOUT', 'CRYPT', 'COCO', 'DORA', 'MILF', 'VEX', 'lowb', 'DOGEDAO', 'NSFW', 'ETHM', 'VANITY', 'Xpose', 'ANON', 'DEEZNUTS', 'FootballStars', '2GoShi', 'PRYZ', 'YUMMY', 'ZUM', 'DEXI', 'FROGE', 'MAD', 'RUSH', 'CPAC', 'PEPE', 'QBIT', 'SPERM', 'BARMY', 'GRILL', 'AIN', 'ETCH', 'SAFU', 'SAFEMOON', 'FREE', 'SAFEHAMSTERS', 'GDOGE', 'AER', 'SKYBORN', 'SME', 'PAPP', 'ROVER', 'PEEPO', 'ATYNE', 'TEST', 'UNSAFEMOON', 'DEEZ', 'BULLY', 'ELNC', 'LTN', 'CORGI', 'Vibra', 'SHILLING', 'CATE', 'GLXM', 'SafeBANK', 'INTO', 'MUNCH', 'RAFF', 'PLUTO', 'PORNROCKET', 'SAFEMARS', 'GMR', 'YOOSHI', 'X2P', 'BONFIRE', 'CLU', 'PIGGY', 'HODL', 'CORGIB', 'SHIBSC', 'POODL', 'SPE', 'BB', 'UTP', 'GDT', 'WSG', 'PANDA', 'SENSI', 'PMON', 'CATGE', 'SYA', 'TGDY', 'PYE', 'ULTRA', 'MetaMoon', 'SHIBACASH', 'PATH', 'BNBD', 'SAFERMOON', 'KAREN', 'ECP', 'SAFESTAR', 'TATA', 'HOP', 'MTDR', 'SMOON', 'PAWS', 'MOONSHOT', 'OSM', '$BOOB', 'ALM', 'AquaPig', 'AQUAGOAT', 'BabyDoge', 'BIDCOM', 'BLOSM', 'BWC', 'BOOZE', 'BURN1', 'CAPT', 'CATGIRL', 'CHARIX', 'CTRFI', 'Chibi', 'HUA', 'COLD', 'DHOLD', 'DINGO', 'DMusk', 'ECOIN', 'EDOGE', 'ENVIRO', 'ERTH', 'FINU', 'GAMESAFE', 'GAPT', 'HPPOT', 'HOME', 'HotDoge', 'HUKKU', 'IBEX', 'ICEBRK', 'JIND', 'KABOSU', 'KaiInu', 'KAWAII', 'KIMJ', 'KDOGE', 'MKOALA', 'LAIKA', 'LEAN', 'LEOPARD', 'LIMON', 'LOGE', 'MECHASHIBA', 'MKMOON', 'MOOCHII', 'MOONLIGHT', 'MOONRABBIT', 'FETCH', 'MSHLD', 'NFTBOX', 'TONE', 'NCC', 'NOTSAFEMOON', 'ORION', 'GLASS', 'PHX', 'PinkE', 'PinkM', 'PIT', 'PXL', 'PM', 'POOROCKET', 'PUBE', 'PUFFY', 'RADDIT', 'ROK', 'SKYLARK', 'EnergyX', 'SFJP', 'SFMS', 'SAFEMOONCASH', 'SAFEMUSK', 'SAFESPACE', 'SXI', 'SAT', 'Save', 'SBYTE', 'SMRAT', 'SLEEPY', 'SOLDIER', 'SCORGI', 'GRIMEX', 'SPORE', 'SSN', 'SUSHIBA', 'SET', 'SWASS', 'TASTE', 'TWERK', 'UNFT', 'UPDOG', 'UPSHIB', 'VIAGRA', 'WILLIE', 'XBC', 'X-Token', 'YUANG', 'ZABAKU', 'GOAT', 'ColdKoala', 'LTRBT', 'LTMS']
    }
    ,
    {
        tid: 3,
        tokenSymbol: 'USDC',
        tokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        pairTokens: ['BUSD']
    }
    ,
    {
        tid: 5,
        tokenSymbol: 'OCTAX',
        tokenAddress: '0x39cab1DdaFDa34B9202F5a41f71B15d2F3EbA2aC',
        pairTokens: ['BUSD', 'WBNB', 'OCTAG', 'ADA', 'CAKE', 'USDT']
    } ,
    {
        tid: 6,
        tokenSymbol: 'OCTAG',
        tokenAddress: '0x4F1498da0f50F94e97F900b7e6E13d8e5220aBE9',
        pairTokens: ['BUSD', 'USDT']
    },
    {
      tid: 7,
      tokenSymbol: 'ADA',
      tokenAddress: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
        pairTokens: ['WBNB' , 'OCTAX']
    },
    {
        tid: 8,
        tokenSymbol: 'CAKE',
        tokenAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        pairTokens: ['SAFEMOON', 'FOC', 'WBNB', 'BUSD', 'CCAKE', 'MOFI', 'FOC']
    }
    ,
    {
        tid: 9,
        tokenSymbol: 'SAFEMOON',
        tokenAddress: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3',
        pairTokens: ['WBNB', 'BUSD', 'CAKE']
    },
    {
        tid: 10,
        tokenSymbol: 'BUNNY',
        tokenAddress: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
        pairTokens: ['WBNB','BUSD']
    },
    {
        tid: 11,
        tokenSymbol: 'BTCB',
        tokenAddress: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
        pairTokens: ['WBNB','ICA' ,'MISO','τBTC','BUSD','BUCKS']
    },
    {
        tid: 12,
        tokenSymbol: 'ETH',
        tokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        pairTokens: ['WBNB','ICA','BUSD','MELODY','EDOGE']
    },
    {
        tid: 13,
        tokenSymbol: 'DOT',
        tokenAddress: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
        pairTokens: ['WBNB']
    },
    {
        tid: 14,
        tokenSymbol: 'XVS',
        tokenAddress: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
        pairTokens: ['WBNB']
    },
    {
        tid: 15,
        tokenSymbol: 'UNI',
        tokenAddress: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
        pairTokens: ['WBNB']
    },
    {
        tid: 16,
        tokenSymbol: 'USDT',
        tokenAddress: '0x55d398326f99059fF775485246999027B3197955',
        pairTokens: ['WBNB']
    },
    {
        tid: 17,
        tokenSymbol: 'USDC',
        tokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        pairTokens: ['BUSD']
    },
    {
        tid: 18,
        tokenSymbol: 'UST',
        tokenAddress: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
        pairTokens: ['BUSD']
    }
    ,
    {
        tid: 19,
        tokenSymbol: 'DAI',
        tokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        pairTokens: ['WBNB','BUSD']
    }
    ,
    {
        tid: 20,
        tokenSymbol: 'AQUA',
        tokenAddress: '0x72b7d61e8fc8cf971960dd9cfa59b8c829d91991',
        pairTokens: ['WBNB']
    },
    {
        tid: 21,
        tokenSymbol: 'LTC',
        tokenAddress: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
        pairTokens: ['WBNB']
    },
    {
        tid: 22,
        tokenSymbol: 'LINK',
        tokenAddress: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
        pairTokens: ['WBNB']
    },

    {
        tid: 24,
        tokenSymbol: 'BIRD',
        tokenAddress: '0xc9c7c6a590e82c576de7553142d47a5fb63f9e90',
        pairTokens: ['WBNB']
    },
    {
        tid: 25,
        tokenSymbol: 'MBOX',
        tokenAddress: '0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377',
        pairTokens: ['WBNB']
    }
    ,
    {
        tid: 26,
        tokenSymbol: 'SXP',
        tokenAddress: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
        pairTokens: ['WBNB']
    }
    ,
    {
        tid: 26,
        tokenSymbol: 'BUSD',
        tokenAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        pairTokens: ['USDC']
    }

  ]

export default  pairToken;


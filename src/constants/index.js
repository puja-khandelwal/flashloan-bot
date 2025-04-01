import { ZeroAddress } from "src/utils";

export const NetworkContextName = "ETH Mainnet Network";
export const ACTIVE_NETWORK = 1;
export const NftContractAddress = "0x122E82B31A7C13137d455fC45C1D7484c5846168";
export const NftStakingAddress = "0x06192323Fb5F19280B0FEb66eE4B98F0AAb9e826";

export const RPC_URL =
  "https://mainnet.infura.io/v3/9a0c6748eb99443b989dcf81467233c4";

export const NetworkDetails = [
  {
    chainId: "1",
    chainName: "ETH Mainnet  Network",
    nativeCurrency: {
      name: "ETH Mainnet Network",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
];
// export const WETHToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
export const WETHToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //MinNet

export const TokenAddressToUsed = [
  {
    image: "images/ETH.png",
    heading: "ETH",
    discription: "Ether (ETH)",
    type: "nonApprove",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    token: ZeroAddress, // TestNet
    tokenM: ZeroAddress, //MinNet
    typeToken: "Token",
  },
  {
    image: "images/ETH.png",
    heading: "WETH",
    discription: "Wrapped Ether (WETH)",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    token: WETHToken, // TestNet
    // token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //MinNet
    tokenM: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //MinNet
    typeToken: "Token",
  },
  {
    image: "images/uni.png",
    heading: "UNI",
    discription: "Uniswap (UNI)",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    // token: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // TestNet
    token: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", //MinNet
    tokenM: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", //MinNet
    typeToken: "Token",
  },
  {
    image: "images/dai.png",
    heading: "DAI",
    discription: "Dai Stablecoin (DAI)",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    // token: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60", // TestNet
    token: "0x6B175474E89094C44Da98b954EedeAC495271d0F", //MinNet
    tokenM: "0x6B175474E89094C44Da98b954EedeAC495271d0F", //MinNet
    typeToken: "Token",
  },
  {
    image: "images/ChainLink.png",
    heading: "LINK",
    discription: "ChainLink Token(LINK)",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    // token: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // TestNet
    token: "0x514910771AF9Ca656af840dff83E8264EcF986CA", //MinNet
    tokenM: "0x514910771AF9Ca656af840dff83E8264EcF986CA", //MinNet
    typeToken: "Token",
  },
  {
    image: "images/usdc.png",
    heading: "USDC",
    discription: "USD Coin(USDC)",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    // token: "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C", // TestNet
    token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", //MinNet
    tokenM: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", //MinNet
    typeToken: "Token",
  },
  {
    image: "images/USDT.png",
    heading: "USDT",
    discription: "Tether USDT",
    type: "approve",
    function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    // token: "0xaa34a2eE8Be136f0eeD223C9Ec8D4F2d0BC472dd", //TestNet
    token: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //MinNet
    tokenM: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //MinNet
    typeToken: "Token",
  },
  // {
  //   image: "images/paxosgold.webp",
  //   heading: "PAXG",
  //   discription: "Paxos Gold PAXG",
  //   type: "approve",
  //   function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
  //   // token: "0x60014a8c55378fC8B963d6eE7A978eF19980249f", //TestNet
  //   token: "0x45804880De22913dAFE09f4980848ECE6EcbAf78", //MinNet
  //   tokenM: "0x45804880De22913dAFE09f4980848ECE6EcbAf78", //MinNet
  //   typeToken: "Token",
  // },
  // {
  //   image: "images/wooT.webp",
  //   heading: "WOO",
  //   discription: "Paxos Gold PAXG",
  //   type: "approve",
  //   function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
  //   // token: "0xac4E7c051C92Eaa810Ca278504475C9165F07A3B", //TestNet
  //   token: "0x45804880De22913dAFE09f4980848ECE6EcbAf78", //MinNet
  //   tokenM: "0x45804880De22913dAFE09f4980848ECE6EcbAf78", //MinNet
  //   typeToken: "Token",
  // },
  // {
  //   image: "images/huobi_28.webp",
  //   heading: "HT",
  //   discription: "Huobi Token HT",
  //   type: "approve",
  //   function: "swapExactTokensForETHSupportingFeeOnTransferTokens",
  //   // token: "0x9835693d4195d0aa7ee2112208bf5151fb13b9da", //TestNet
  //   token: "0x6f259637dcD74C767781E37Bc6133cd6A68aa161", //MinNet
  //   tokenM: "0x6f259637dcD74C767781E37Bc6133cd6A68aa161", //MinNet
  //   typeToken: "Token",
  // },
];

export const CategoryButtons = [
  {
    name: "DAI",
  },
  {
    name: "WETH",
  },
  {
    name: "USDC",
  },
  {
    name: "WOO",
  },
  {
    name: "UNI",
  },
  {
    name: "ETH",
  },
  {
    name: "USDT",
  },
  {
    name: "Solana",
  },
];
export const RankingButtons = [
  {
    name: "Last 1 Days Exchanges",
  },
  {
    name: "Last 2 Days Exchanges",
  },
  {
    name: "Last 3 Days Exchanges",
  },
  {
    name: "Last 4 Days Exchanges",
  },
  {
    name: "Last 5 Days Exchanges",
  },
  {
    name: "Last 6 Days Exchanges",
  },
  {
    name: "Last 7 Days Exchanges",
  },
  {
    name: "Last 8 Days Exchanges",
  },
  {
    name: "Last 9 Days Exchanges",
  },
];
export const paginationLimit = [
  {
    name: "10",
  },
  // {
  //   name: " 02",
  // },
  // {
  //   name: " 03",
  // },
  // {
  //   name: " 04",
  // },
  // {
  //   name: " 05",
  // },
  // {
  //   name: " 06",
  // },
  // {
  //   name: " 07",
  // },
  // {
  //   name: " 08",
  // },
  // {
  //   name: " 09",
  // },
];

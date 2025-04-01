import { ethers } from "ethers";
import {
  ChainId,
  Token,
  Route,
  Trade,
  TradeType,
  Pair,
  CurrencyAmount,
  // Fetcher,
} from "@sushiswap/sdk";
import IUniswapv2Pair from "src/ABI/IUniswapv2Pair.json";
import { Fetcher } from "@shibaswap/sdk";

const provider = new ethers.providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/2f2312e7890d42f5b0ba6e29ef50674d"
);

export const ShushiSwapCheckPriceinDollor = async (
  exchange,
  tokenAddress
  // toDecimal,
  // symbol
) => {
  try {
    console.log("----WETH", tokenAddress);
    let amount;
    // if (exchange == "ShibaSwap") {
    //   const USDC = new Token(
    //     ChainId.MAINNET,
    //     "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //     6
    //   );
    //   const u_tokenAIn = await Fetcher.fetchTokenData(
    //     ChainId.MAINNET,
    //     tokenAddress,
    //     provider
    //   );
    //   const USDCTokenAddressPair = await Fetcher.fetchPairData(
    //     USDC,
    //     u_tokenAIn
    //   );
    //   console.log("u_tokenAIn====----->>>", u_tokenAIn.decimals);
    //   const route = new Route([USDCTokenAddressPair], u_tokenAIn);
    //   const amount = 1;
    //   const trade = new Trade(
    //     route,
    //     new TokenAmount(
    //       u_tokenAIn,
    //       ethers.utils.parseUnits(amount.toFixed(6), u_tokenAIn.decimals)
    //       // BigInt(1e18)
    //     ),
    //     TradeType.EXACT_INPUT
    //   );

    //   console.log("----WETH", route);
    //   console.log("----WETH", trade);
    //   console.log("----WETH", trade.executionPrice.toSignificant(6));
    //   return trade.executionPrice.toSignificant(6);
    // }
    if (exchange == "ShushiSwap") {
      const USDC = new Token(
        ChainId.MAINNET,
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        6,
        "USDT"
      );
      // const NewsTokenAddress = new Token(
      //   ChainId.MAINNET,
      //   tokenAddress,
      // );
      // console.log(
      //   NewsTokenAddress,
      //   "USDC ---  shushiswpPrice----------->",
      //   USDC
      // );

      const NewsTokenAddress = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        tokenAddress,
        provider
      );
      console.log(
        "USDC ---  shushiswpPrice-----------> NewsTokenAddress ",
        NewsTokenAddress
      );
      const pairAddress = Pair.getAddress(USDC, NewsTokenAddress);
      console.log("shushiswap ---  shushiswpPrice----------->", pairAddress);

      const uniV2PairContract = new ethers.Contract(
        pairAddress,
        IUniswapv2Pair,
        provider
      );
      console.log(
        "uniV2PairContract ---  shushiswpPrice----------->",
        uniV2PairContract
      );
      const reserves = await uniV2PairContract.getReserves();
      console.log("reserves ---  shushiswpPrice----------->", reserves);

      const token0Address = await uniV2PairContract.token0();
      const token1Address = await uniV2PairContract.token1();
      const token0 = [USDC, NewsTokenAddress].find(
        (token) => token.address === token0Address
      );
      const token1 = [USDC, NewsTokenAddress].find(
        (token) => token.address === token1Address
      );

      const pairs = new Pair(
        CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
        CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
      );
      console.log("pairs ---  shushiswpPrice----------->", pairs);
      return pairs;
    }
  } catch (error) {
    // try {
    //   console.log("----WETH", tokenAddress);
    //   let amount;
    //   if (exchange == "Uniswap") {
    //     const USDC = new Token(
    //       ChainId.MAINNET,
    //       "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    //       6
    //     );
    //     console.log("----WETH", USDC);
    //     const TokenPrice = new Token(ChainId.MAINNET, tokenAddress, 18);
    //     console.log("----WETH", WETH);

    //     const USDCWETHPair = await Fetcher.fetchPairData(
    //       USDC,
    //       WETH[ChainId.MAINNET]
    //     );
    //     console.log("----WETH", USDCWETHPair);
    //     const TokenPriceUSDCPair = await Fetcher.fetchPairData(TokenPrice, USDC);

    //     console.log("----WETH", TokenPriceUSDCPair);
    //     const route = new Route(
    //       [USDCWETHPair, TokenPriceUSDCPair],
    //       WETH[ChainId.MAINNET]
    //     );

    //     console.log("----WETH", route);
    //     console.log(route.midPrice.toSignificant(6)); // 202.081
    //     console.log(route.midPrice.invert().toSignificant(6)); // 0.00494851
    //     return route.midPrice.invert().toSignificant(6);
    //     // const tokenPair = await Fetcher.fetchPairData(TokenPrice, USDC, provider);
    //   }
    // }
    console.log("error ---  shushiswpPrice----------->", error);
  }
};

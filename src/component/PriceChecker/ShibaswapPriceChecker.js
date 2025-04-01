// import {
//     ChainId,
//     Token,
//     Fetcher,
//     Route,
//     Trade,
//     TradeType,
//     TokenAmount,
//     WETH,
//   } from "@uniswap/sdk";
import { ethers } from "ethers";
// import {
//   ChainId,
//   Token,
//   Route,
//   Trade,
//   TradeType,
//   Pair,
//   CurrencyAmount,
// } from "@sushiswap/sdk";
//   import abi from "./IUniswapv2Pair.json";
import {
  ChainId,
  Token,
  Fetcher,
  Route,
  Trade,
  TradeType,
  TokenAmount,
  WETH,
} from "@shibaswap/sdk";

const provider = new ethers.providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/2f2312e7890d42f5b0ba6e29ef50674d"
);

export const ShibaSwapCheckPriceinDollor = async (exchange, tokenAddress) => {
  try {
    console.log("----WETH", tokenAddress);
    let amount;
    if (exchange == "ShibaSwap") {
      const USDC = new Token(
        ChainId.MAINNET,
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        6
      );
      console.log("----WETH", USDC);
      // const token = new Token(ChainId.MAINNET, tokenAddress, toDecimal);
      const u_tokenAIn = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        tokenAddress,
        provider
      );
      // console.log("----WETH", WETH);

      // const USDCWETHPair = await Fetcher.fetchPairData(
      //   USDC,
      //   WETH[ChainId.MAINNET]
      // );
      //   console.log("u_tokenAIn====Shibaswap----->>>", u_tokenAIn);
      const USDCTokenAddressPair = await Fetcher.fetchPairData(
        USDC,
        u_tokenAIn
      );
      console.log("u_tokenAIn====Shibaswap----->>>", USDCTokenAddressPair);
      // console.log("----WETH", USDCWETHPair);
      // const TokenPriceUSDCPair = await Fetcher.fetchPairData(USDCTokenAddressPair, USDC);

      // console.log("----WETH", TokenPriceUSDCPair);
      // const route = new Route(
      //   [USDCWETHPair, TokenPriceUSDCPair],
      //   WETH[ChainId.MAINNET]
      // );
      const route = new Route([USDCTokenAddressPair], u_tokenAIn);
      const amount = 1;
      const trade = new Trade(
        route,
        new TokenAmount(
          u_tokenAIn,
          ethers.utils.parseUnits(amount.toFixed(6), u_tokenAIn.decimals)
          // BigInt(1e18)
        ),
        TradeType.EXACT_INPUT
      );

      console.log("----WETH", route);
      console.log("----WETH", trade);
      console.log("----WETH", trade.executionPrice.toSignificant(6));
      // console.log(route.midPrice.toSignificant(6)); // 202.081
      // console.log(route.midPrice.invert().toSignificant(6)); // 0.00494851
      return trade.executionPrice.toSignificant(6);
      // return route.midPrice.invert().toSignificant(6);
      // const tokenPair = await Fetcher.fetchPairData(TokenPrice, USDC, provider);
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
    console.log(error);
  }
};

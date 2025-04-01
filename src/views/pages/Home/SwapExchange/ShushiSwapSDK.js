import {
  ChainId,
  Token,
  Route,
  Trade,
  TradeType,
  Pair,
  CurrencyAmount,
} from "@sushiswap/sdk";
import { ethers } from "ethers";
import abi from "./IUniswapv2Pair.json";

const provider = new ethers.providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/2f2312e7890d42f5b0ba6e29ef50674d"
);

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI"
);
const WETH = new Token(
  ChainId.MAINNET,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH"
);
const USDC = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6,
  "USDC"
);

const tokenATokenBPairSushi = async (tokenA, tokenB) => {
  const pairAddress = Pair.getAddress(tokenA, tokenB);
  const uniV2PairContract = new ethers.Contract(pairAddress, abi.abi, provider);
  const reserves = await uniV2PairContract.getReserves();

  const token0Address = await uniV2PairContract.token0();
  const token1Address = await uniV2PairContract.token1();
  const token0 = [tokenA, tokenB].find(
    (token) => token.address === token0Address
  );
  const token1 = [tokenA, tokenB].find(
    (token) => token.address === token1Address
  );

  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
  );
  return pair;
};

// Test
let currency = ["DAI", "WETH", "USDC"];
function getCombination(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (arr[i] != arr[j] && arr[j] != arr[k] && arr[i] != arr[k]) {
          newArr.push([arr[i], arr[j], arr[k], arr[i]]);
        }
      }
    }
  }
  return newArr;
}

export const ShushiSwapFun = async (
  //   tokenId,
  //   NFTTOKEN,
  //   abi,
  //   library,
  //   account,
  //   contractAddress,
  amounts
) => {
  try {
    const route = new Route(
      [await tokenATokenBPairSushi(DAI, WETH)],
      DAI,
      WETH
    );
    const route1 = new Route(
      [await tokenATokenBPairSushi(USDC, WETH)],
      WETH,
      USDC
    );
    const route2 = new Route(
      [await tokenATokenBPairSushi(DAI, USDC)],
      USDC,
      DAI
    );

    const route3 = new Route(
      [await tokenATokenBPairSushi(DAI, WETH)],
      WETH,
      DAI
    );
    const route4 = new Route(
      [await tokenATokenBPairSushi(USDC, WETH)],
      USDC,
      WETH
    );
    const route5 = new Route(
      [await tokenATokenBPairSushi(DAI, USDC)],
      DAI,
      USDC
    );

    let _result = await getCombination(currency);
    let finalResult = [],
      obj;

    for (let i = 0; i < _result.length; i++) {
      for (let j = 0; j < _result[i].length; j++) {
        if (
          _result[i][0] === "DAI" &&
          _result[i][1] === "WETH" &&
          _result[i][2] === "USDC"
        ) {
          console.log("DAI -> WETH -> USDC -> DAI");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeDaiToWeth = new Trade(
            route,
            new CurrencyAmount(DAI, ethers.utils.parseUnits(amount.toFixed(6))),
            TradeType.EXACT_INPUT
          );
          const _DaiToWeth = tradeDaiToWeth.outputAmount.numerator;
          let DaiToWeth = ethers.utils.formatUnits(
            _DaiToWeth.toString(),
            "ether"
          );
          console.log(`${amounts} DAI to ${DaiToWeth} WETH`);

          DaiToWeth = Number(DaiToWeth) - (Number(DaiToWeth) * 0.3) / 100;
          const tradeWethToUsdc = new Trade(
            route1,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(DaiToWeth.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const WethToUsdc_ = tradeWethToUsdc.outputAmount.numerator;
          let WethToUsdc = ethers.utils.formatUnits(WethToUsdc_.toString(), 6);
          console.log(`${DaiToWeth} WETH to ${WethToUsdc} USDC`);

          WethToUsdc = Number(WethToUsdc) - (Number(WethToUsdc) * 0.3) / 100;
          const tradeUsdcToDai = new Trade(
            route2,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(WethToUsdc.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToDai_ = tradeUsdcToDai.outputAmount.numerator;
          const UsdcToDai = ethers.utils.formatUnits(UsdcToDai_.toString(), 18);
          console.log(`${WethToUsdc} USDC to ${UsdcToDai} DAI`);
          const PL = ((Number(UsdcToDai) - amounts) * 100) / amounts;
          obj = {
            forRequest: "DAI -> WETH -> USDC -> DAI",
            resp1: ` ${amounts} DAI to ${DaiToWeth} WETH`,
            resp2: `${DaiToWeth} WETH to ${WethToUsdc} USDC`,
            resp3: `${WethToUsdc} USDC to ${UsdcToDai} DAI`,
          };
          if (PL > 0) {
            console.log(`Profit : ${PL.toFixed(2)}%\n`);
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;
          } else {
            console.log(`Loss : ${PL.toFixed(2)}%\n`);
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;
          }
          finalResult.push(obj);

          break;
        }
        if (
          _result[i][0] === "DAI" &&
          _result[i][1] === "USDC" &&
          _result[i][2] === "WETH"
        ) {
          console.log("DAI -> USDC -> WETH -> DAI");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeDaiToUsdc = new Trade(
            route5,
            new CurrencyAmount(DAI, ethers.utils.parseUnits(amount.toFixed(6))),
            TradeType.EXACT_INPUT
          );
          const DaiToUsdc_ = tradeDaiToUsdc.outputAmount.numerator;
          let DaiToUsdc = ethers.utils.formatUnits(DaiToUsdc_.toString(), 6);
          console.log(`${amounts} DAI to ${DaiToUsdc} USDC`);

          DaiToUsdc = Number(DaiToUsdc) - (Number(DaiToUsdc) * 0.3) / 100;
          const tradeUsdcToWeth = new Trade(
            route4,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(DaiToUsdc.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToWeth_ = tradeUsdcToWeth.outputAmount.numerator;
          let UsdcToWeth = ethers.utils.formatUnits(UsdcToWeth_.toString(), 18);
          console.log(`${DaiToUsdc} USDC to ${UsdcToWeth} WETH`);

          UsdcToWeth = Number(UsdcToWeth) - (Number(UsdcToWeth) * 0.3) / 100;
          const tradeWethToDAi = new Trade(
            route3,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(UsdcToWeth.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const WethToDai_ = tradeWethToDAi.outputAmount.numerator;
          const WethToDai = ethers.utils.formatUnits(WethToDai_.toString(), 18);
          console.log(`${UsdcToWeth} WETH to ${WethToDai} DAI`);
          const PL = ((Number(WethToDai) - amounts) * 100) / amounts;
          obj = {
            forRequest: "DAI -> USDC -> WETH -> DAI",
            resp1: ` ${amounts} DAI to ${DaiToUsdc} USDC`,
            resp2: `${DaiToUsdc} USDC to ${UsdcToWeth} WETH`,
            resp3: `${UsdcToWeth} WETH to ${WethToDai} DAI`,
          };
          if (PL > 0) {
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;

            console.log(`Profit : ${PL.toFixed(2)}%\n`);
          } else {
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;

            console.log(`Loss : ${PL.toFixed(2)}%\n`);
          }
          finalResult.push(obj);

          break;
        }

        if (
          _result[i][0] === "WETH" &&
          _result[i][1] === "USDC" &&
          _result[i][2] === "DAI"
        ) {
          console.log("WETH -> USDC -> DAI -> WETH");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeWethToUsdc = new Trade(
            route1,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(amount.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const WethToUsdc_ = tradeWethToUsdc.outputAmount.numerator;
          let WethToUsdc = ethers.utils.formatUnits(WethToUsdc_.toString(), 6);
          console.log(`${amounts} WETH to ${WethToUsdc} USDC`);

          WethToUsdc = Number(WethToUsdc) - (Number(WethToUsdc) * 0.3) / 100;
          const tradeUsdcToDAi = new Trade(
            route2,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(WethToUsdc.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToDai_ = tradeUsdcToDAi.outputAmount.numerator;
          let UsdcToDai = ethers.utils.formatUnits(UsdcToDai_.toString(), 18);
          console.log(`${WethToUsdc} USDC to ${UsdcToDai} DAI`);

          UsdcToDai = Number(UsdcToDai) - (Number(UsdcToDai) * 0.3) / 100;
          const tradeDaiToWEth = new Trade(
            route,
            new CurrencyAmount(
              DAI,
              ethers.utils.parseUnits(UsdcToDai.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const DaiToWeth_ = tradeDaiToWEth.outputAmount.numerator;
          const DaiToWeth = ethers.utils.formatUnits(DaiToWeth_.toString(), 18);
          console.log(`${UsdcToDai} DAI to ${DaiToWeth} WETH`);
          const PL = ((Number(DaiToWeth) - amounts) * 100) / amounts;
          obj = {
            forRequest: "WETH -> USDC -> DAI -> WETH",
            resp1: `${amounts} WETH to ${WethToUsdc} USDC`,
            resp2: `${WethToUsdc} USDC to ${UsdcToDai} DAI`,
            resp3: `${UsdcToDai} DAI to ${DaiToWeth} WETH`,
          };
          if (PL > 0) {
            console.log(`Profit : ${PL.toFixed(2)}%\n`);
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;
          } else {
            console.log(`Loss : ${PL.toFixed(2)}%\n`);
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;
          }
          finalResult.push(obj);

          break;
        }

        if (
          _result[i][0] === "WETH" &&
          _result[i][1] === "DAI" &&
          _result[i][2] === "USDC"
        ) {
          console.log("WETH -> DAI -> USDC -> WETH");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeWethToDai = new Trade(
            route3,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(amount.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const WethToDai_ = tradeWethToDai.outputAmount.numerator;
          let WethToDai = ethers.utils.formatUnits(WethToDai_.toString(), 18);
          console.log(`${amounts} WETH to ${WethToDai} DAI`);

          WethToDai = Number(WethToDai) - (Number(WethToDai) * 0.3) / 100;
          const tradeDaiToUsdc = new Trade(
            route5,
            new CurrencyAmount(
              DAI,
              ethers.utils.parseUnits(WethToDai.toFixed(6))
            ),
            TradeType.EXACT_INPUT
          );
          const DaiToUsdc_ = tradeDaiToUsdc.outputAmount.numerator;
          let DaiToUsdc = ethers.utils.formatUnits(DaiToUsdc_.toString(), 6);
          console.log(`${WethToDai} DAI to ${DaiToUsdc} USDC`);

          DaiToUsdc = Number(DaiToUsdc) - (Number(DaiToUsdc) * 0.3) / 100;
          const tradeUsdcToWeth = new Trade(
            route4,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(DaiToUsdc.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToWeth_ = tradeUsdcToWeth.outputAmount.numerator;
          const UsdcToWeth = ethers.utils.formatUnits(
            UsdcToWeth_.toString(),
            18
          );
          console.log(`${DaiToUsdc} USDC to ${UsdcToWeth} WETH`);
          const PL = ((Number(UsdcToWeth) - amounts) * 100) / amounts;
          obj = {
            forRequest: "WETH -> DAI -> USDC -> WETH",
            resp1: `${amounts} WETH to ${WethToDai} DAI`,
            resp2: `${WethToDai} DAI to ${DaiToUsdc} USDC`,
            resp3: `${DaiToUsdc} USDC to ${UsdcToWeth} WETH`,
          };
          if (PL > 0) {
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;

            console.log(`Profit : ${PL.toFixed(2)}%\n`);
          } else {
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;

            console.log(`Loss : ${PL.toFixed(2)}%\n`);
          }
          finalResult.push(obj);

          break;
        }

        if (
          _result[i][0] === "USDC" &&
          _result[i][1] === "DAI" &&
          _result[i][2] === "WETH"
        ) {
          console.log("USDC -> DAI -> WETH -> USDC");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeUsdcToDai = new Trade(
            route2,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(amount.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToDai_ = tradeUsdcToDai.outputAmount.numerator;
          let UsdcToDai = ethers.utils.formatUnits(UsdcToDai_.toString(), 18);
          console.log(`${amounts} USDC to ${UsdcToDai} DAI`);

          UsdcToDai = Number(UsdcToDai) - (Number(UsdcToDai) * 0.3) / 100;
          const tradeDaiToWEth = new Trade(
            route,
            new CurrencyAmount(
              DAI,
              ethers.utils.parseUnits(UsdcToDai.toFixed(6), 18)
            ),
            TradeType.EXACT_INPUT
          );
          const DaiToWeth_ = tradeDaiToWEth.outputAmount.numerator;
          let DaiToWeth = ethers.utils.formatUnits(DaiToWeth_.toString(), 18);
          console.log(`${UsdcToDai} DAI to ${DaiToWeth} WETH`);
          DaiToWeth = Number(DaiToWeth) - (Number(DaiToWeth) * 0.3) / 100;
          const tradeWethToUsdc = new Trade(
            route1,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(DaiToWeth.toFixed(6), 18)
            ),
            TradeType.EXACT_INPUT
          );
          const WethToUsdc_ = tradeWethToUsdc.outputAmount.numerator;
          const WethToUsdc = ethers.utils.formatUnits(
            WethToUsdc_.toString(),
            6
          );
          console.log(`${DaiToWeth} WETH to ${WethToUsdc} USDC`);
          const PL = ((Number(WethToUsdc) - amounts) * 100) / amounts;
          obj = {
            forRequest: "USDC -> DAI -> WETH -> USDC",
            resp1: `${amounts} USDC to ${UsdcToDai} DAI`,
            resp2: `${UsdcToDai} DAI to ${DaiToWeth} WETH`,
            resp3: `${DaiToWeth} WETH to ${WethToUsdc} USDC`,
          };
          if (PL > 0) {
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;

            console.log(`Profit : ${PL.toFixed(2)}%\n`);
          } else {
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;

            console.log(`Loss : ${PL.toFixed(2)}%\n`);
          }
          finalResult.push(obj);

          break;
        }

        if (
          _result[i][0] === "USDC" &&
          _result[i][1] === "WETH" &&
          _result[i][2] === "DAI"
        ) {
          console.log("USDC -> WETH -> DAI -> USDC");
          const amount = amounts - (amounts * 0.3) / 100;
          const tradeUsdcToWEth = new Trade(
            route4,
            new CurrencyAmount(
              USDC,
              ethers.utils.parseUnits(amount.toFixed(6), 6)
            ),
            TradeType.EXACT_INPUT
          );
          const UsdcToWeth_ = tradeUsdcToWEth.outputAmount.numerator;
          let UsdcToWeth = ethers.utils.formatUnits(UsdcToWeth_.toString(), 18);
          console.log(`${amounts} USDC to ${UsdcToWeth} WETH`);
          UsdcToWeth = Number(UsdcToWeth) - (Number(UsdcToWeth) * 0.3) / 100;
          const tradeWethToDai = new Trade(
            route3,
            new CurrencyAmount(
              WETH,
              ethers.utils.parseUnits(UsdcToWeth.toFixed(6), 18)
            ),
            TradeType.EXACT_INPUT
          );
          const WethToDai_ = tradeWethToDai.outputAmount.numerator;
          let WethToDai = ethers.utils.formatUnits(WethToDai_.toString(), 18);
          console.log(`${UsdcToWeth} WETH to ${WethToDai} DAI`);
          WethToDai = Number(WethToDai) - (Number(WethToDai) * 0.3) / 100;
          const tardeDAiToUsdc = new Trade(
            route5,
            new CurrencyAmount(
              DAI,
              ethers.utils.parseUnits(WethToDai.toFixed(6), 18)
            ),
            TradeType.EXACT_INPUT
          );
          const DaiToUsdc_ = tardeDAiToUsdc.outputAmount.numerator;
          const DaiToUsdc = ethers.utils.formatUnits(DaiToUsdc_.toString(), 6);
          console.log(`${WethToDai} DAI to ${DaiToUsdc} USDC`);
          const PL = ((Number(DaiToUsdc) - amounts) * 100) / amounts;
          obj = {
            forRequest: "USDC -> WETH -> DAI -> USDC",
            resp1: `${amounts} USDC to ${UsdcToWeth} WETH`,
            resp2: `${UsdcToWeth} WETH to ${WethToDai} DAI`,
            resp3: `${WethToDai} DAI to ${DaiToUsdc} USDC`,
          };
          if (PL > 0) {
            obj["resp4"] = `Profit : ${PL.toFixed(2)}%\n`;

            console.log(`Profit : ${PL.toFixed(2)}%\n`);
          } else {
            obj["resp4"] = `Loss : ${PL.toFixed(2)}%\n`;

            console.log(`Loss : ${PL.toFixed(2)}%\n`);
          }
          finalResult.push(obj);

          break;
        }
      }
      // if (i === _result.length - 1) {
      //     console.log("finalResult==>>", finalResult);
      //     responses = ({ responseCode: 200, responseMessage: "Data fetched successfully!", responseResult: finalResult })
      //     resolve(responses)
      // }
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

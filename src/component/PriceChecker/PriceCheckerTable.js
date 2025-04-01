import React, { useEffect } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Box,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { CheckPriceinDollor } from "./PriceChecker";
import { ShshiSwapCheckPriceinDollor } from "./SushiSwapPriceCheck";
import ERC20ABI from "src/ABI/IERC20ABI.json";
import {
  APITokenPriceHandler,
  getWeb3ContractObject,
  mainnetRPCURL1,
  GenerateEstimateGas,
} from "src/utils";
import { ShibaSwapCheckPriceinDollor } from "./ShibaswapPriceChecker";
import { UniswapFactory, ShushiswapFactory } from "../../utils/index";
import { wait } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
  },
}));
const PriceCheckerTable = (props) => {
  const { data } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState(2);
  const [UniwapPrice, setUniwapPrice] = React.useState(0);
  const [ShushiswapPrice, setShushiswapPrice] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log("data-------->>>data", data.tokenM);
  const priceCheck = async () => {
    try {
      const PriceAPI = await APITokenPriceHandler(data.tokenM, UniswapFactory);
      setUniwapPrice(PriceAPI);

      // await PriceAPI.wait();
      // console.log("PriceAPIShushiSwap ----- PriceAPI", PriceAPI);
      const PriceAPIShushiSwap = await APITokenPriceHandler(
        data.tokenM,
        ShushiswapFactory
      );

      console.log("PriceAPIShushiSwap -----", PriceAPIShushiSwap);

      setShushiswapPrice(PriceAPIShushiSwap);
      // const Price = await CheckPriceinDollor("Uniswap", data.tokenM);
      // // console.log("Price", Price);
      // // setUniwapPrice(Price);
      // const ShushiswpPrice = await ShibaSwapCheckPriceinDollor(
      //   "ShibaSwap",
      //   data.tokenM
      // );
      // console.log("ShushiswpPrice", ShushiswpPrice);
      // setShushiswapPrice(ShushiswpPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    priceCheck();
  }, []);
  useEffect(() => {
    // priceCheck();
    const timer = setTimeout(() => {
      priceCheck();
    }, 5000);

    return () => {
      // console.log(" ---- chatId ---- chatId timer 3", timer);
      clearTimeout(timer);
    };
  });
  return (
    <TableRow className={classes.root}>
      <TableCell component="th" scope="row">
        0*5566TYTY6767767
      </TableCell>
      <TableCell>
        <Box className="displayStart" style={{ alignItems: "flex-end" }}>
          <Avatar src="/images/bnb_icon.svg" width="30px" height="30px" />
          &nbsp;
          <Typography variant="h6" style={{ color: "rgba(61, 61, 61, 1)" }}>
            BTC
          </Typography>
          &nbsp; Bitcoin
        </Box>
      </TableCell>
      <TableCell>
        {" "}
        {/* {CheckPriceinDollor(
          "Uniswap",
          "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        )} */}
        Uniswap $1,100{UniwapPrice}
      </TableCell>
      <TableCell>
        {/* {data?.ExchangeB} */}
        Sushiswap $1,250{ShushiswapPrice}
      </TableCell>
      {/* <TableCell>{data?.DateTime}</TableCell> */}
      <TableCell
        style={{ color: "rgba(243, 109, 54, 1)", textAlign: "center" }}
      >
        {/* {" "}
        {UniwapPrice && ShushiswapPrice && "$"}
        {UniwapPrice - ShushiswapPrice > 0
          ? UniwapPrice - ShushiswapPrice
          : ShushiswapPrice - UniwapPrice} */}
        $43 {UniwapPrice}
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {/* {data?.ExchangeB} */}
        29-Nov-2023, 09:23 PM
      </TableCell>
      <TableCell style={{ color: "rgba(243, 109, 54, 1)" }}>
        {/* {" "}
        {UniwapPrice && ShushiswapPrice && "$"}
        {UniwapPrice - ShushiswapPrice > 0
          ? UniwapPrice - ShushiswapPrice
          : ShushiswapPrice - UniwapPrice} */}
        $45 {UniwapPrice}
      </TableCell>
      {/* <TableCell> {UniwapPrice - ShushiswapPrice}</TableCell> */}
    </TableRow>
  );
};

export default PriceCheckerTable;

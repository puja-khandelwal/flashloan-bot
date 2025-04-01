import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
// import { toast } from "react-toastify";
import { SUPPORTED_WALLETS } from "src/connectors";
import { toast } from "react-toastify";
import { ACTIVE_NETWORK, NftContractAddress } from "src/constants";
import GenerativeNFTABI from "src/ABI/GenerativeNFTABI.json";
import { injected } from "src/connectors";
import {
  getContract,
  getWeb3ContractObject,
  getWeb3Obj,
  swichNetworkHandler,
} from "src/utils";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import { getAPIHandler } from "src/config/service";

export const UserContext = createContext();

const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};
const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};
function checkLogin() {
  const accessToken = window.sessionStorage.getItem("token");
  return accessToken ? true : false;
}
export default function AuthProvider(props) {
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [balanceOfValue, setBalanceOfValue] = useState(0);
  const [MAX_NFT_SUPPLY, setMAX_NFT_SUPPLY] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [adminWalletAddress, setAdminWalletAddress] = useState("");
  const [nftPrice, setNftPrice] = useState(0);
  const [preSaleActive, setPreSaleActive] = useState(false);
  const [publicSaleActive, setPublicSaleActive] = useState(false);
  const [userNFTList, setUserNFTList] = useState([]);
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [isMetaMask, setIsMetaMask] = useState(false);
  const [userData, setUserData] = useState({});
  console.log("userData==>>>>", userData);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [wallectLoader, setWallectLoader] = useState(false);
  const [walletErr, setWallectErr] = useState(false);

  const disconnectWallte = async () => {
    deactivate();
  };

  // const userAddress = window.sessionStorage.getItem("token");
  // useEffect(() => {
  //   if (userAddress) {
  //     data.connectWallet(userAddress);
  //     console.log("hghjg", userAddress);
  //   }
  // }, [userAddress]);

  const userNFTListHadler = async (balanceOf, cancelTokenSource) => {
    setUserNFTList([]);
    const contract = getContract(
      NftContractAddress,
      GenerativeNFTABI,
      library,
      account
    );

    try {
      for (let i = 0; i < balanceOf; i++) {
        const id = await contract.tokenOfOwnerByIndex(account, i);
        const filter = await contract.tokenURI(id.toString());
        const res = await axios.get(filter, {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
        });
        if (res.status === 200) {
          setUserNFTList((prev) => [
            ...prev,
            { id: id.toString(), nfdData: res.data },
          ]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (account) {
      setWallectLoader(false);
    }
  });

  useEffect(() => {
    if (chainId != ACTIVE_NETWORK) {
      // swichNetworkHandler();
    }
  }, [chainId]);

  const getBalanceOf = async (abi, address, account) => {
    try {
      const contract = await getWeb3ContractObject(abi, address);
      const balanceOf = await contract.methods.balanceOf(account).call();

      return balanceOf.toString();
    } catch (error) {
      console.log("ERROR--", error);
      return 0;
    }
  };

  async function getBalanceOfFun() {
    setBalanceOfValue(
      await getBalanceOf(GenerativeNFTABI, NftContractAddress, account)
    );
  }

  const getCurrentMintingDetails = async () => {
    try {
      const web3 = await getWeb3Obj();

      const contractObj = await getWeb3ContractObject(
        GenerativeNFTABI,
        NftContractAddress
      );
      if (account) {
        getBalanceOfFun();
      }

      const preSaleActive = await contractObj.methods.preSaleActive().call();
      setPreSaleActive(preSaleActive);
      const publicSaleActive = await contractObj.methods
        .publicSaleActive()
        .call();

      setPublicSaleActive(publicSaleActive);
      const NFT_PRICE = await contractObj.methods.getNFTPrice(1).call();
      const getNFTPrice = web3.utils.fromWei(NFT_PRICE.toString());
      setNftPrice(getNFTPrice);

      const MAX_NFT_SUPPLY = await contractObj.methods.MAX_NFT_SUPPLY().call();
      setMAX_NFT_SUPPLY(Number(MAX_NFT_SUPPLY.toString()));

      const totalSupply = await contractObj.methods.totalSupply().call();

      setTotalSupply(Number(totalSupply.toString()));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getContractDetails = async () => {
    try {
      const contractObj = await getWeb3ContractObject(
        GenerativeNFTABI,
        NftContractAddress
      );
      const adminAccount = await contractObj.methods.owner().call();
      setAdminWalletAddress(adminAccount);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const connectWalletHandler = (data) => {
    try {
      const connector = data.connector;
      console.log(connector.walletConnectProvider?.wc?.uri);
      if (connector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }

      activate(connector, undefined, true).catch((error) => {
        if (error) {
          toast.error(JSON.stringify(error.message));
          localStorage.removeItem("walletName");
          activate(connector);
        }
      });
      console.log(connector.walletConnectProvider?.wc?.uri);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === localStorage.getItem("walletName")
      );
      if (selectectWalletDetails[0]?.data) {
        connectWalletHandler(selectectWalletDetails[0].data);
      }
    }
  }, []);

  const connectWalletAPICall = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.connectWallet,
        data: {
          walletAddress: account,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLogin(true);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      console.log("ERROR", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    data.updateUser(account);
  }, [account]); //eslint-disable-line
  // useEffect(() => {
  //   if (account) {
  //     connectWalletAPICall();
  //   } else {
  //     setIsLogin(false);
  //     setTokenSession(null);
  //   }
  // }, [account]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (window.sessionStorage.getItem("token")) {
      getProfileHandler(source);
    }
    return () => {
      source.cancel();
    };
  }, [window.sessionStorage.getItem("token")]);

  const getProfileHandler = async (source) => {
    try {
      setUserData({});
      setIsProfileUpdating(true);
      const response = await getAPIHandler({
        endPoint: "getProfileUser",
        source: source,
      });
      console.log("userData===>>>", response);
      if (response.data.responseCode === 200) {
        setUserData(response.data.result);
        setIsProfileUpdating(false);
      }
      setIsProfileUpdating(false);
    } catch (error) {
      setIsProfileUpdating(false);
    }
  };

  let data = {
    walletErr,
    setWallectErr,
    wallectLoader,
    setWallectLoader,
    balanceOfValue,
    MAX_NFT_SUPPLY,
    totalSupply,
    nftPrice,
    preSaleActive,
    publicSaleActive,
    adminWalletAddress,
    userNFTList,
    userData,
    isLogin,
    isMetaMask,
    updateUser: (account) => {
      setSession(account);
    },
    getProfileHandler: () => {
      getProfileHandler();
    },
    userLogIn: (type, data) => {
      setTokenSession(data);
      setIsLogin(type);
    },
    connectWallet: () => {
      console.log("-----network");
      activate(injected, undefined, true).catch((error) => {
        if (error) {
          activate(injected);
          setIsMetaMask(true);
          console.log("error---", error);
        }
      });
    },
    dicconectWalletFun: () => {
      disconnectWallte();
    },
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}

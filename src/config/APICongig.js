export const socketURL = "wss://node-oscar.mobiloitte.com";
// const url = "https://node-oscar.mobiloitte.com";
// const url = "https://node-tusharbot.mobiloitte.io";
const url = "http://91.108.104.148:4000";

// local
// export const socketURL = "ws://172.16.1.217:1939";
// const url = "http://172.16.1.217:2069";//Vishnu sir
// const url = "http://172.16.6.96:2069"; //Ritik

const user = `${url}/api`;
const admin = `${url}/api/v1/admin`;

const stake = `${url}/api/v1/stake`;
const nft = `${url}/api/v1/nft`;

const updateSubscribe = `${url}/api/v1/updateSubscribe`;

const ApiConfig = {
  // Signup us

  // signUp: `${user}/signup`,

  createNFT: `${nft}/createNFT`,
  listNFT: `${nft}/listNFT`,
  stakeNFT: `${stake}/stakeNFT`,
  stakeList: `${stake}/stakeList`,
  unstakeNFT: `${stake}/unstakeNFT`,
  botStats: `${user}/bot-stats`,

  userUpdateSubscribe: `${updateSubscribe}/userUpdateSubscribe`,
  // contact us

  addContactUs: `${user}/addContactUs`,
  connectWallet: `${user}/connectWallet`,

  updateProfile: `${user}/profile`,
  getProfile: `${user}/profile`,
  buyToken: `${user}/buyToken`,
  buyTokenList: `${user}/buyTokenList`,
  graph: `${user}/graph`,
  buySubscriptionplan: `${user}/buySubscriptionplan`,
  dashboard: `${user}/dashboard`,
  addAutoTradingArbitrage: `${user}/addAutoTradingArbitrage`,

  // admin
  listSubscriptionPlan: `${admin}/listSubscriptionPlan`,
  addSubscriptionPlan: `${admin}/addSubscriptionPlan`,
  deleteSubscriptionPlan: `${admin}/deleteSubscriptionPlan`,
  buySubscriptionPlanAllList: `${admin}/buySubscriptionPlanAllList`,
  viewBuySubscriptionPlan: `${admin}/viewBuySubscriptionPlan`,
  viewSubscriptionPlan: `${admin}/viewSubscriptionPlan`,
  listToken: `${admin}/listToken`,

  //USER AUTH
  signup: `${user}/signup`,
  verifyOTP: `${user}/verifyOTP`,
  login: `${user}/login`,
  forgotPassword: `${user}/forgotPassword`,
  resetPassword: `${user}/resetPassword`,
  resendOtp: `${user}/resendOtp`,
  getProfileUser: `${user}/getProfileUser`,
  changePassword: `${user}/changePassword`,

  //USER AUTH 2FA
  verify2Falogin: `${user}/verify2Falogin`,
  editEmail2FA: `${user}/editEmail2FA`,
  verify2FAOTP: `${user}/verify2FAOTP`,
  enableEmail2FAGoogle: `${user}/enableEmail2FAGoogle`,
  verifyTwoFactorGoogle: `${user}/verifyTwoFactorGoogle`,
};
export default ApiConfig;

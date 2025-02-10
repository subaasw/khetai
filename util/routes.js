const BASE_URL = "";

const FARMERS = {
  login: "/farmer/login",
  signup: "/farmer/register",
  current: "/farmer/me",
  requestOtp: "/farmer/request-otp",
  verifyToken: "/farmer/verify-otp",
};

const PRODUCTS = {
  all: "/products",
  single: "/products/:id",
  delete: "/products/:id",
  update: "/products/:id",
  prodcuts: "/upload/product-image",
};

const USERS = {
  login: "/user/login",
  me: "/user/me",
  signup: "/user/register",
  verifyOTP: "/user/verify-otp",
  sendOTP: "/user/send-otp",
};

const DISEASES_DETECTION_API = "/diseases-detect";

const SPEECH_TO_TEXT_API = "/upload/voice";

const AI_CHATBOT = "/chat";

export {
  AI_CHATBOT,
  DISEASES_DETECTION_API,
  SPEECH_TO_TEXT_API,
  USERS,
  PRODUCTS,
  FARMERS,
  BASE_URL,
};

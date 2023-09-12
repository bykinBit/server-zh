import {
  getNewsLatest,
  getNewsBefore,
  getNewsInfo,
  getNewsExtra,
  getPhoneCode,
  login,
  getUserInfo,
  getStoreList,
  addStore,
  removeStore,
  uploadAvatar,
  updateUser,
} from "../controller/index.js";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { uploads } from "../middleware/file.middleware.js";
export default function registerRouter() {
  this.get("/news_latest", getNewsLatest);
  this.get("/news_before", getNewsBefore);
  this.get("/news_info", getNewsInfo);
  this.get("/story_extra", getNewsExtra);
  this.post("/send_code", getPhoneCode);
  this.post("/login", login);
  this.get("/user_info", verifyAuth, getUserInfo);

  this.get("/store", verifyAuth, getStoreList);
  this.post("/store_news", verifyAuth, addStore);
  this.get("/store_remove", verifyAuth, removeStore);
  //上传文件
  this.post("/upload", verifyAuth, uploads.single("avatar"), uploadAvatar);
  //修改个人信息
  this.post("/user_update", verifyAuth, updateUser);
}

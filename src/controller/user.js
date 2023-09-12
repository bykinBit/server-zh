import dayjs from "dayjs";
import { generateRandomNum } from "../utils/index.js";
import { User, PhoneCode } from "../models/index.js";
//获取验证码
export const getPhoneCode = async (req, res) => {
  try {
    let { phone } = req?.body;
    let phoneCode = generateRandomNum();
    let result = await PhoneCode.findOne({ phone, state: 0 });
    if (!result) {
      let codeModel = new PhoneCode({
        phone,
        code: phoneCode,
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        state: 0,
      });
      await codeModel.save();
      return res.json({ code: 0, data: null, msg: "success" });
    }
    let { id, time } = result.toJSON();
    if (Date.now() - new Date(time).getTime() <= 30000) {
      return res.json({
        code: 1,
        data: null,
        msg: "code is validate,do not send again",
      });
    }
    //前一条已过期，更新状态，重新生成一条
    await PhoneCode.updateOne(
      {
        _id: id,
      },
      {
        state: 1,
      }
    );
    let codeModel = new PhoneCode({
      phone,
      code: phoneCode,
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      state: 0,
    });
    await codeModel.save();
    return res.json({ code: 0, data: null, msg: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ code: 1, data: null, msg: "fail" });
  }
};
export const login = async (req, res) => {
  try {
    const { phone, code } = req?.body;
    let result = await PhoneCode.find({ phone }).sort({ time: -1 });
    //查不到电话号码//信息不对
    //1、通过电话号码查询
    //2、没有代表电话号码错误
    //3、有值
    //   a、判断号码是否正确
    //   b、判断是否在有效期内
    if (!result.length) {
      return res.json({ code: 1, data: null, msg: "phone is wrong！" });
    }
    const { _id: id, code: codeVerify, time, state } = result[0];
    if (+code !== +codeVerify) {
      //前一条已过期，更新状态
      await PhoneCode.updateById(id);
      return res.json({ code: 1, data: null, msg: "code is wrong！" });
    }
    if (Date.now() - new Date(time).getTime() > 30000 || state === 1) {
      //已过期，更新状态
      await PhoneCode.updateById(id);
      return res.json({
        code: 1,
        data: null,
        msg: "code is expires,please try again later！",
      });
    }
    let user = await User.login(phone);
    if (user) {
      await PhoneCode.updateById(id);
      return res.json({
        code: 0,
        msg: "登录成功！",
        data: { token: user.getAccessToken(), type: 2 },
      });
    }
    let resUser = await User.create({ phone, type: 1 });
    if (resUser) {
      await PhoneCode.updateById(id);
      return res.json({
        code: 0,
        data: { token: resUser.getAccessToken(), type: 1 },
        msg: "注册成功！",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUserInfo = async (req, res) => {
  const { _uId } = req;
  try {
    let user = await User.findById(_uId);
    if (user) {
      res.json({ code: 0, data: user, msg: "success" });
      return;
    }
    return new HttpException(StatusCodes.UNAUTHORIZED, "用户数据有误！");
  } catch (error) {
    console.log(error);
  }
};
//上传头像
export const uploadAvatar = async (req, res, next) => {
  try {
    console.log(req.files, req.file, req.body);
    let domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`;
    let avatar = `${domain}/uploads/${req.file?.filename}`;
    res.send({ code: 0, data: { url: avatar }, msg: "success" });
  } catch (error) {
    console.log(error);
    next(new HttpException(StatusCodes.UNAUTHORIZED, error));
  }
};
//修改信息
export const updateUser = async (req, res, next) => {
  let { _uId: userId } = req;
  let { username, avatar } = req.body;
  try {
    await User.updateOne({ _id: userId }, { name: username, avatar });
    res.send({ code: 0, data: null, msg: "success" });
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, error));
  }
};

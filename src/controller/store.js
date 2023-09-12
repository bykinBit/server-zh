import { Store } from "../models/index.js";
export const getStoreList = async (req, res) => {
  const { _uId } = req;
  try {
    let data = await Store.find({ uId: _uId });
    res.json({ code: 0, data, msg: "success" });
  } catch (error) {
    console.log(error);
  }
};
export const addStore = async (req, res) => {
  const { _uId: uId } = req;
  const { newsInfo } = req.body;
  try {
    const { id, title, hint, images } = newsInfo;
    let storeModel = new Store({
      title,
      hint,
      images,
      newsId: id,
      uId,
    });
    await storeModel.save();
    res.json({ code: 0, data: null, msg: "success" });
  } catch (error) {
    console.log(error);
  }
};
export const removeStore = async (req, res) => {
  const { storeId } = req.query;
  try {
    await Store.findByIdAndDelete(storeId);
    res.json({ code: 0, data: null, msg: "success" });
  } catch (error) {
    console.log(error);
  }
};

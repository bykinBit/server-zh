import axios from "axios";
// 获取最新;
export async function getNewsLatest(req, res) {
  try {
    const { data } = await axios.get(
      "https://news-at.zhihu.com/api/4/news/latest"
    );
    res.json(data);
  } catch (error) {}
}
//获取之前新闻
export async function getNewsBefore(req, res) {
  try {
    const { time } = req.query;
    const { data } = await axios.get(
      `https://news-at.zhihu.com/api/4/news/before/${time}`
    );
    res.json(data);
  } catch (error) {}
}
//获取新闻详情
export async function getNewsInfo(req, res) {
  try {
    const { id } = req.query;
    const { data } = await axios.get(
      `https://news-at.zhihu.com/api/4/news/${id}`
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}
//获取新闻其他信息
export async function getNewsExtra(req, res) {
  try {
    const { id } = req.query;
    const { data } = await axios.get(
      `https://news-at.zhihu.com/api/4/story-extra/${id}`
    );
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

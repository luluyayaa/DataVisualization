// 处理业务逻辑的中间件,读取某个json文件的数据

const path = require('path')
//调用文件解析工具类
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  // 获取请求的url
  const url = ctx.request.url // /api/seller   ../data/seller.json

  //将url转换为文件路径
  let filePath = url.replace('/api', '') //  /seller
  filePath = '../data' + filePath + '.json'  // ../data/seller.json
  //将当前文件路径__dirname，与filePath拼接获取绝对路径
  filePath = path.join(__dirname, filePath)
  console.log(filePath)
  //工具类解析的文件为ret并放响应体里
  try {
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret
    //如果返回error抛出异常，返回404
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败, 文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }
 
  console.log(filePath)
  await next()
}
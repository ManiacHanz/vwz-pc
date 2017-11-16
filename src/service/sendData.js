import fetch from '../config/fetch'



//通用图片、图标上传   头像图标上传域名/site/upload_headimg
// export const __sendBase64 = (data) => fetch('/site/upload_headimg',	data,	'POST')
export const __sendBase64 = (data, url='/site/upload_img') => fetch(url,	data,	'POST')

//退出登录
export const __loginOut = () => fetch('/login/logout', {}, 'POST')

//修改密码
export const __modifyPsw = (data) => fetch('/site/modify_pwd', data, 'POST')

//修改菜单主页
export const __sendHomePanel = (data) => fetch('/site/menu_save', data, 'POST')

//修改新闻列表
export const __sendListPanel = (data) => fetch('/site/news_save', data, 'POST')

//修改用户列表
export const __sendUserPanel = (data) => fetch('/site/service_datas', data, 'POST')

//修改主题
export const __sendTheme = (data) => fetch('/site/themes', data, 'POST')
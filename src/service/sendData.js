import fetch from '../config/fetch'



//通用图片、图标上传   头像图标上传域名/site/upload_headimg
// export const __sendBase64 = (data) => fetch('/site/upload_headimg',	data,	'POST')
export const __sendBase64 = (data, url='/site/upload_img') => fetch(url,	data,	'POST')

//退出登录
export const __loginOut = (data) => fetch('/login/logout', data, 'POST')

//修改网站名称
export const __modifyProjectName = (data) => fetch('/site/modify_sitename', data, 'POST')

//修改密码
export const __modifyPsw = (data) => fetch('/site/modify_pwd', data, 'POST')

//修改菜单主页
export const __sendHomePanel = (data) => fetch('/site/menu_save', data, 'POST')

//修改新闻列表
export const __sendListPanel = (data) => fetch('/site/news_save', data, 'POST')

//修改用户列表
export const __sendUserPanel = (data) => fetch('/site/service_save', data, 'POST')

//修改主题
export const __sendTheme = (data) => fetch('/site/themes', data, 'POST')

//显示 隐藏文章
export const __modifyDisplay = (data) => fetch('/site/set_display', data, 'POST')

//删除文章
export const __delArticle = (data) => fetch('/site/del_article' ,data, 'POST')

// 编辑文章
export const __editArticle = (data) => fetch('/site/add_article', data, 'POST')

//删除图片
export const __delImg = (data) => fetch('/site/del_img', data, 'POST')
// ==UserScript==
// @name
// @namespace    https://github.com/AliubYiero/TemperScripts/
// @version      beta0.1
// @description
// @author       Yiero
// @match        https:/https:/www.ddyueshu.com/*
// @match        https:/https:/www.52bqg.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=52bqg.org
// @require      file://D:/vscode/Web/TemperScripts/Get Novel.js
// ==/UserScript==


const novelDownloadManager = {
	baseURL: document.URL,		// 页面URL
	bookName: '',				// 书名
	author: '',					// 作者名
	volumeList: [],				// 卷名数组
	chapterLinkList: [],		// 章节链接数组
	chapterContentList: [],		// 正文内容节点
	adContentList: [],			// 广告内容节点（用于判断是否删除错误）
	isChapter: false,			// 是否是正文章节节点

	async start() {
		// console.log(this.baseURL)
		// 阻止正文网页
		if (this.baseURL.split('/')[4]) return
		// 获取下载链接
		await this.getDownloadLinks()

		// 下载章节内容 | 废弃(转移到`getDownloadLinks`函数进行)
		// for (let i = 0; i < this.chapterLinkList.length; i++) {
		// 	const url = this.chapterLinkList[i]
		// 	console.log(`开始下载${url}`)
		// 	await this.downloadNovel(url)
		// }
		// console.log(this.chapterContentList)

		// 下载文件
		console.log("全部加载完成，开始下载文件")
		await this.download(`${this.bookName} [${this.author}]著`, this.chapterContentList.join('\n'))
		this.download(`${this.bookName} 广告`, this.adContentList.join('\n'))
	},
	async getDownloadLinks() {
		// 获取书名
		this.bookName = document.querySelector('#info > h1').innerText
		this.author = document.querySelector('#info > p > a').innerText
		this.description = document.querySelector('#intro').innerText.replace('&nbsp;', '').trim()

		this.chapterContentList.push(this.bookName)
		this.chapterContentList.push(`作者：${this.author}`)
		this.chapterContentList.push('内容简介：')
		this.splitPassage(this.description, '<br>')

		// 获取帖子节点列表
		const listItems = document.querySelectorAll('#list > dl > *')
		// 写入卷名
		for (let i = 0; i < listItems.length; i++) {
			const item = listItems[i]


			// 判断卷名
			if (item.tagName === 'DT') {
				// 删除书名标记
				let volume = item.innerText.replace(`《${this.bookName}》`, '').trim()
				switch (volume) {
					case '正文':
						volume = '第一卷'
						this.isChapter = true
						continue
				}

				// 写入卷名
				this.volumeList.push(volume)
				this.chapterContentList.push(volume)
				continue
			}
			// 判断章节
			if (this.isChapter && item.tagName === 'DD') {
				if (!item.children[0]) continue
				const link = item.children[0].href
				const title = item.children[0].innerText
				this.chapterLinkList.push(link)

				console.log(`[${(i < listItems.length-1 && (i/listItems.length*100).toFixed(2)*1 || 100)}%] 开始下载${title} (${link})`)
				await this.downloadNovel(link)

				// if (i >= 30) break
				continue
			}

		}
	},
	downloadNovel(url) {
		const _this = this
		let prevContent = ''
		return new Promise(resolve => {
			// 创建承载元素
			$("<div id='read-demo'></div>>").load(`${url}`, function(response,status){
				if (status=="success"){
					const html = $(response)
					console.log(html)
					const title = html[20].querySelector('.bookname > h1').innerText
					const contentHtml = html[20].querySelector('#content').innerHTML

					// 检查重复章节
					if (contentHtml === prevContent) resolve()
					else {
						// 重复判断元素加载
						prevContent = contentHtml

						// 添加章节名
						_this.chapterContentList.push(title)
						_this.splitPassage(contentHtml, '<br><br>')

						// 删除承载元素
						$('#read-demo').remove()
						resolve()
					}

				}
			})
		})
	},
	splitPassage(content, splitSign) {
		const _this = this
		// 删除换行
		let contentList = content.split(splitSign)
		// 添加正文内容
		for (let i = 1; i < contentList.length; i++) {
			let content = contentList[i]
			// 删除步进
			content = content.replaceAll('&nbsp;', '')

			// 判断广告，跳过段落
			if (content.match('书友大本营')) {
				_this.adContentList.push(content.trim())
				continue
			}

			// 提交内容
			_this.chapterContentList.push(content.trim())
		}
	},
	download(fileName, text) {
		const blob = new Blob([text]);
		const saveLink = document.createElement('a');
		saveLink.href = URL.createObjectURL(blob);
		// 设置 download 属性
		saveLink.download = fileName;
		saveLink.click();
	}
}

console.log( 'start' );
novelDownloadManager.start()


// 创建承载元素
// chapterContentList = []
// $("<div id='read-demo'></div>>").load(`https://www.52bqg.org/book_128946/54302203.html`, function(response,status){
// 	if (status=="success"){
// 		const html = $(response)
// 		const title = html[5].content
// 		const contentHtml = html[20].querySelector('#content').innerHTML
//
// 		// 添加章节名
// 		chapterContentList.push(title)
// 		// 删除换行
// 		let contentList = contentHtml.split('<br><br>')
// 		// 添加正文内容
// 		for (let i = 1; i < contentList.length; i++) {
// 			const content = contentList[i]
// 			// 删除步进
// 			let newContentStr = content.replaceAll('&nbsp;', '')
// 			// 提交内容
// 			chapterContentList.push(newContentStr.trim())
// 		}
//
// 		console.log(chapterContentList)
// 		// 删除承载元素
// 		// $('#read-demo').remove()
// 	}
// })

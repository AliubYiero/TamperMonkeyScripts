import { urlJudge } from '../utils';

/** 模拟考试界面：解锁题目乱序选择 */
export function unlockRandomOption() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	
	// 清空用户选择
	localStorage.removeItem( 'openRandomOption' );
	
	// 获取随机选项选择容器
	console.info( 'Remove Origin Random Option Btn. ' );
	const formContainer = document.querySelectorAll( 'div.box-card > form > div' ) as NodeList;
	let randomOptionLabel: HTMLDivElement = document.createElement( 'div' );
	formContainer.forEach( formItem => {
		if ( ( <HTMLDivElement> formItem ).querySelector( 'label' )?.innerText === '选项乱序' ) {
			randomOptionLabel = formItem as HTMLDivElement;
		}
	} );
	
	// 删除原生选项
	const randomOptionBtn = randomOptionLabel.querySelector( 'div' ) as HTMLElement;
	randomOptionBtn.remove();
	
	// 添加本脚本的选项
	const reRandomOptionBtnContainer = document.createElement( 'form' );
	reRandomOptionBtnContainer.id = 'random-option-container';
	// 更改样式使其和原样式相容
	reRandomOptionBtnContainer.style.height = '40px';
	reRandomOptionBtnContainer.style.lineHeight = '40px';
	reRandomOptionBtnContainer.innerHTML = `
		<input type="radio" name="randomOption" id="random-option--open" value="true">
		<label for="random-option--open">开启</label>
		<input type="radio" name="randomOption" id="random-option--close" value="false">
		<label for="random-option--close">关闭</label>
		<!-- <div style="text-indent: 2em;color:red;background:#f8f8f8;">请注意，当您开启本脚本的随机选项时，您需要使用键盘选择选项，使用鼠标选择选项会出现选项映射错误导致无法获得正确答案。</div> -->
	`;
	randomOptionLabel.append( reRandomOptionBtnContainer );
	
	// 储存用户选择
	reRandomOptionBtnContainer.addEventListener( 'change', e => {
		localStorage.setItem( 'openRandomOption', ( <HTMLInputElement> e.target ).value );
	} );
}

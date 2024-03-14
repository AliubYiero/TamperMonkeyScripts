import { urlJudge } from '../utils';

/** 模拟考试界面：题目选择添加快捷选项 */
export function addQuickOption() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	
	console.info( 'Add quick question choose option. ' );
	
	// 获取题目选择容器
	const tableContainer = document.querySelector( '.custom-table' ) as HTMLTableElement;
	
	// 获取所有行容器
	const colList = tableContainer.querySelectorAll( 'tr:not(:last-of-type)' );
	colList.forEach( col => {
		// 获取列容器
		const row = col.querySelector( 'td:nth-of-type(2)' ) as HTMLInputElement;
		
		// 获取题目选择输入框
		const colInput = row.querySelector( 'input' ) as HTMLInputElement;
		const { min, max } = colInput;
		
		// 绑定最大值按钮
		const maxBtn = document.createElement( 'button' );
		maxBtn.classList.add( 'el-button' );
		maxBtn.innerText = 'Max';
		maxBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = max;
		} );
		// 绑定最小值按钮
		const minBtn = document.createElement( 'button' );
		minBtn.classList.add( 'el-button' );
		minBtn.innerText = 'Min';
		minBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = min;
		} );
		// 绑定10%按钮
		const tenPercentBtn = document.createElement( 'button' );
		tenPercentBtn.classList.add( 'el-button' );
		tenPercentBtn.innerText = '10%';
		tenPercentBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = String( Math.ceil( parseInt( max ) * 0.1 ) );
		} );
		row.append( maxBtn );
		row.append( minBtn );
		row.append( tenPercentBtn );
	} );
}

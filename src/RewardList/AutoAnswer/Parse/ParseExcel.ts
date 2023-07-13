/**
 * ParseExcel.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import ExcelJS from 'exceljs';

export {
	readExcel
}

async function readExcel( path: string ) {
	const workbook = new ExcelJS.Workbook();
	
	// 读取 Excel 文件
	await workbook.xlsx.readFile( path );
	
	// 获取第一个工作表
	const worksheet = workbook.getWorksheet( 1 );
	
	// 遍历工作表中的行和列，并输出数据
	// @ts-ignore
	worksheet.eachRow( ( row, rowNumber ) => {
		// @ts-ignore
		row.eachCell( ( cell, colNumber ) => {
			console.log( `Cell ${ colNumber } in Row ${ rowNumber } = ${ cell.value }` );
		} );
	} );
}

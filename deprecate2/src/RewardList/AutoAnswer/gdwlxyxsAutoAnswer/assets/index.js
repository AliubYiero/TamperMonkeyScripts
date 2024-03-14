// 引入fs读取src目录下的所有文件
const fs = require( 'fs-extra' );
const mammoth = require( 'mammoth' );
const { match } = require( 'assert' )

const files = ( function readSrcFiles() {
	return fs.readdirSync( './src' );
} )();

/**
 *
 * {
 *     question:
 *     answers: []
 * }
 * */
let fileName = '多媒体技术';
// 调用mammoth处理所有的Files
( async function readDocxFileAsTxt() {
	let questionList = [];
	
	for ( let i = 0; i < files.length; i++ ) {
		const file = files[i];
		const obj = {
			question: '',
			answers: [],
		}
		
		if ( file === `《${ fileName }》复习资料.docx` ) {
			await mammoth.extractRawText( { path: `./src/${ file }` } )
			             .then(
				             res => {
					             console.log( res.value );
					             // 获取所有文本
					             const contentString = res.value;
					
					             let innerQuestion = false;
					             contentString.split( '\n' ).forEach( content => {
						             // 删除空行
						             if ( !content ) {
							             return;
						             }
						
						             // 获取题目
						             if ( content.match( /^\d/ ) ) {              // 题目文本
							             content = content.replace( /\d+[、.．]/, '' ).replace( /（\d+(\.\d+)?）/, '' ).trim();
							             console.log( `--------------------------------------` );
							             console.log( `获取到问题：${ content }` );
							             questionList.push( {
								             question: content,
								             options: {},
								             answers: [],
							             } )
							             innerQuestion = true;
							
						             }
						             else if ( innerQuestion && content.match( /^正?确?答案/ ) ) {        // 正确
							             content = content.replace( /^正?确?答案[：:]/, '' ).trim().replace( /^答：/, '' ).trim();
							             console.log( `获取到答案选项：${ content }` );
							             if ( content.match( /^[ABCDEFG]+$/ ) ) {
								             content.split( '' ).forEach(
									             letter => {
										             const answer = questionList[questionList.length - 1].options[letter];
										             console.log( `获取到选择题答案文本：${ answer }` );
										             questionList[questionList.length - 1].answers.push( answer );
									             }
								             )
							             }
							             else {
								             console.log( `获取到简答/判断题答案文本：${ content }` );
								             questionList[questionList.length - 1].answers.push( content );
							             }
							             delete questionList[questionList.length - 1].options;
							             innerQuestion = false;
						             }
						             else if ( innerQuestion ) {        // 选项
							             let optionLetter;  // 选项编号
							             if ( content.match( /^[ABCDEFG]/ ) ) {
								             optionLetter = content.match( /^[ABCDEFG]/ )[0];
							             }
							             content = content.replace( /^[ABCDEFG][、.．]/, '' ).trim();
							             console.log( `获取到选项：${ content }` );
							             questionList[questionList.length - 1].options[optionLetter] = content;
						             }
					             } )
				             }
			             )
		}
	}
	// console.log( questionList );
	fs.outputJSONSync( `./Question(${ fileName }).json`, questionList );
	
} )();

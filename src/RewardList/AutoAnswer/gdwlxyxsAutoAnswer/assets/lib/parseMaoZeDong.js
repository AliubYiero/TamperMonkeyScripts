const mammoth = require( 'mammoth' )
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
				             content = content.replace( /\d+、/, '' ).replace( /（\d\.\d）/, '' ).trim();
				             console.log( `获取到问题：${ content }` );
				             questionList.push( {
					             question: content,
					             options: {},
					             answers: [],
				             } )
				             innerQuestion = true;
				
			             }
			             else if ( innerQuestion && content.match( /^正确答案/ ) ) {        // 正确
				             content = content.replace( /^正确答案：/, '' ).trim().replace( /^答：/, '' ).trim();
				             console.log( `获取到答案选项：${ content }` );
				             if ( content.match( /^[ABCDEFG]/ ) ) {
					             content.split( '' ).forEach(
						             letter => {
							             const answer = questionList[questionList.length - 1].options[letter];
							             console.log( `获取到答案文本：${ answer }` );
							             questionList[questionList.length - 1].answers.push( answer );
						             }
					             )
				             }
				             else {
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
				             content = content.replace( /^[ABCDEFG]、/, '' ).trim();
				             console.log( `获取到选项：${ content }` );
				             questionList[questionList.length - 1].options[optionLetter] = content;
			             }
		             } )
	             }
             )

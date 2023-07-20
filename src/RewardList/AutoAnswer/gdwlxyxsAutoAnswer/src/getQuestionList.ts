/**
 * getQuestionList.ts
 * created by 2023/7/20
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import question1 from '../assets/Question(商品学).json';
import question2 from '../assets/Question(基础会计).json';
import question3 from '../assets/Question(大学英语).json';
import question4 from '../assets/Question(形势与政策).json';
import question5 from '../assets/Question(思想道德修养与法律基础).json';
import question6 from '../assets/Question(毛泽东思想和中国特色社会主义理论体系概论).json';

const questionList: { question: string, answers: string[] }[] = [
	...question1,
	...question2,
	...question3,
	...question4,
	...question5,
	...question6,
];

export default questionList;

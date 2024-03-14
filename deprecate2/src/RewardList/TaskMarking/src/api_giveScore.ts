/**
 * api_giveScore.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import axios from 'axios'

export {
	api_getScoreList,
	api_getSubmissions,
	api_giveScore,
	giveScore
}


let courseId: string;
let examineeId: string;
let submissionId: number;
let instanceId: number;
let subjectId: number;

function api_getScoreList() {
	courseId = location.pathname.split( '/' )[ 2 ];
	examineeId = ( <string[]> location.hash.match( /\/(\d*?)\?/ ) )[ 1 ];
	return axios.get( `https://lms.ouchn.cn/api/exams/${ courseId }/score-list?conditions=%7B%22examinee_ids%22%3A%5B%22${ examineeId }%22%5D%7D` ).then(
		( res ) => {
			examineeId = res.data.examinees[ 0 ].id;
			console.info( 'examineeId', examineeId );
			submissionId = res.data.examinees[ 0 ].submissions[ 0 ].id
			console.info( 'submissionId', submissionId );
			return res;
		}
	).catch(
		( error ) => {
			console.error( error );
		}
	);
}

function api_getSubmissions() {
	return axios.get( `https://lms.ouchn.cn/api/exams/${ courseId }/submissions/${ submissionId }` ).then(
		( res ) => {
			console.info( res );
			instanceId = res.data.instance_id;
			console.info( 'instanceId', instanceId );
			subjectId = res.data.submission_data.subjects[ 0 ].subject_id;
			console.info( 'subjectId', subjectId );
			return res;
		}
	).catch(
		( error ) => {
			console.error( error );
		}
	);
}

function api_giveScore( score: number ) {
	return axios.post( `https://lms.ouchn.cn/api/exams/${ courseId }/give-score`, {
		"examinee_id": examineeId,
		"graded_subjects": [
			{
				"subject_id": subjectId,
				"score": String( score ),
				"instance_id": instanceId,
				"parent_id": null
			}
		],
		"submission_id": submissionId
	} )
}

function giveScore( score: number ) {
	return api_getScoreList().then(
		() => {
			api_getSubmissions().then(
				() => {
					api_giveScore( score ).then(
						( res ) => res
					)
				}
			)
		}
	);
}

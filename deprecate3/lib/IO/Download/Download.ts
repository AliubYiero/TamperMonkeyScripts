/**
 * Download.ts
 * created by 2023/7/14
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	downloadFile
}

const downloadFile = ( blob: Blob, fileName: string ) => {
	const url = URL.createObjectURL( blob );
	const a = document.createElement( "a" );
	a.href = url;
	a.download = fileName;
	a.click();
	URL.revokeObjectURL( url );
	a.remove();
}

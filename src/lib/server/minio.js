import Minio from 'minio';
export const minioClient = new Minio.Client({
	endPoint: '129.151.113.4',
	port: 9000,
	useSSL: false,
	accessKey: 'inacap',
	secretKey: 'inacap123'
});
export function toBuffer(ab) {
	var buf = new Buffer(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		buf[i] = view[i];
	}
	return buf;
}

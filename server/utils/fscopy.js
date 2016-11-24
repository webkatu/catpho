import fs from 'fs';

export default (src, dest) => {
	return new Promise((res, rej) => {
		const r = fs.createReadStream(src);
		r.on('error', (err) => { rej(err); });

		const w = fs.createWriteStream(dest);
		w.on('error', (err) => { rej(err); });
		w.on('close', () => { res(); });

		r.pipe(w);
	});
}
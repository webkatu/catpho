import express from 'express';
import config from '../config.js';
import Contents from '../models/Contents.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
	if(req.query.share !== 'true') return next();

	const contentId = Number(req.params.contentId);
	const url = `${config.appServer}/contents/${contentId}/`;
	if(Number.isNaN(contentId)) return res.redirect(`${config.appServer}/contents/${req.params.contentId}/`);

	const result = await new Contents().selectOnce(
		['filename', 'name', 'description'],
		'?? = ?',
		{ id: contentId }
	);
	if(result === null) return res.redirect(url);

	const imageSrc = `${config.contentsUrl}/${result.filename}`;
	const name = (result.name === '') ? 'none' : result.name;
	const description = (result.description === '') ? 'none' : result.description;

	res.send(html({
		name,
		url,
		imageSrc,
		description,
	}));
});

const html = (params) => {
	return (
`
<head>
	<meta property="og:title" content="${params.name}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="${params.url}" />
	<meta property="og:image" content="${params.imageSrc}" />
	<meta property="og:site_name" content="catpho" />
	<meta property="og:description" content="${params.description}" />
	<meta property="twitter:card" content="photo" />
	<script>
		location.href = '${params.url}';
	</script>
</head>
`
	);
}

export default router;
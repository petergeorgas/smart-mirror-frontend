import Parser from "rss-parser";

export default async function handler(req, res) {
	//TODO: Genres of news. For now, we do sports.
	const parser = new Parser();

	const feed = await parser.parseURL(
		"https://rss.app/feeds/OLbU9M7mW4Xmz8ai.xml"
	);
	console.log(feed);

	res.json(feed);
}

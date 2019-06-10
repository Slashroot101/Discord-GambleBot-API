exports.shortLinkRedirect = {
	description: 'Gets shortlink from shortcode and redirects',
	tags: ['Index'],
	summary: 'Gets shortlink from shortcode and redirects',
	params: {
	  type: 'object',
	  properties: {
			shortCode: { type: 'string', description: 'Shortcode of URL to redirect to'},
		},
	},
	exposeRoute: true,
	response: {
	  302: {
		description: 'Succesfully redirected user to original URL',
		type: 'object',
		properties: {
			shortenedLink: {
				type: 'object',
				properties: {},
			}
		}
		},
		404: {
			description: 'Short link not found',
			type: 'object',
			properties: {}
		}
	}
};
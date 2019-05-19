const shortenedLinkWithoutID = {
	createdBy: {
	  type: 'array',
	  items: {
		type: 'string',
	  }
	},
	createdOn: { type: 'string', description: 'The date the shortened link was created on', },
	originalUrl: { type: 'string', description: 'The original URL of the shortened link',},
	shortCode: { type: 'string', description: 'The randomly generated short code for the link', }
  };

const shortenedLink = {
  _id: { type: 'string', description: 'Randomly generated database ID'},
  ...shortenedLinkWithoutID,
};


exports.createShortenedLink = {
	description: 'Create a new shortened link',
	tags: ['ShortenedLinks'],
	summary: 'Creates a shortened link',
	body: {
	  type: 'object',
	  properties: shortenedLinkWithoutID,
	},
	exposeRoute: true,
	response: {
	  200: {
		description: 'Successfully created a new shortened link',
		type: 'object',
		properties: {
		  shortenedLink: {
			type: 'object',
			properties: shortenedLink,
		  }
		},
	  }
	}
  };
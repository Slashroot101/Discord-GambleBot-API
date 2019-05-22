const shortenedLinkWithoutID = {
	createdBy: {
	  type: 'array',
	  items: {
		type: 'string',
	  }
	},
	createdOn: { type: 'string', description: 'The date the shortened link was created on', },
	originalUrl: { type: 'string', description: 'The original URL of the shortened link',},
	shortCode: { type: 'string', description: 'The randomly generated short code for the link', },
};

const shortLinkBeforeCreate = {
	originalUrl: { type: 'string', description: 'The original URL of the shortened link',},
	createdBy: {
		type: 'array',
		items: {
		  type: 'string',
		}
	  },
}

const shortenedLinkWithoutHostname = {
	_id: { type: 'string', description: 'Randomly generated database ID'},
  __v: { type: 'number' },
  ...shortenedLinkWithoutID,
}

const shortenedLink = {
  _id: { type: 'string', description: 'Randomly generated database ID'},
  __v: { type: 'number' },
  hostname: { type: 'string', description: 'The hostname that the link shortener is listening on',},
  ...shortenedLinkWithoutID,
};

exports.createShortenedLink = {
	description: 'Create a new shortened link',
	tags: ['ShortenedLinks'],
	summary: 'Creates a shortened link',
	body: {
	  type: 'object',
	  properties: shortLinkBeforeCreate,
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
		}
	  }
	}
};

exports.getWithFilter = {
	description: 'Get shortened links with a filter',
	tags: ['ShortenedLinks'],
	summary: 'Gets the shortened links with a filter',
	query: {
		createdBy: { type: 'string', description: 'The users that created this short link'},
		originalUrl: { type: 'string', description: 'The original URL that the users shortened'},
	},
	exposeRoute: true,
	response: {
	  200: {
		description: 'Successfully created a new shortened link',
		type: 'object',
		properties: {
			shortenedLinks: {
				type: 'array',
				items: {
					type: 'object',
					properties: shortenedLinkWithoutHostname
				},
			},
			hostname: { type: 'string', description: 'The hostname that the URL shortener currently sits on'},
			}
	  }
	}
};
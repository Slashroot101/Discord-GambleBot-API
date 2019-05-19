const shortenedLink = {
  _id: { type: 'String', description: 'Randomly generated database ID'},
  ...shortenedLinkWithoutID,
};

const shortenedLinkWithoutID = {
  
  createdBy: {
    type: 'array',
    items: {
      type: 'String',
    }
  },
  createdOn: { type: 'Date', description: 'The date the shortened link was created on', },
  originalUrl: { type: 'String', description: 'The original URL of the shortened link',},
  shortCode: { type: 'String', description: 'The randomly generated short code for the link', }
};

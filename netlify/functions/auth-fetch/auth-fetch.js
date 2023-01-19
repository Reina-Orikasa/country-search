// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require('node-fetch');

const handler = async function (event, context) {
  const querystring = event.queryStringParameters;
  const country = querystring.country;

  const headers = {
    Accept: 'application/json',
    Authorization: `Client-ID ${process.env.PHOTO_KEY}`,
  };
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${country}`,
      { headers }
    );

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };

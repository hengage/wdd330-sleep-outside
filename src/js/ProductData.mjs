const baseURL = import.meta.env.VITE_SERVER_URL;

function getBaseURL() {
  if (!baseURL) {
    throw new Error(
      'Missing VITE_SERVER_URL. Check your .env file and restart the Vite dev server.',
    );
  }

  return baseURL;
}

function buildApiURL(path) {
  const normalizedBaseURL = getBaseURL().endsWith('/')
    ? getBaseURL()
    : `${getBaseURL()}/`;

  return new URL(path, normalizedBaseURL).toString();
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(buildApiURL(`products/search/${category}`));
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(buildApiURL(`product/${id}`));
    const data = await convertToJson(response);
    return data.Result;
  }
}

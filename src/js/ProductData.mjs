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

async function convertToJson(res) {
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await res.json()
    : await res.text();

  if (res.ok) {
    return data;
  }

  const message =
    data?.message ||
    data?.Message ||
    data?.error ||
    (data &&
      typeof data === 'object' &&
      Object.keys(data).length > 0 &&
      Object.values(data).every((value) => typeof value === 'string')
      ? Object.entries(data)
        .map(([, value]) => value)
        .join(', ')
      : null) ||
    (typeof data === 'string' ? data : 'Bad Response');

  throw new Error(message);
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(buildApiURL(`products/search/${category}`));
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(searchTerm) {
    const response = await fetch(
      buildApiURL(`products/search/${encodeURIComponent(searchTerm)}`),
    );
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(buildApiURL(`product/${id}`));
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const response = await fetch(buildApiURL('checkout'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return convertToJson(response);
  }
}

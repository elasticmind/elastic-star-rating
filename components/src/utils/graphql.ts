const GRAPHQL_API_ENDPOINT = 'https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/query';

export const query = async (config) => {
  const urlParams = `${stringifyConfig(config)}`;
  const url = new URL(GRAPHQL_API_ENDPOINT)
  url.search = new URLSearchParams({ query: urlParams }).toString();
  return await (await fetch(url.toString())).json();
}

export const mutation = async (config) => {
  const urlParams = `mutation ${stringifyConfig(config)}`;
  const url = new URL(GRAPHQL_API_ENDPOINT)
  url.search = new URLSearchParams({ query: urlParams }).toString();
  await fetch(url.toString());
}

const stringifyConfig = (config) => `{${
  Object.entries(config).map(
    ([field, parameters]) => `${field}(${
      Object.entries(parameters).map(
        ([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`
      ).join(', ')
    })`
  ).join(', ')
}}`;
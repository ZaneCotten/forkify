import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // Timeout user after set time
    const response = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);

    // Parse data to JSON
    const data = await response.json();

    // Check fetch status
    if (!response.ok) throw new Error(`Fetch failed! ${data.message}\n`);

    return data;
  } catch (err) {
    throw err;
  }
};

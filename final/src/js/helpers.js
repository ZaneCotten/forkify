import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`),
            );
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newRecipe),
              })
            : fetch(url);

        // Timeout user after set time
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

        // Parse data to JSON
        const data = await response.json();

        // Check fetch status
        if (!response.ok) throw new Error(`Fetch failed! ${data.message}\n`);

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

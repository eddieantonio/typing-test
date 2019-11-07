/**
 * Sloppy code to dump local storage to a JSON file.
 */

export function localStorage2POJO() {
  let storage = window.localStorage;

  let pojo = {};

  for (let i = 0; i <  storage.length; i++) {
    let key = storage.key(i);
    // Values are strings that are JSON-encoded.
    let rawValue = storage.getItem(key);
    let value;
    try {
      value = JSON.parse(rawValue);
    } catch (e) {
      // It might not be valid JSON. In that case, just let it be the raw
      // string.
      if (!(e instanceof SyntaxError))
        throw e;
      value = rawValue;
    }

    pojo[key] = value;
  }

  return pojo;
}

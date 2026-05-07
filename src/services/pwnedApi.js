export async function checkPasswordBreach(password) {
  const encoder = new TextEncoder();

  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-1", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const sha1 = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const prefix = sha1.slice(0, 5);

  const suffix = sha1.slice(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );

  const text = await response.text();

  const hashes = text.split("\n");

  const found = hashes.find((line) =>
    line.startsWith(suffix)
  );

  if (found) {
    return found.split(":")[1].trim();
  }

  return null;
}
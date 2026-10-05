export function capitalLetter(val?: string) {
  if (!val) return "";
  else return val.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

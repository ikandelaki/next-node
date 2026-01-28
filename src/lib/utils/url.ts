export const normalizeImageUrl = (url: string) => {
  return url.replace(/^\/?public/, '');
}
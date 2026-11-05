/** Defense in depth for public property payloads, including metadata and cards.
 * Missing flags on older API payloads retain the initial all-approved behavior. */
export function filterPropertyImageVisibility<T>(data: T): T {
  if (Array.isArray(data)) return data.map(item => filterPropertyImageVisibility(item)) as T;
  if (!data || typeof data !== 'object') return data;
  const value = data as Record<string, any>;
  if (Array.isArray(value.items)) return { ...value, items: value.items.map((item: unknown) => filterPropertyImageVisibility(item)) } as T;
  if (!Array.isArray(value.img) && !value.imgCover) return data;
  const images = Array.isArray(value.img)
    ? value.img.filter((image: any) => image && typeof image === 'object' && image.contentApproved !== false)
    : undefined;
  let cover = value.imgCover;
  if (cover?.contentApproved === false) {
    const first = images?.[0];
    const url = first?.thumbWeb || first?.imgSlider || first?.thumb;
    cover = url ? { name: first.name || '', thumbWeb: url, contentApproved: true } : undefined;
  }
  return { ...value, ...(images ? { img: images } : {}), imgCover: cover } as T;
}

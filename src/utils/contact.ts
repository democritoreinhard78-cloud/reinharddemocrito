/** Builds a `tel:` href from a human-formatted phone number. */
export const telHref = (phone: string): string =>
  `tel:${phone.replace(/[^0-9+]/g, '')}`;

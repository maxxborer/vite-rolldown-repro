export const formatDate = (value, locale = 'en-US') => new Intl.DateTimeFormat(locale, {
  year: 'numeric', month: 'short', day: '2-digit',
}).format(new Date(value));

export const formatTime = (value, locale = 'en-US') => new Intl.DateTimeFormat(locale, {
  hour: '2-digit', minute: '2-digit',
}).format(new Date(value));

import * as Sentry from '@sentry/nextjs';

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const setUser = Sentry.setUser;
export const setContext = Sentry.setContext;
export const addBreadcrumb = Sentry.addBreadcrumb;

export { Sentry };

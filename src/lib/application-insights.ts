import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let appInsights: ApplicationInsights | null = null;

export function initAppInsights() {
  const connectionString = process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING;
  
  if (!connectionString || typeof window === 'undefined') {
    return;
  }

  appInsights = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      disableExceptionTracking: false,
      disableTelemetry: false,
      enableCorsCorrelation: true,
      enableAjaxPerfTracking: true,
      autoTrackPageVisitTime: true,
    },
  });

  appInsights.loadAppInsights();
}

export function getAppInsights() {
  return appInsights;
}

export function trackEvent(name: string, properties?: Record<string, string>) {
  appInsights?.trackEvent({ name, properties });
}

export function trackException(error: Error) {
  appInsights?.trackException({ exception: error });
}

export function trackMetric(name: string, average: number, properties?: Record<string, string>) {
  appInsights?.trackMetric({ name, average, properties });
}

export function trackTrace(message: string, severityLevel?: number) {
  appInsights?.trackTrace({ message, severityLevel });
}

export function trackPageView(name?: string, uri?: string) {
  appInsights?.trackPageView({ name, uri });
}

export function setAuthenticatedUser(userId: string, accountId?: string) {
  appInsights?.setAuthenticatedUserContext(userId, accountId);
}

export function trackSessionStart() {
  appInsights?.trackEvent({ name: 'session_start' });
}

"use client";

import { sendGAEvent } from "@next/third-parties/google";

function isTrackingEnabled() {
  return (
    process.env.NODE_ENV === "production" &&
    !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  );
}

export function trackCvDownload(location: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "cv_download", { location });
}

export function trackGithubClick(location: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "github_click", { location });
}

export function trackLinkedinClick(location: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "linkedin_click", { location });
}

export function trackWhatsappClick(location: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "whatsapp_click", { location });
}

export function trackContactSubmit() {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "contact_form_submit");
}

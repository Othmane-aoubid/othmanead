"use client";

import type { ReactNode } from "react";
import {
  trackCvDownload,
  trackGithubClick,
  trackLinkedinClick,
  trackWhatsappClick,
} from "@/lib/analytics";

type TrackEvent = "cv_download" | "github_click" | "linkedin_click" | "whatsapp_click";

const handlers: Record<TrackEvent, (location: string) => void> = {
  cv_download: trackCvDownload,
  github_click: trackGithubClick,
  linkedin_click: trackLinkedinClick,
  whatsapp_click: trackWhatsappClick,
};

export default function TrackWrap({
  event,
  location,
  children,
}: {
  event: TrackEvent;
  location: string;
  children: ReactNode;
}) {
  return (
    <span style={{ display: "contents" }} onClickCapture={() => handlers[event](location)}>
      {children}
    </span>
  );
}

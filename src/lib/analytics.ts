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

export function trackContactSubmit(visitorType?: string) {
  if (!isTrackingEnabled()) return;
  if (visitorType) {
    sendGAEvent("event", "contact_form_submit", { visitor_type: visitorType });
    return;
  }
  sendGAEvent("event", "contact_form_submit");
}

export function trackProjectCardClick(projectId: string, projectTitle: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "project_card_click", { project_id: projectId, project_title: projectTitle });
}

export function trackProjectLinkClick(projectId: string, linkType: "github" | "kaggle" | "details") {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "project_link_click", { project_id: projectId, link_type: linkType });
}

export function trackViewAllProjects() {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "view_all_projects");
}

export function trackBlogPostViewed(postTitle: string, postCategory: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "blog_post_viewed", { post_title: postTitle, post_category: postCategory });
}

export function trackBlogPostClick(postId: string, postTitle: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "blog_post_click", { post_id: postId, post_title: postTitle });
}

export function trackQuizStarted(quizName: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "quiz_started", { quiz_name: quizName });
}

export function trackQuizCompleted(quizName: string, score: number, totalQuestions: number) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "quiz_completed", {
    quiz_name: quizName,
    score,
    total_questions: totalQuestions,
  });
}

export function trackQuizAbandoned(quizName: string, questionsAnswered: number) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "quiz_abandoned", {
    quiz_name: quizName,
    questions_answered: questionsAnswered,
  });
}

export function trackCTAClick(ctaType: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "cta_click", { cta_type: ctaType });
}

export function trackLanguageSwitch(fromLang: string, toLang: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "language_switch", { from_language: fromLang, to_language: toLang });
}

export function trackThemeSwitch(fromTheme: string, toTheme: string) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "theme_switch", { from_theme: fromTheme, to_theme: toTheme });
}

export function trackPageScroll(scrollPercentage: number) {
  if (!isTrackingEnabled()) return;
  sendGAEvent("event", "page_scroll", { scroll_percentage: scrollPercentage });
}

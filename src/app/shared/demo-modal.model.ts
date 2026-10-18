export interface DemoRequest {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
}

/** Optional settings when opening the modal */
export interface DemoModalData {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  /** Where the modal was opened from, e.g. 'header' or 'pricing-page' */
  source?: string;
}
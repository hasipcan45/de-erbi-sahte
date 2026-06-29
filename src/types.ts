/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PropertyType {
  RESIDENTIAL = "KONUT",
  PLOT = "ARSA",
  COMMERCIAL = "TICARI"
}

export enum ReportStatus {
  PENDING = "BEKLIYOR",
  IN_PROGRESS = "HAZIRLANIYOR",
  COMPLETED = "TAMAMLANDI",
  CANCELLED = "IPTAL"
}

export interface PropertyData {
  id: string;
  userId: string;
  type: PropertyType;
  address: string;
  details: Record<string, any>;
  photos: string[];
  email: string;
  createdAt: number;
  status: ReportStatus;
  pdfUrl?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: "USER" | "ADMIN";
  isSubscribed: boolean;
  subscriptionPlan?: string;
  createdAt: number;
}

export interface ValuationRequest {
  propertyType: PropertyType;
  city: string;
  district: string;
  neighborhood: string;
  details: Record<string, any>;
  email: string;
  photos: File[];
}

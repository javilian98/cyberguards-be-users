export interface Case {
  id: string;
  title: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt: string;
  assignee?: string;
  assignedDateTime?: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt?: string;
  assignee?: string;
  assignedDateTime?: string;
  threatPageUrl: string;
}

export type UserListItem = {
  firstName: string;
  lastName: string;
};
export type UserDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
};

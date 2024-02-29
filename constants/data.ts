import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  _id: object;
  childName: string;
  childAge: object;
  school?: string;
  class?: string;
  nationality?: string;
  residentialAddress?: string;
  childPhotoUrl?: string;
  parentGuardianName?: string;
  parentGuardianContact?: string;
  whatsappNumber?: string;
  placeOfWork?: string;
  relationshipWithApplicant?: string;
  parentIDUrl?: string;
  healthyStatus?: string;
  nextOfKinContact?: string;
};
export const users: User[] = [
  {
    _id: { $oid: "65c5f70727f1c4d10897167b" },
    childName: "precious deborah",
    childAge: { $numberInt: "4" },
    school: "Asifuwe international school",
    class: "grade 4",
    nationality: "American",
    residentialAddress: "new york",
    parentGuardianName: "marxon wanyama",
    parentGuardianContact: "0772606682",
    whatsappNumber: "0772606682",
    placeOfWork: "lugazi",
    relationshipWithApplicant: "father",
    healthyStatus: "no issue",
    nextOfKinContact: "nakyazze regina",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const DashItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "Home",
    label: "home",
  },
  {
    title: "Statistics",
    href: "/dashboard/statistics",
    icon: "dashstats",
    label: "statistics",
  },
  {
    title: "Tutorials",
    href: "/dashboard/user",
    icon: "tutorials",
    label: "user",
  },
];
export const FormItems: NavItem[] = [
  {
    title: "All Forms",
    href: "/dashboard/myforms",
    icon: "allforms",
    label: "forms",
  },
  {
    title: "Form Orders",
    href: "/dashboard/myforms/orders",
    icon: "orders",
    label: "form orders",
  },
];

export const EventItems: NavItem[] = [
  {
    title: "All Events",
    href: "/dashboard/events",
    icon: "allevents",
    label: "all events",
  },
  {
    title: "Create Event",
    href: "/dashboard/events/create",
    icon: "createform",
    label: "create events",
  },
];

export const TransactionItems: NavItem[] = [
  {
    title: "Withdraw History",
    href: "/dashboard/events",
    icon: "CreditCard",
    label: "all events",
  },
  {
    title: "Failed Withdraws",
    href: "/dashboard/events",
    icon: "CreditCard",
    label: "all events",
  },
  {
    title: "Refund History",
    href: "/dashboard/events",
    icon: "CreditCard",
    label: "all events",
  },
];

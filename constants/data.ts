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

  // {
  //   id: 2,
  //   name: "John Doe",
  //   company: "TechCorp",
  //   role: "Backend Developer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 3,
  //   name: "Alice Johnson",
  //   company: "WebTech",
  //   role: "UI Designer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 4,
  //   name: "David Smith",
  //   company: "Innovate Inc.",
  //   role: "Fullstack Developer",
  //   verified: false,
  //   status: "Inactive",
  // },
  // {
  //   id: 5,
  //   name: "Emma Wilson",
  //   company: "TechGuru",
  //   role: "Product Manager",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 6,
  //   name: "James Brown",
  //   company: "CodeGenius",
  //   role: "QA Engineer",
  //   verified: false,
  //   status: "Active",
  // },
  // {
  //   id: 7,
  //   name: "Laura White",
  //   company: "SoftWorks",
  //   role: "UX Designer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 8,
  //   name: "Michael Lee",
  //   company: "DevCraft",
  //   role: "DevOps Engineer",
  //   verified: false,
  //   status: "Active",
  // },
  // {
  //   id: 9,
  //   name: "Olivia Green",
  //   company: "WebSolutions",
  //   role: "Frontend Developer",
  //   verified: true,
  //   status: "Active",
  // },
  // {
  //   id: 10,
  //   name: "Robert Taylor",
  //   company: "DataTech",
  //   role: "Data Analyst",
  //   verified: false,
  //   status: "Active",
  // },
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

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];

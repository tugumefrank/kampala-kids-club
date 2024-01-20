export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
export const childFormSchemaDefaultValues = {
  childName: "",
  // childAge: 0,
  school: "",
  class: "",
  nationality: "",
  residentialAddress: "",
  childPhotoUrl: "",
  parentGuardianName: "",
  parentGuardianContact: "",
  whatsappNumber: "",
  placeOfWork: "",
  relationshipWithApplicant: "",
  parentIDUrl: "",
  healthyStatus: "",
  nextOfKinContact: "",
};

export const SERVICE_CATEGORY_GROUPS = [
  {
    icon: "home",
    title: "Home and Repairs",
    examples: "Plumbing, electrical, appliance repair",
  },
  {
    icon: "trade",
    title: "Construction and Trades",
    examples: "Carpentry, masonry, welding, painting",
  },
  {
    icon: "cleaning",
    title: "Cleaning and Maintenance",
    examples: "Home cleaning, aircon, and upkeep services",
  },
  {
    icon: "mechanical",
    title: "Automotive and Mechanical",
    examples: "Mechanics and vehicle services",
  },
  {
    icon: "creative",
    title: "Creative and Media",
    examples: "Design, photography, video, editing",
  },
  {
    icon: "events",
    title: "Events and Rentals",
    examples: "Hosts, DJs, catering, sound rentals",
  },
  {
    icon: "digital",
    title: "Digital and Technical",
    examples: "Web development and social media services",
  },
  {
    icon: "other",
    title: "Other Local Services",
    examples: "Additional skilled and service-based work",
  },
] as const;

export const SERVICE_CATEGORIES = SERVICE_CATEGORY_GROUPS.map(
  (group) => group.title
);

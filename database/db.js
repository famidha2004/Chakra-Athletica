window.CHAKRA_DB_SEED = {
  users: [
    {
      id: "usr_001",
      name: "Ananya P.",
      email: "ananya@example.com",
      phone: "+91 9876543210",
      preferredStudio: "Indiranagar",
      packBalance: "2 Credits",
      waiver: "Signed",
      referral: "REF2026",
      notes: "First-time rider, prefers morning slots."
    },
    {
      id: "usr_002",
      name: "Rohan K.",
      email: "rohan@example.com",
      phone: "+91 9001122334",
      preferredStudio: "Raipur",
      packBalance: "0 Credits",
      waiver: "Signed",
      referral: "Instagram",
      notes: "Frequent Power Hour attendee."
    }
  ],
  bookings: [
    {
      id: "bk_001",
      rider: "Ananya P.",
      email: "ananya@example.com",
      phone: "+91 9876543210",
      className: "Classic Ride",
      studio: "Indiranagar",
      slot: "Mon 7:30 AM",
      source: "App",
      status: "Confirmed"
    },
    {
      id: "bk_002",
      rider: "Rohan K.",
      email: "rohan@example.com",
      phone: "+91 9001122334",
      className: "Power Hour",
      studio: "Raipur",
      slot: "Wed 7:00 PM",
      source: "Web",
      status: "Checked In"
    }
  ],
  payments: [
    {
      id: "pay_Q7A91X2",
      payer: "Meera S.",
      email: "meera@example.com",
      pack: "3 Classes Credit Pack",
      amount: "Rs 1770",
      method: "UPI",
      status: "Captured",
      offerUsed: "RIDE30"
    },
    {
      id: "pay_Q7A91X9",
      payer: "Vikram R.",
      email: "vikram@example.com",
      pack: "Intro Pack",
      amount: "Rs 1500",
      method: "Card",
      status: "Captured",
      offerUsed: "None"
    }
  ],
  franchise: [
    {
      id: "fr_001",
      lead: "Ritika Ventures",
      city: "Hyderabad",
      phone: "+91 9811111111",
      email: "ritika@ventures.in",
      status: "Open",
      assignedAdmin: "Franchise Team",
      stage: "Discovery Call"
    }
  ],
  queries: [
    {
      id: "q_001",
      name: "Site Visitor",
      email: "visitor@example.com",
      type: "General Query",
      subject: "Trial pack details",
      message: "Need help choosing my first class.",
      status: "New"
    }
  ],
  admins: [
    {
      id: "adm_001",
      name: "Super Admin",
      email: "admin@chakraathletica.com",
      role: "Super Admin",
      studio: "All Studios",
      access: "All platform data"
    }
  ],
  reports: [
    {
      studio: "Central BLR",
      revenue: "Rs 6.4L",
      bookings: "412",
      utilisation: "88%",
      noShows: "14",
      refunds: "3",
      topClass: "Weekend Rush"
    },
    {
      studio: "Indiranagar",
      revenue: "Rs 5.9L",
      bookings: "398",
      utilisation: "84%",
      noShows: "22",
      refunds: "5",
      topClass: "Classic Ride"
    }
  ]
};

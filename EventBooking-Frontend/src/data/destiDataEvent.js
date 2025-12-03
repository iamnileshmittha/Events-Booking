// src/data/destiDataEvent.js
import bund from "../assets/bg.jpg";
import mulshi from "../assets/ml.jpg";
import sinhagad from "../assets/sf.jpg";
import vetal from "../assets/vh.jpg";
import katraj from "../assets/kzp.jpg";

const destiDataEvent = [
  {
    id: "bund-garden",
    name: "Bund Garden",
    img: bund,
    description: "Bund Garden is located 2 km from the Pune Railway Station. The gardens are situated next to Fitzgerald Bridge and take their name from the bund, or dam, on the Mula river.",
    location: "Bund Garden Road, Pune",
    hours: "6:00 AM - 10:00 PM",
    slots: [
      { time: "06:00 AM - 10:00 AM", available: 100, price: 50 },
      { time: "10:00 AM - 02:00 PM", available: 80, price: 60 },
    ],
  },
  {
    id: "mulshi-lake",
    name: "Mulshi Lake & Dam",
    img: mulshi,
    description: "A beautiful getaway near Pune with lake views and dam.A beautiful getaway near Pune with lake views and dam.A beautiful getaway near Pune with lake views and dam.",
    location: "Mulshi, Pune",
    hours: "6:00 AM - 8:00 PM",
    slots: [
      { time: "07:00 AM - 11:00 AM", available: 120, price: 70 },
      { time: "11:00 AM - 03:00 PM", available: 90, price: 80 },
    ],
  },
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    img: sinhagad,
    description: "The Sinhagad was initially known as Kondhana after the sage Kaundinya. Until 14th century, the fort was held by Nag Naik. Nag Nayak was worshipped as a symbol of strength and held power over the strategically important mountain fortress.",
    location: "Sinhagad, Pune",
    hours: "5:00 AM - 6:00 PM",
    slots: [
      { time: "05:00 AM - 09:00 AM", available: 150, price: 40 },
      { time: "09:00 AM - 01:00 PM", available: 100, price: 50 },
    ],
  },
  {
    id: "vetal-tekdi",
    name: "Vetal Hill (Vetal Tekdi)",
    img: vetal,
    description: "A popular spot for nature walks and city views.A popular spot for nature walks and city views.",
    location: "Panchavati, Pune",
    hours: "6:00 AM - 7:00 PM",
    slots: [
      { time: "06:00 AM - 10:00 AM", available: 60, price: 30 },
      { time: "04:00 PM - 07:00 PM", available: 70, price: 35 },
    ],
  },
  {
    id: "katraj-zoo",
    name: "Rajiv Gandhi Zoo",
    img: katraj,
    description: "A combination of lake view and zoo for families.A combination of lake view and zoo for families.A combination of lake view and zoo for families.A combination of lake view and zoo for families.",
    location: "Katraj, Pune",
    hours: "9:00 AM - 6:00 PM",
    slots: [
      { time: "09:00 AM - 01:00 PM", available: 200, price: 60 },
      { time: "02:00 PM - 06:00 PM", available: 150, price: 65 },
    ],
  },
];

export default destiDataEvent;

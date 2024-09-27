import { z } from "zod";

export const API_BASE_URL = "https://api.pharmwave.com/agent";

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}

export const facilitySchema = z.object({
  fname: z.string().min(1, { message: "Facility name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  lga: z.string().min(1, { message: "Local Government Area is required" }),
  type: z.string().min(1, { message: "Facility type is required" }),
  plan: z.string().min(1, { message: "Plan is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  name: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  gender: z.string().min(1, { message: "Gender is required" }),
});

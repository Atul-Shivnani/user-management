import { z } from "zod";

// Define address schema
const addressSchema = z.object({
  street: z.string().nonempty("Street is required"),
  suite: z.string().optional(),
  city: z.string().nonempty("City is required"),
  zipcode: z.string().nonempty("Zipcode is required"),
});

// Define company schema
const companySchema = z.object({
  name: z.string().nonempty("Company name is required"),
  catchPhrase: z.string().nonempty("Catch phrase is required"),
  bs: z.string().optional(),
});

// Define user schema with updated validations
export const userSchema = z.object({
  name: z.string().nonempty("Name is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z.string()
    .nonempty("Phone number is required"),
  website: z.string()
    .url("Invalid URL format") // Validates that it's a proper URL
    .optional(),
  address: addressSchema,
  company: companySchema,
});

// Create type for user schema
export type UserType = z.infer<typeof userSchema>;

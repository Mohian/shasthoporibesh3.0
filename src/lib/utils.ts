
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Format like +88 01XXXXXXXXX
  if (!phone) return '';
  
  if (phone.startsWith('+88')) {
    return `+88 ${phone.substring(3)}`;
  } else if (phone.startsWith('01')) {
    return `+88 ${phone}`;
  } else {
    return phone;
  }
}

export function validateBangladeshiPhone(phone: string): boolean {
  // Validate Bangladeshi phone number format
  const cleanPhone = phone.replace(/\s+/g, '');
  
  // Should start with +880 or 880 or 0, followed by 1, then 9 more digits
  const regex = /^(?:\+?880|0)1[0-9]{9}$/;
  
  return regex.test(cleanPhone);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

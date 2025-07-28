import { redirect } from 'next/navigation';

export default function SiONoRedirect() {
  redirect('/?readingType=yes_no');
} 
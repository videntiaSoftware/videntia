import { redirect } from 'next/navigation';

export default function CompatibilidadRedirect() {
  redirect('/?readingType=love_relationship');
} 
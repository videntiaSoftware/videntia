import { redirect } from 'next/navigation';

export default function GitanoRedirect() {
  redirect('/?readingType=three_card');
} 
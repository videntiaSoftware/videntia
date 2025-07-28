import { redirect } from 'next/navigation';

export default function TresCartasRedirect() {
  redirect('/?readingType=three_card');
} 
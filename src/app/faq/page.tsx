import FAQ from '@/components/FAQ';
import HowToBuy from '@/components/HowToBuy';

export const metadata = {
  title: 'Preguntas Frecuentes | Brazooka SPA',
  description: 'Resolvemos tus dudas sobre envíos, garantías, métodos de pago y venta mayorista. Atención directa vía Instagram DM.',
};

export default function FAQPage() {
  return (
    <main>
      <FAQ />
      <HowToBuy />
    </main>
  );
}

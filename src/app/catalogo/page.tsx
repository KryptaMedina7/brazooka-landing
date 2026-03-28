import ProductShowcase from '@/components/ProductShowcase';

export const metadata = {
  title: 'Catálogo Premium | Brazooka SPA',
  description: 'Explora nuestra selección de vaporizadores, accesorios y la colección exclusiva de Backwoods. Stock garantizado y envíos a todo Chile.',
};

export default function CatalogoPage() {
  return (
    <main>
      <ProductShowcase />
    </main>
  );
}

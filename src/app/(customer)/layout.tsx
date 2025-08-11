import Header from '@/app/(customer)/_components/header';
import Footer from '@/app/(customer)/_components/footer';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

import Header from '@/app/(customer)/_components/header';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background">
      <Header />
      <main>{children}</main>
    </div>
  )
}

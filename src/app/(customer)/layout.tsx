import { getServerSession } from "@/utils/supabase/auth";
import { AuthProvider } from "@/providers/auth-provider";
import Header from '@/app/(customer)/_components/header/header';
import Footer from '@/app/(customer)/_components/footer';
import { Toaster } from 'sonner';
import SectionContainer from './_components/sectionContainer';

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 在伺服器端獲取用戶資訊
  const { user } = await getServerSession();

  return (
    <AuthProvider user={user}>
      <div className="flex flex-col min-h-screen bg-background">
        <Toaster />
        <Header />
        <main className="flex-grow">
          <SectionContainer>
            {children}
          </SectionContainer>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

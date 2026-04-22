import { CreatorSidebar } from "@/components/creator/sidebar"

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <CreatorSidebar />
      <main className="flex-1 lg:pl-0">
        {children}
      </main>
    </div>
  )
}

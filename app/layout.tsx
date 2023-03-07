import Header from '@/components/Header'
import './globals.css'

export const metadata = {
  title: '이호진의 기술블로그',
  description: '개발 내용을 정리한 블로그입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko'>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

import { ReactNode } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { Toaster } from '@/components/ui/toaster'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div className='flex flex-col min-h-screen'>
        <header className='sticky top-0 bg-background px-6'>
          <Navbar />
        </header>
        <main className='flex-grow overflow-auto px-6'>{children}</main>
        <Toaster />
        <Footer />
      </div>
    </div>
  )
}

export default Layout

//child elemetns might be too big. it is a flex box so if i limit the size of parent, it will limit the size of children.

// need to update div of entire container with classes "class="flex flex-col md:flex-row h-screen space-x-0 md:space-x-4 space-y-4 md:space-y-0""

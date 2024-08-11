import { ModeToggle } from '@/features/theme/ModeToggle'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/context/AuthProvider'
import { LoginBtn } from '@/features/auth/login'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useProfile } from '@/context/ProfileProvider'
import FourPointedStar from '../../assets/four-pointed-star.png'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { LineChart, User, LogOut } from 'lucide-react'
import defaultImg from '@/assets/7915522.png'

const Navbar = () => {
  const { state } = useAuth()
  const { profile } = useProfile()
  const logout = useLogout()

  return (
    <nav>
      <div className='flex justify-between items-center py-1.5 mt-3 mb-2.5 relative'>
        <Link to='/'>
          <h1 className='font-semibold text-lg'>Interview Advanced</h1>
        </Link>
        <div className='flex items-center space-x-4'>
          {state.auth && (
            <span className='mr-2'>
              <Link
                to={`/dashboard`}
                className={`${buttonVariants({
                  variant: 'tertiary',
                })} flex items-center`}
              >
                <img
                  src={FourPointedStar}
                  alt='Star'
                  className='flex-shrink-0 h-5 w-5'
                />
                <span className='hidden sm:inline ml-2'>
                  View your Interview Metrics & Insights
                  {/* View your Interview Charts & Analytics */}
                </span>
              </Link>
            </span>
          )}

          {!state.auth ? (
            <LoginBtn />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={profile?.picture || defaultImg}
                  alt='Profile'
                  className='rounded-full h-8 w-8 object-cover cursor-pointer'
                  referrerPolicy='no-referrer'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                style={{ marginTop: '10px', padding: '5px' }}
              >
                <DropdownMenuItem>
                  <Link
                    to='/dashboard'
                    className='text-sm'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                    }}
                  >
                    <LineChart size={16} style={{ marginRight: '15px' }} />{' '}
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to='/account'
                    className='text-sm'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                    }}
                  >
                    <User size={16} style={{ marginRight: '15px' }} /> Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to='/'
                    onClick={logout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                    }}
                    className='text-sm'
                  >
                    <LogOut size={16} style={{ marginRight: '15px' }} />
                    Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

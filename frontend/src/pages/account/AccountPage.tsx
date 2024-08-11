import { useProfile } from '@/context/ProfileProvider'
import Layout from '@/layout/Layout'
import Container from '@/layout/container/Container'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/useLogout'

const AccountPage = () => {
  const { profile } = useProfile()
  const logout = useLogout()

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-4 py-4'>
        <div>
          <h1 className='text-5xl font-semibold leading-tight mt-4'>
            <span className=''>Account</span>
          </h1>
          <h2 className='text-3xl leading-tight mb-4'>
            <span className='font-thin'>
              View your account details.
            </span>
          </h2>
          <h2 className='text-3xl leading-tight mt-12 mb-4'>
            <span className='font-semibold'>Profile</span>
          </h2>
          <p className='mb-4 font-thin'>
            You are logged in as{' '}
            <span className='font-bold'>{profile?.email}</span>.
          </p>

          <Button className='my-8' onClick={logout}>
            Sign out
          </Button>

        </div>
      </Container>
    </Layout>
  )
}
export default AccountPage

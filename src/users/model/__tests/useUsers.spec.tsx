import * as React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useUsers } from '../useUser'
import { FC, PropsWithChildren } from 'react'

const mockUsers = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' }
]

jest.mock('../../resource/usersResource', () => ({
  usersResource: {
    loadAll: jest.fn(() => Promise.resolve(mockUsers))
  }
}))

describe('useUsers', () => {
  let queryClient: QueryClient

  const createWrapper = () => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    return Wrapper
  }

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should list users using useQuery', async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.listUsers()
    })

    await waitFor(() => expect(result.current.listUsers().isSuccess).toBe(true))

    expect(result.current.listUsers().data).toEqual(mockUsers)
  })

  it('should set selectedUserId using setSelectedUserId', () => {
    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.selectedUserId.current = '123'
    })

    expect(result.current.selectedUserId).toBe('123')
  })
})

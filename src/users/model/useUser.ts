import { useQuery } from '@tanstack/react-query'
import { usersResource } from '../resource/usersResource'
import { SimpleUser, User } from './user'
import { Option } from '../../common/components/autocomplete/AutocompleteSelector'

export const useUsers = () => {
  const useLoadById = (selectedUserId: string) => {
    return useQuery(['user', selectedUserId], () =>
      usersResource.load(selectedUserId)
    )
  }

  const useLoadAll = () => {
    return useQuery(['users'], () => usersResource.loadAll())
  }

  const usersAsOptions = (users: SimpleUser[]) => {
    return users
      ?.map((user: SimpleUser) => ({
        label: user.firstName as keyof SimpleUser,
        value: user.id as keyof SimpleUser,
        data: user,
      }))
      .sort((option1: Option<SimpleUser>, option2: Option<SimpleUser>) => {
        return option1.label.localeCompare(option2.label)
      })
  }

  const filterUsers = (users: User[], searchTerm?: string): User[] => {
    if (searchTerm === undefined) return users
    return users?.filter((user) => {
      return user?.firstName?.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }

  return {
    useLoadAll,
    useLoadById,
    usersAsOptions,
    filterUsers,
  }
}

import * as React from 'react'
import { FC, memo } from 'react'

import { Overlay } from '../../common/components/modal'
import { UsersModalContent } from './UsersModalContent'
import { useUsers } from '../model/useUser'

type Props = {
  selectedUserId: string
}

const UsersModal: FC<Props> = ({ selectedUserId }) => {
  const { useLoadById } = useUsers()
  const { data: user, status } = useLoadById(selectedUserId)
  return (
    <Overlay>
      <UsersModalContent fetchStatus={status} user={user} />
    </Overlay>
  )
}

export default memo(UsersModal)

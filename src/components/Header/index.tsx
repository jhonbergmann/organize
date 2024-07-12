import * as Dialog from '@radix-ui/react-dialog'

import {NewTransactionModal} from '@/components/NewTransactionModal'
import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'
import logoImg from '@/assets/logo.png'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} width={130} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

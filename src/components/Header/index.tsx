import {useContextSelector} from 'use-context-selector'

import {NewTransactionModal} from '@/components/NewTransactionModal'
import {TransactionsContext} from '@/contexts/TransactionsContext'
import {HeaderContainer, HeaderContent, NewTransactionButton} from './styles'
import logoImg from '@/assets/logo.png'

export function Header() {
  const changeModalView = useContextSelector(TransactionsContext, (context) => {
    return context.changeModalView
  })

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} width={130} alt="" />
        <NewTransactionButton onClick={changeModalView}>Nova transação</NewTransactionButton>
        <NewTransactionModal />
      </HeaderContent>
    </HeaderContainer>
  )
}

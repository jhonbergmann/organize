import {ArrowCircleDown, ArrowCircleUp, X} from 'phosphor-react'
import {zodResolver} from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import {Controller, useForm} from 'react-hook-form'
import {useContextSelector} from 'use-context-selector'

import {TransactionsContext} from '@/contexts/TransactionsContext'
import {CloseButton, Content, Overlay, TransactionType, TransactionTypeButton} from './styles'
import {INewTransactionFormInputs, newTransactionFormSchema} from './data'

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  })

  const modalOpen = useContextSelector(TransactionsContext, (context) => {
    return context.modalOpen
  })

  const changeModalView = useContextSelector(TransactionsContext, (context) => {
    return context.changeModalView
  })

  const {
    control,
    register,
    handleSubmit,
    formState: {isSubmitting},
    reset,
  } = useForm<INewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: INewTransactionFormInputs) {
    const {description, price, category, type} = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })

    changeModalView()
    reset()
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={changeModalView}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>
          <Dialog.Description />
          <CloseButton>
            <X size={24} />
          </CloseButton>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input type="text" placeholder="Descrição" required {...register('description')} />
            <input type="number" placeholder="Preço" required {...register('price', {valueAsNumber: true})} />
            <input type="text" placeholder="Categoria" required {...register('category')} />
            <Controller
              control={control}
              name="type"
              render={({field}) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

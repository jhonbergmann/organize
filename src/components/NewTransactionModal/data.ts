import * as z from 'zod'

export const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

export type INewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export interface ITransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

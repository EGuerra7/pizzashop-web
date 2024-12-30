import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenueAmount } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthReveneuAmount } = useQuery({
    queryFn: getMonthRevenueAmount,
    queryKey: ['metrics', 'month-reveneu'],
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthReveneuAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthReveneuAmount.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthReveneuAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emarald-500 dark:text-emerald-400">
                    +{monthReveneuAmount.diffFromLastMonth}%
                  </span>{' '}
                  relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthReveneuAmount.diffFromLastMonth}%
                  </span>{' '}
                  relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}

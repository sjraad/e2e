import { DragHandle } from "@mui/icons-material"
import { Button, Card } from "@mui/material"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { FC } from "react"
import { InsightAnalysis, MonthlyTransaction } from "../../services"

interface Props {
  data: InsightAnalysis | undefined
  className?: string
}

export const Transations: FC<Props> = (props) => {
  const { data, className } = props

  const columns: GridColDef<MonthlyTransaction & { id: number }>[] = [
    { flex: 1, field: "id", headerName: "ID" },
    { flex: 1, field: "transactionId", headerName: "transactionId" },
    {
      flex: 1,
      field: "createDate",
      headerName: "Date",
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    { flex: 1, field: "amount", headerName: "Amount" },
    { flex: 1, field: "dispensableAmount", headerName: "dispensableAmount" },
    { flex: 1, field: "notes", headerName: "Notes" },
    { flex: 1, field: "description", headerName: "Description" },
  ]

  const rows = [
    ...(data?.categorization.incomeMonthlyGroupTransactions ?? []),
    ...(data?.categorization.expenseMonthlyGroupTransactions ?? []),
  ]
    .flatMap((transation) => transation.monthlyTransactions)
    .map((transation, index) => ({ ...transation, id: index }))

  return (
    <div className={className}>
      <Card>
        <div className="flex flex-wrap justify-between items-center mb-5">
          <h3 className="h5 card-title m-0">Analysis Current Year</h3>
          <Button className="dragHandle">
            <DragHandle />
          </Button>
        </div>

        <DataGrid<MonthlyTransaction & { id: number }>
          className="h-full"
          rows={rows}
          getRowId={(row) => row.transactionId ?? row.id}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          autoHeight
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            pagination: { pageSize: 5 },
            sorting: {
              sortModel: [
                {
                  field: "createDate",
                  sort: "desc",
                },
              ],
            },
          }}
        />
      </Card>
    </div>
  )
}
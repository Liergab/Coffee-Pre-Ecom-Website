import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteCoffeeProduct, useGetAllCoffee } from "@/services/api/product"
import { productType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import EditCoffee from "@/components/Form/EditCoffee"



// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<productType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div>Description</div>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      const truncated = description.length > 50 ? description.substring(0, 50) + "..." : description;
      return <div>{truncated}</div>;
    },
  },
  {
    accessorKey: "tags",
    header: () => <div>Tags</div>,
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div>
          {tags.map((tag) => (
            <span key={tag} className="mr-1 px-2 py-1 bg-gray-200 dark:bg-slate-900 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: () => <div>Image</div>,
    cell: ({ row }) => {

      const imageUrlValue = row.getValue("imageUrl");
  
      const imageUrlString = typeof imageUrlValue === "string" ? imageUrlValue : "";

      let imageUrlArray: string[] = [];
      if (imageUrlString) {
        try {
          imageUrlArray = JSON.parse(imageUrlString);
        } catch (error) {
          console.error("Error parsing imageUrl:", error);
        }
      }
      const imageUrl = imageUrlArray.length > 0 ? imageUrlArray[0] : "";

      return imageUrl ? (
        <img src={imageUrl} alt="Product" className="h-10 w-10 object-cover" />
      ) : (
        "No image"
      );
    },
  },
  
  
  {
    accessorKey: "_id",
    header: () => <div>ProductID</div>,
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = React.useState<boolean>(false)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [Id, setId] = React.useState<string>()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteCoffeeProduct = useMutation({
        mutationFn:useDeleteCoffeeProduct,
        onSuccess:() => {
          queryClient.invalidateQueries({queryKey:['getAllCoffee']})
        }
      })
      const handleDelete = (coffeeId:string) => {
        toast.promise(
          deleteCoffeeProduct.mutateAsync(coffeeId),
           {
             loading: 'Deleting...',
             success: <b>Coffee Product Deleted</b>,
             error: <b>Could not Delete.</b>,
           }
         );
       
      }

      const handleViewCoffee = (coffeeId:string) => {
        setIsOpen(true)
        setId(coffeeId)
      }

      const handleCloseDialog = () => {
        setIsOpen(false);
      };

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product._id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewCoffee(product._id)}>View Product Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(product._id)}>Delete Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       <EditCoffee isOpen={isOpen} Id={Id!} onClose={handleCloseDialog} />
        </>
      );
    },
  },
];


export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const {data} = useGetAllCoffee()
 


  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';
import { Input, Button } from '@/components/ui';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface TableProps<T> {
  data: T[];
  columns?: ColumnDef<T>[];
  searchableFields?: string[];
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T>({
  data,
  columns,
  searchableFields = [],
  pageSize = 10,
  className = '',
  onRowClick,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns: columns || [],
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, value) => {
      if (!searchableFields.length) return true;
      
      const searchValue = value.toLowerCase();
      return searchableFields.some(field => {
        const cellValue = (row.original as Record<string, unknown>)[field];
        return cellValue?.toString().toLowerCase().includes(searchValue);
      });
    },
  });


  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      {searchableFields.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Search</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                type="text"
                placeholder={`Search by ${searchableFields.join(', ')}...`}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                        header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="ml-auto">
                            {header.column.getIsSorted() === 'asc' && (
                              <ChevronUp className="w-4 h-4 text-gray-600" />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                            {header.column.getIsSorted() === false && (
                              <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  } ${onRowClick ? 'cursor-pointer hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                  const pageIndex = i;
                  return (
                    <Button
                      key={pageIndex}
                      variant={table.getState().pagination.pageIndex === pageIndex ? "default" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(pageIndex)}
                      className="w-8 h-8 p-0"
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                })}
              </div>
              
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
      )}
    </div>
  );
}

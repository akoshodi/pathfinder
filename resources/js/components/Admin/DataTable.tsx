import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: T) => React.ReactNode;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface Props<T> {
    data: PaginationData<T> | T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
    emptyMessage?: string;
    loading?: boolean;
    selectable?: boolean;
    onSelectionChange?: (selected: T[]) => void;
    bulkActions?: (selected: T[]) => React.ReactNode;
    responsiveMode?: 'table' | 'cards' | 'auto'; // 'auto' switches on mobile
}

export default function DataTable<T extends { id: number | string }>({
    data,
    columns,
    onEdit,
    onDelete,
    onView,
    actions,
    emptyMessage = 'No data available',
    loading = false,
    selectable = false,
    onSelectionChange,
    bulkActions,
    responsiveMode = 'auto',
}: Props<T>) {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selected, setSelected] = useState<Set<number | string>>(new Set());
    const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth < 768);

    const isPaginated = (data: any): data is PaginationData<T> => {
        return 'data' in data && 'current_page' in data;
    };

    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = isPaginated(data) ? data.data : data;
    const showActions = onEdit || onDelete || onView || actions;
    const useCardView = responsiveMode === 'cards' || (responsiveMode === 'auto' && isMobile);

    const toggleAll = () => {
        if (!selectable) return;
        if (selected.size === items.length) {
            setSelected(new Set());
            onSelectionChange?.([]);
        } else {
            const all = new Set(items.map((i: any) => i.id));
            setSelected(all);
            onSelectionChange?.(items as T[]);
        }
    };

    const toggleOne = (id: number | string, item: T) => {
        if (!selectable) return;
        const next = new Set(selected);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setSelected(next);
        const selectedItems = items.filter((i: any) => next.has(i.id));
        onSelectionChange?.(selectedItems as T[]);
    };

    const handleSort = (column: Column<T>) => {
        if (!column.sortable) return;

        const key = column.key as string;
        if (sortColumn === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(key);
            setSortDirection('asc');
        }
    };

    const getValue = (item: T, key: keyof T | string): any => {
        if (typeof key === 'string' && key.includes('.')) {
            const keys = key.split('.');
            let value: any = item;
            for (const k of keys) {
                value = value?.[k];
            }
            return value;
        }
        return item[key as keyof T];
    };

    // Mobile card view
    if (useCardView && items.length > 0) {
        return (
            <div className="space-y-4" data-testid="datatable-cards">
                {loading && (
                    <div className="flex items-center justify-center">
                        <svg className="h-6 w-6 animate-spin text-indigo-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    </div>
                )}
                {items.map((item) => (
                    <div key={item.id} className="rounded-lg bg-card border border-border p-4 shadow-sm">
                        <div className="space-y-3">
                            {columns.map((column) => (
                                <div key={column.key as string} className="flex justify-between items-start">
                                    <span className="font-medium text-muted-foreground text-sm">{column.label}:</span>
                                    <span className="text-foreground text-sm text-right">
                                        {column.render ? column.render(getValue(item, column.key), item) : getValue(item, column.key)}
                                    </span>
                                </div>
                            ))}
                            {showActions && (
                                <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
                                    {actions && actions(item)}
                                    {onView && (
                                        <button
                                            onClick={() => onView(item)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            title="View"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            title="Edit"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            title="Delete"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Table view (desktop and empty state)
    return (
    <div className="overflow-hidden rounded-lg bg-card border border-border shadow">
            {bulkActions && selectable && (
                <div className="flex items-center justify-between border-b border-muted bg-muted px-4 py-2 text-sm">
                    <div>
                        {selected.size} selected
                    </div>
                    <div className="flex items-center gap-2">
                        {bulkActions(items.filter((i: any) => selected.has(i.id)) as T[])}
                    </div>
                </div>
            )}
            <div className="relative w-full overflow-x-auto">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60">
                        <svg className="h-6 w-6 animate-spin text-indigo-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    </div>
                )}
                <table className="w-full table-auto divide-y divide-border" data-testid="datatable-table">
                    <thead className="bg-muted">
                        <tr>
                            {selectable && (
                                <th className="w-12 px-3 py-3 sm:px-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.size === items.length && items.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    className={`px-3 py-3 sm:px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground ${
                                        column.sortable ? 'cursor-pointer select-none hover:text-foreground' : ''
                                    }`}
                                    onClick={() => column.sortable && handleSort(column)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <svg
                                                className={`h-4 w-4 ${sortColumn === (column.key as string) ? 'text-blue-600' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {sortColumn === (column.key as string) && sortDirection === 'asc' ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                )}
                                            </svg>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {showActions && (
                                <th className="px-3 py-3 sm:px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (showActions ? 1 : 0) + (selectable ? 1 : 0)} className="px-3 py-12 sm:px-4 text-center">
                                    <div className="text-muted-foreground">
                                        <svg
                                            className="mx-auto h-12 w-12 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            />
                                        </svg>
                                        <p className="mt-2">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                                    {selectable && (
                                        <td className="w-12 px-3 py-4 sm:px-4">
                                            <input
                                                type="checkbox"
                                                checked={selected.has(item.id)}
                                                onChange={() => toggleOne(item.id, item)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={column.key as string} className="px-3 py-4 sm:px-4 text-sm text-foreground">
                                            <div className="line-clamp-2">
                                                {column.render ? column.render(getValue(item, column.key), item) : getValue(item, column.key)}
                                            </div>
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className="px-3 py-4 sm:px-4 text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                {actions && actions(item)}
                                                {onView && (
                                                    <button
                                                        onClick={() => onView(item)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        title="View"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(item)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="Edit"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(item)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Delete"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {isPaginated(data) && data.last_page > 1 && (
                <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Link
                            href={data.links[0].url || '#'}
                            className="relative inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                            Previous
                        </Link>
                        <Link
                            href={data.links[data.links.length - 1].url || '#'}
                            className="relative ml-3 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                            Next
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="font-medium">{data.from}</span> to <span className="font-medium">{data.to}</span> of{' '}
                                <span className="font-medium">{data.total}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                {data.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                            link.active
                                                ? 'z-10 bg-blue-600 text-white'
                                                : 'bg-card text-foreground hover:bg-muted'
                                        } ${index === 0 ? 'rounded-l-md' : ''} ${index === data.links.length - 1 ? 'rounded-r-md' : ''} border border-border`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

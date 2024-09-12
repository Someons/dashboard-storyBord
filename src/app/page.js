'use client';
import * as React from "react"
import Image from "next/image";
import styles from "./dashboard.scss";
import Head from "next/head";
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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

const darkMode = () => {
  var thElement = document.querySelectorAll('th:not(:first-child)');
  var tdElement = document.querySelectorAll('td:not(:first-child)');
  if (document.getElementsByTagName("html")[0].classList.value == "") {
    document.getElementsByTagName("html")[0].classList.add("dark");
    document.getElementsByClassName("add-btn")[0].classList.add("addButtonNewcss");
    document.getElementsByClassName("chatBoxButton")[0].classList.add("addButtonNewcss");
    document.querySelectorAll('input')[1].classList.add("addButtonNewcss");
    document.querySelectorAll('button')[20].classList.add("addButtonNewcss");

    for (var i = 0; i < thElement.length; i++) {
      thElement[i].classList.add("addButtonNewcss");
    }
    for (var i = 0; i < tdElement.length; i++) {
      tdElement[i].classList.add("addButtonNewcss");
    }
  }
  else {
    document.getElementsByTagName("html")[0].classList.remove("dark");
    document.getElementsByClassName("add-btn")[0].classList.remove("addButtonNewcss");
    document.getElementsByClassName("chatBoxButton")[0].classList.remove("addButtonNewcss");
    document.querySelectorAll('input')[1].classList.remove("addButtonNewcss");
    document.querySelectorAll('button')[20].classList.remove("addButtonNewcss");

    for (var i = 0; i < thElement.length; i++) {
      thElement[i].classList.remove("addButtonNewcss");
    }
    for (var i = 0; i < tdElement.length; i++) {
      tdElement[i].classList.remove("addButtonNewcss");
    }
  }
};

const listView = () => {
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');


  gridView.classList.remove('active');
  listView.classList.add('active');
  projectsList.classList.remove('jsGridView');
  projectsList.classList.add('jsListView');
};

const tableView = () => {
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');

  gridView.classList.add('active');
  listView.classList.remove('active');
  projectsList.classList.remove('jsListView');
  projectsList.classList.add('jsGridView');
};

const checkBoxArea = () => {
  if (document.querySelector('.messages-section').className.split(" ").includes("hide")) {
    document.querySelector('.messages-section').classList.remove('hide');
    document.getElementsByClassName("view-actions")[0].classList.add('hide');
    listView();
  }
  else {
    document.querySelector('.messages-section').classList.add('hide');
    document.getElementsByClassName("view-actions")[0].classList.remove('hide');
  }
};

const components = [
  {
    title: "Web Designing",
    date: "December 10, 2020",
    progressStatus: "60",
    days: "10 Days Left"
  },
  {
    title: "Backed Data",
    date: "December 10, 2020",
    progressStatus: "80",
    days: "10 Days Left"
  },
  {
    title: "Testing",
    date: "December 12, 2020",
    progressStatus: "20",
    days: "20 Days Left"
  },
  {
    title: "Svg Animations",
    date: "December 14, 2020",
    progressStatus: "40",
    days: "10 Days Left"
  },
  {
    title: "UI Development",
    date: "December 16, 2020",
    progressStatus: "90",
    days: "15 Days Left"
  },
  {
    title: "Data Analysis",
    date: "December 18, 2020",
    progressStatus: "50",
    days: "5 Days Left"
  },

];

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]
export const columns = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


const graphView = () => {
  console.log("fgfhj");
};

const tableFunction = () => {
  document.getElementsByClassName("app-sidebar-link")[0].classList.remove("active");
  document.getElementsByClassName("app-sidebar-link")[2].classList.add("active")
  document.getElementsByClassName("table-section")[0].classList.remove("hide");
  document.getElementsByClassName("project-section")[0].classList.add("hide");
};

const homeFunction = () => {
  document.getElementsByClassName("app-sidebar-link")[2].classList.remove("active");
  document.getElementsByClassName("app-sidebar-link")[0].classList.add("active");
  document.getElementsByClassName("table-section")[0].classList.add("hide");
  document.getElementsByClassName("project-section")[0].classList.remove("hide");
};

export default function login() {

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
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
  })
  useEffect(() => {
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classNameList.add('show');
    });

    document.querySelector('.messages-close').addEventListener('click', function () {
      document.querySelector('.messages-section').classNameList.remove('show');
    });
  });
  const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date();
  let monthName = mlist[date.getMonth()];
  let todaysDate = monthName + ", " + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  return (
    <>
      <div className="app-container">
        <div className="app-header">
          <div className="app-header-left">
            <span className="app-icon"></span>
            <p className="app-name">Portfolio</p>
            <div className="search-wrapper">
              <input className="search-input" type="text" placeholder="Search" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-search" viewBox="0 0 24 24">
                <defs></defs>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>
          </div>
          <div className="app-header-right">
            <button className="chatBoxButton" title="Chat" onClick={checkBoxArea}>
              <i className="fas fa-message"></i>
            </button>
            <button className="mode-switch" title="Switch Theme" onClick={darkMode}>
              <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <button className="add-btn" title="Add New Project">
              <svg className="btn-icon feather feather-plus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button className="notification-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button className="profile-btn">
              <img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=900&q=60" />
              <span>Raj Gupta</span>
            </button>
          </div>
          <button className="messages-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
        <div className="app-content">
          <div className="app-sidebar">
            <a className="app-sidebar-link active" onClick={homeFunction}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
            <a href="" className="app-sidebar-link hide" onClick={graphView}>
              <svg className="link-icon feather feather-pie-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs />
                <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
              </svg>
            </a>
            <a className="app-sidebar-link" onClick={tableFunction}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </a>
            <a href="" className="app-sidebar-link hide">
              <svg className="link-icon feather feather-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs />
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </a>
          </div>
          <div className="projects-section project-section">
            <div className="projects-section-header">
              <p>Projects</p>
              <p className="time">{todaysDate}</p>
            </div>
            <div className="projects-section-line">
              <div className="projects-status">
                <div className="item-status">
                  <span className="status-number">45</span>
                  <span className="status-type">In Progress</span>
                </div>
                <div className="item-status">
                  <span className="status-number">24</span>
                  <span className="status-type">Upcoming</span>
                </div>
                <div className="item-status">
                  <span className="status-number">10</span>
                  <span className="status-type">Complaint</span>
                </div>
                <div className="item-status">
                  <span className="status-number">72</span>
                  <span className="status-type">Total Projects</span>
                </div>
              </div>
              <div className="view-actions">
                <button className="view-btn list-view" title="List View" onClick={listView}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button className="view-btn grid-view active" title="Grid View" onClick={tableView}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="project-boxes jsGridView">
              {components.map((component) => (

                <ListItem
                  name={component.title}
                  date={component.date}
                  progressStatus={component.progressStatus}
                  days={component.days}
                >
                  {component.description}
                </ListItem>
              ))}
            </div>
          </div>
          <div className="projects-section hide table-section">
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter emails..."
                  value={(table.getColumn("email")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
          </div>
          <div className="messages-section hide" >
            <button className="messages-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
            <div className="projects-section-header">
              <p>Client Messages</p>
            </div>
            <div className="messages">
              <div className="message-box">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=2550&q=80" alt="profile image" />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Stephanie</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-1" />
                      <label htmlFor="star-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    I got your first assignment. It was quite good. 🥳 We can continue with the next
                    assignment.
                  </p>
                  <p className="message-line time">
                    Dec, 12
                  </p>
                </div>
              </div>
              <div className="message-box">
                <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=2550&q=80" alt="profile image" />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Mark</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-2" />
                      <label htmlFor="star-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    Hey, can tell me about progress of project? I'm waiting htmlFor your response.
                  </p>
                  <p className="message-line time">
                    Dec, 12
                  </p>
                </div>
              </div>
              <div className="message-box">
                <img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=900&q=60" alt="profile image" />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">David</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-3" />
                      <label htmlFor="star-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    Awesome! 🤩 I like it. We can schedule a meeting htmlFor the next one.
                  </p>
                  <p className="message-line time">
                    Dec, 12
                  </p>
                </div>
              </div>
              <div className="message-box">
                <img src="https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=900&q=60" alt="profile image" />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Jessica</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-4" />
                      <label htmlFor="star-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    I am really impressed! Can't wait to see the final result.
                  </p>
                  <p className="message-line time">
                    Dec, 11
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

const ListItem = React.forwardRef(({ name, date, progressStatus, days }, ref) => {
  return (
    <div className="project-box-wrapper" >
      <div className="project-box style1">
        <div className="project-box-header">
          <span>{date}</span>
          <div className="more-wrapper">
            <button className="project-btn-more">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{name}</p>
          <p className="box-content-subheader">Prototyping</p>
        </div>
        <div className="box-progress-wrapper">
          <p className="box-progress-header">Progress</p>
          <div className="box-progress-bar">
            <span className="box-progress style2" style={{ width: `${progressStatus}% !important` }}></span>
          </div>
          <p className="box-progress-percentage">{progressStatus}%</p>
        </div>
        <div className="project-box-footer">
          <div className="participants">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=2550&q=80" alt="participant" />
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=900&q=60" alt="participant" />
            <button className="add-participant style3" >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="days-left style4">
            {days}
          </div>
        </div>
      </div>
    </div >
  )
});

ListItem.displayName = "ListItem"
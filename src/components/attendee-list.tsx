import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableBody } from "./table/table-body";
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";
import { ptBR } from "date-fns/locale";
import { formatDistance } from "date-fns/formatDistance";

export function AttendeeList() {

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
      setPage(page - 1)
  }
  function goToLastPage() {
    setPage(totalPages)
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold"> Participantes </h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input onChange={onSearchInputChanged}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participante..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>
              <input
                className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400"
                type="checkbox"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <tr key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                <TableBody style={{ width: 48 }}>
                  <input
                    className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400"
                    type="checkbox"
                  />
                </TableBody>
                <TableBody> {attendee.id} </TableBody>
                <TableBody>
                  <div className="flex flex-col gap-1">
                    <span>{attendee.name} </span>
                    <span>{attendee.email} </span>
                  </div>
                </TableBody>
                <TableBody>{formatDistance(attendee.createdAt, new Date(), { addSuffix: true, locale: ptBR })}</TableBody>
                <TableBody>{formatDistance(attendee.checkedInAt, new Date(), { addSuffix: true, locale: ptBR  })}</TableBody>
                <TableBody style={{ width: 64 }}>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableBody>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableBody colSpan={3}>
              Mostrando {page * 10} de {attendees.length} itens
            </TableBody>
            <TableBody className="text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8 ">
                <span>Página {page} de {totalPages} </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1} >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableBody>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

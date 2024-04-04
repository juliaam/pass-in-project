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
import { ChangeEvent, useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { formatDistance } from "date-fns/formatDistance";

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if(url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    } 

    return 1
  })
  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendee[]>([])

  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    const url = new URL("http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees")

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 1) {
      url.searchParams.set("query", search);
    }

    fetch(url)
    .then((response) => response.json())
    .then(
      (data) => {
        setAttendees(data.attendees)
        setTotal(data.total)
      }
      )
  }, [page, search]) 
  // como se fosse um watch, ele vai executar a function toda 
  // vez que tiver alguma alteração de alguma variável definida dentro do array

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('search', search)

    window.history.pushState({}, "", url)

    setSearch(search)
  }
  
  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, "", url)

    setPage(page)
  }

  function formatDate(date: string | Date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true, locale: ptBR  })
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }
  function goToLastPage() {
    setCurrentPage(totalPages)
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold"> Participantes </h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3 ">
          <Search className="size-4 text-emerald-300" />
          <input onChange={onSearchInputChanged}
            value={search}
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
          {attendees.map((attendee: Attendee) => {
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
                <TableBody>{formatDate(attendee.createdAt)}</TableBody>
                <TableBody>{!attendee.checkedInAt ? 
                <span className="text-zinc-400"> Não fez check-in </span>
                : formatDate(attendee.checkedInAt)}</TableBody>
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
              Mostrando {attendees.length} de {total} itens
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

import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createStudents } from "~/domain/student/create-student"
import { Student } from "~/domain/student/student"
import { StudentPrimitive } from "~/domain/student/types"
import { studentRepository } from "../infra/repo"

type Status = "idle" | "loading" | "error" | "success"

type UseStudentsReturn = {
  students: StudentPrimitive[]
  status: Status
  error: string | null
  reload: () => Promise<void>
  query: string
  setQuery: (query: string) => void
  studentsAmount: number
}

export const useStudents = (): UseStudentsReturn => {
  const [students, setStudents] = useState<Student[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const fetchStudents = useCallback(async () => {
    setStatus("loading")
    setError(null)
    try {
      const fetchedStudents = await studentRepository.findAll()
      const { valid } = createStudents(fetchedStudents ?? [])
      setStudents(valid)
      setStatus("success")
    } catch (err) {
      console.error("Error fetching students:", err)
      setError("Failed to fetch students")
      setStatus("error")
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])


  useFocusEffect(
    useCallback(() => {
      fetchStudents();
      return () => {
        setStudents([]);
        setStatus("idle");
        setError(null);
        setQuery("");
      }
    }, [])
  )


  const filteredStudents = useMemo(() => {
    if (!query.trim()) return students
    const lower = query.toLowerCase()
    return students.filter((s) => s.name.value.toLowerCase().includes(lower))
  }, [students, query])




  const studentsPrimitive = useMemo(() => {
    return filteredStudents.map(c => c.toPrimitive());
  }, [filteredStudents]);


  return {
    students: studentsPrimitive,
    status,
    error,
    reload: fetchStudents,
    query,
    setQuery,
    studentsAmount: filteredStudents.length,
  }
}

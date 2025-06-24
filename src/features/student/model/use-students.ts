import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createStudents } from "~/domain/student/create-student"
import { Student } from "~/domain/student/student"
import { studentRepository } from "../infra/repo"

type Status = "idle" | "loading" | "error" | "success"

export const useStudents = () => {
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

  return {
    students: filteredStudents,
    status,
    error,
    reload: fetchStudents,
    query,
    setQuery,
    studentsAmount: filteredStudents.length,
  }
}

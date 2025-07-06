import { DeleteButton } from "~/shared/ui/delete-button"

export function DeleteStudentButton({ onDelete }: { onDelete: () => void }) {


  return (<DeleteButton onDelete={onDelete} />
  )
}

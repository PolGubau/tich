import { DeleteButton } from "~/shared/ui/delete-button"

export function DeleteStudentButton({ onDelete }: { onDelete: () => void }) {


  return (<DeleteButton onDelete={onDelete} deleteText="Eliminar"
    alertMessages={{
      title: "Confirmar eliminación",
      message: "¿Seguro que quieres borrar este estudiante? Esta acción no se puede deshacer.",
      cancel: "Cancelar",
      confirm: "Eliminar"
    }} />
  )
}

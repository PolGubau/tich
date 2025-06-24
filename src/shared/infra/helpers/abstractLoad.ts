import { Id } from "~/domain/common/id";
import { Status } from "~/shared/types/basics";

const defaultMessages = {
  loading: "Failed to load data",
  notFound: "Data not found"
};

export const abstractLoad = async<T>({ id, getter, setStatus, setError, messages = defaultMessages }:
  {
    id: Id,
    getter: (id: Id) => Promise<T>,
    setStatus: (status: Status) => void,
    setError: (error: string | null) => void,
    messages?: {
      loading: string,
      notFound: string
    }
  }): Promise<T | null> => {
  setStatus("loading");

  try {
    const data = await getter(id);
    if (!data) {
      setError(messages.notFound);
      setStatus("error");

      return null;
    }
    return data;

  } catch (e) {
    setError(messages.loading);
    setStatus("error");
    console.error(e);
    return null;
  }
}
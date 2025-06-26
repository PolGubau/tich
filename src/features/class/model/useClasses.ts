import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { findAllClassesQuery } from "../infra/find-all";
import { classEntitiesToDomainsMapper } from "../infra/mappers/entity-to-domain";

export const useClasses = () => {
  // const [classes, setClasses] = useState<Class[]>([]);
  // const [status, setStatus] = useState<Status>("idle");
  // const [error, setError] = useState<string | null>(null);



  const { data: classEntities } = useLiveQuery(findAllClassesQuery);
  const classes = classEntitiesToDomainsMapper(classEntities);

  // const fetchClasses = useCallback(async () => {
  //   setStatus("loading");
  //   setError(null);
  //   try {
  //     const fetchedClasses = await classRepository.findAll();
  //     if (fetchedClasses) {
  //       setClasses(fetchedClasses.map(createClass));
  //       setStatus("success");
  //     } else {
  //       setError("No classes found");
  //       setStatus("error");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching classes:", err);
  //     setError("Failed to fetch classes");
  //     setStatus("error");
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchClasses();
  // }, [fetchClasses]);



  const totalClasses = classes.length;

  const totalMinutes = classes.reduce((total, c) => {
    const duration = c.durationMinutes;
    return total + (duration ? duration : 0);
  }
    , 0)

  const totalHours = Math.floor(totalMinutes / 60);


  const moneyEarned: number = classes.reduce((total, c) => {
    const price = c.price;
    return total + (price ? price._value : 0);
  }, 0)

  const formattedEarnings: string = moneyEarned.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });


  return { classes, totalClasses, totalHours, moneyEarned, formattedEarnings };
}
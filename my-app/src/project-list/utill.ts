import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    const projectsParams = { ...param, personId: Number(param.personId) || undefined };
    return [useMemo(() => { return projectsParams }, [param]), setParam] as const
}
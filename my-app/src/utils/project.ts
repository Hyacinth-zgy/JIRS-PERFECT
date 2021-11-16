import { useEffect } from "react";
import { useHttp } from "utils/request";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils/helper";
import { Project } from "project-list/list";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result
}
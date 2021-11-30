import { useEffect } from "react";
import { useHttp } from "utils/request";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils/helper";
import { Project } from "project-list/list";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = () => client('projects', { data: cleanObject(param || {}) });
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'POST',
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
import { useEffect } from "react";
import { useHttp } from "utils/request";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils/helper";
import { User } from "project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result
}
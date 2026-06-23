import { trpc } from "~/trpc/client";

export function useSignup() {
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassWord,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    isPending,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation();

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassWord ,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    isPending,
    status,
  }
}

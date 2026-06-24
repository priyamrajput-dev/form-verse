import { trpc } from "~/trpc/client";

export function useSignup() {
  const utils = trpc.useUtils();
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
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassWord,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    isPending,
    status,
  };
}

export function useSignin() {
  const utils = trpc.useUtils();
  const {
    mutateAsync: signInUserWithEmailAndPasswordAsync,
    mutate: signInUserWithEmailAndPassWord,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    isPending,
    status,
  } = trpc.auth.signInUserWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    signInUserWithEmailAndPasswordAsync,
    signInUserWithEmailAndPassWord,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    isPending,
    status,
  };
}
export function useUser() {
  const {
    data: user,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  } = trpc.auth.getLoggedInUserInfo.useQuery();

  return {
    user,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
}

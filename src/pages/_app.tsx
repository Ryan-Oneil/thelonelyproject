import React from "react";
import "../index.css";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import { createStandaloneToast, ChakraProvider } from "@chakra-ui/react";
import { getApiError } from "@/apis/api";
import { AppProps } from "next/app";
import { AuthProvider } from "@/features/Auth/AuthProvider";

const errorHandling = (error: any) => {
  const { toast } = createStandaloneToast();
  const errorMessage = getApiError(error);

  if (!toast.isActive(errorMessage)) {
    toast({
      id: errorMessage,
      title: "An error occurred.",
      description: errorMessage,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
};

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    onError: errorHandling,
  },
  mutations: {
    onError: errorHandling,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;

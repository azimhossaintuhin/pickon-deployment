import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

// Define the error response interface
interface ErrorResponse {
    status: boolean;
    message: string;
    errorMessage: {path: string; message: string}[];
}

// Global error handler function
const handleErrorResponse = (error: any) => {
    if (error.data) return error.data;
    else return "Something went wrong";
};

// Base query function with error handling
const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | ErrorResponse,
    {},
    FetchBaseQueryMeta
> = async (args:any, api:any, extraOptions:any  ) => {
    const baseQuery = fetchBaseQuery({
        baseUrl:"../",
        credentials: "include",
    });

    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        const errorResponse = handleErrorResponse(result.error);
        return {error: errorResponse};
    }

    return result;
};

// Create the API using createApi
export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["users", "product", "category", "orders", "reviews"],
    endpoints: () => ({}),
});
// Export hooks for usage in functional components

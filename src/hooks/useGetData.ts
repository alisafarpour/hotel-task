import axios from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

const DB_NAME = "HotelCache"
const STORE_NAME = "cachedData"

const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME)
            }
        };

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

const getCachedData = async <T>(key: string): Promise<T | null> => {
    const db = await openDatabase();
    return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(key)

        request.onsuccess = () => resolve(request.result ?? null)
        request.onerror = () => resolve(null)
    })
}

const setCachedData = async (key: string, data: any): Promise<void> => {
    const db = await openDatabase()
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    store.put(data, key)
}

export const useGetData = <T>(endpoint: string, queryKey: string, ids?: string[]): UseQueryResult<T, Error> => {
    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    }
    type GetType = {
        error?: number;
        errorMessage?: string;
        value: T;
    }

    return useQuery(
        {
            queryKey: [queryKey, ...(ids || [])],
            queryFn: async () => {
                try {
                    const response = await axios.get<GetType>(`http://localhost:1337/${endpoint}`, config)
                    await setCachedData(queryKey, response.data)
                    return response.data
                } catch (error) {
                    console.warn("Offline mode: Fetching cached data", error)
                    return (await getCachedData<T>(queryKey)) ?? []
                }
            },
            // queryFn: (): Promise<GetType> => axios.get('http://localhost:1337/' + endpoint, config).then(res => res.data),
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: false,
        }
    )
}
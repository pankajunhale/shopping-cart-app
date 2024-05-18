export interface ILocalStorageManagerService {
    get(key: string): string | null;
    set(key: string, value: any): void;
    delete(key: string): void;
    getParsedData<T>(value: string): T;
    deleteAll(): void;
}
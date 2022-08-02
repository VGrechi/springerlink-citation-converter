export interface Adapter<T> {

    transform(data: T): string;

}
export interface ResponseObject<T> {
    data: T;
    status: Status;
}

export interface Status {
  timestamp: string;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice: string | null;
  total_count: number;
}
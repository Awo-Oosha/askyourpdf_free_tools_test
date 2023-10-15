export type MessageDescriptor = {
    id: string;
    comment?: string | undefined;
    message?: string | undefined;
    values?: Record<string, unknown> | undefined;
}
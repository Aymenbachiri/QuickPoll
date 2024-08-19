import { Database } from "./database.types";

export type Poll = Database['public']['Tables']['polls']['Row'];
export type Vote = Database['public']['Tables']['votes']['Row'];

export interface UserListConfig {
  filters: {
    email?: string;
    username?: string;
    active?: boolean;
    limit?: number;
    offset?: number;
  };
}

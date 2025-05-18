export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leases: {
        Row: {
          id: string
          name: string
          description: string | null
          asset_type: string
          lessor: string
          lease_type: string
          start_date: string
          end_date: string
          payment_amount: number
          payment_frequency: string
          interest_rate: number
          created_at: string
          updated_at: string | null
          created_by: string
          team_id: string | null
          status: string
          is_deleted: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          asset_type: string
          lessor: string
          lease_type: string
          start_date: string
          end_date: string
          payment_amount: number
          payment_frequency: string
          interest_rate: number
          created_at?: string
          updated_at?: string | null
          created_by: string
          team_id?: string | null
          status?: string
          is_deleted?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          asset_type?: string
          lessor?: string
          lease_type?: string
          start_date?: string
          end_date?: string
          payment_amount?: number
          payment_frequency?: string
          interest_rate?: number
          created_at?: string
          updated_at?: string | null
          created_by?: string
          team_id?: string | null
          status?: string
          is_deleted?: boolean
        }
      }
      lease_documents: {
        Row: {
          id: string
          lease_id: string
          name: string
          file_path: string
          file_type: string
          uploaded_at: string
          uploaded_by: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          lease_id: string
          name: string
          file_path: string
          file_type: string
          uploaded_at?: string
          uploaded_by: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          lease_id?: string
          name?: string
          file_path?: string
          file_type?: string
          uploaded_at?: string
          uploaded_by?: string
          is_primary?: boolean
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          owner_id: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          owner_id: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          owner_id?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          company: string | null
          job_title: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          company?: string | null
          job_title?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          company?: string | null
          job_title?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean
          current_period_start: string
          current_period_end: string
          created_at: string
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id: string
          user_id: string
          status: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean
          current_period_start: string
          current_period_end: string
          created_at?: string
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          trial_start?: string | null
          trial_end?: string | null
        }
      }
    }
  }
}
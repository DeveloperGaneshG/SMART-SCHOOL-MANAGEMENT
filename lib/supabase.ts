import { createClient } from "@supabase/supabase-js";

export type Student = {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  class: string;
  section: string;
  roll_number: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  address: string;
  attendance_percent: number;
  status: string;
  created_at: string;
};

export type Admission = {
  id: string;
  student_name: string;
  date_of_birth: string;
  gender: string;
  applying_for_class: string;
  previous_school: string;
  father_name: string;
  mother_name: string;
  contact_number: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
};

export type Attendance = {
  id: string;
  student_id: string;
  class: string;
  date: string;
  status: string;
  marked_by: string;
  created_at: string;
};

export type Marks = {
  id: string;
  student_id: string;
  subject: string;
  exam_type: string;
  max_marks: number;
  scored_marks: number;
  grade: string;
  remarks: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

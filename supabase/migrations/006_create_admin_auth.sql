-- Create admin_auth table
CREATE TABLE public.admin_auth (
    id integer PRIMARY KEY DEFAULT 1,
    password text NOT NULL
);

-- Insert default password (duraxx2024)
INSERT INTO public.admin_auth (id, password) VALUES (1, 'duraxx2024');

-- Enable RLS (only service role can access this)
ALTER TABLE public.admin_auth ENABLE ROW LEVEL SECURITY;

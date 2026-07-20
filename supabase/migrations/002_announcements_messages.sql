-- Create announcements table
CREATE TABLE public.announcements (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    image_url text,
    link_url text,
    button_text text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    start_date timestamptz,
    end_date timestamptz,
    created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Announcements policies
CREATE POLICY "Active announcements are viewable by everyone" ON public.announcements
    FOR SELECT USING (
        is_active = true AND 
        (start_date IS NULL OR start_date <= now()) AND 
        (end_date IS NULL OR end_date >= now())
    );

CREATE POLICY "Authenticated users can insert announcements" ON public.announcements
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update announcements" ON public.announcements
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete announcements" ON public.announcements
    FOR DELETE TO authenticated USING (true);

-- Messages policies
CREATE POLICY "Anyone can insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages" ON public.messages
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update messages" ON public.messages
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete messages" ON public.messages
    FOR DELETE TO authenticated USING (true);

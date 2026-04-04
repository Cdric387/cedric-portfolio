import { createClient } from '@supabase/supabase-js';

// On récupère les clés depuis le fichier .env.local de manière sécurisée
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Création et exportation du client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);




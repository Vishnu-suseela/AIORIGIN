import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://svcbarmsygjkxubidivg.supabase.co'
const supabaseAnonKey = 'sb_publishable_mf_Sm6Fr7u7Dn7f4mKwhSQ_h5PY9InY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

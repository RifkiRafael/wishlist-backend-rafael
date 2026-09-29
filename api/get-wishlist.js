import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({
                error: 'user_id wajib diisi'
            });
        }

        const { data, error } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', {
                ascending: false
            });

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        return res.status(200).json({
            message: 'Wishlist berhasil diambil',
            data
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
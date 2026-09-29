import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    try {
        const {
            user_id,
            product_id
        } = req.body;

        if (!user_id || !product_id) {
            return res.status(400).json({
                error: 'user_id dan product_id wajib diisi'
            });
        }

        const { data, error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', user_id)
            .eq('product_id', product_id)
            .select();

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({
                error: 'Produk tidak ditemukan di wishlist'
            });
        }

        return res.status(200).json({
            message: 'Produk berhasil dihapus dari wishlist',
            data
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
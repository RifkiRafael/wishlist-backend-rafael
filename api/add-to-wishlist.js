import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    try {
        const {
            user_id,
            product_id,
            product_name,
            product_price
        } = req.body;

        if (!user_id || !product_id) {
            return res.status(400).json({
                error: 'user_id dan product_id wajib diisi'
            });
        }

        // Cek apakah produk sudah ada
        const { data: existing, error: checkError } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', user_id)
            .eq('product_id', product_id)
            .maybeSingle();

        if (checkError) {
            return res.status(500).json({
                error: checkError.message
            });
        }

        if (existing) {
            return res.status(409).json({
                error: 'Produk sudah ada di wishlist'
            });
        }

        const { data, error } = await supabase
            .from('wishlist')
            .insert([
                {
                    user_id,
                    product_id,
                    product_name,
                    product_price
                }
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        return res.status(201).json({
            message: 'Produk berhasil ditambahkan ke wishlist',
            data
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
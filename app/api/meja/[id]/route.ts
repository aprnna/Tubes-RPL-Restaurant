import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:any) {
    const supabase = createClient();
    const { id } = params;

    const { data: meja, error: mejaError } = await supabase
        .from('meja')
        .select()
        .eq('no_meja', id)
        .single();

    if (mejaError || !meja) {
        return new NextResponse('Table not found', { status: 404 });
    }

    const { data: reservasi, error: reservasiError } = await supabase
        .from('reservasi2')
        .select()
        .eq('no_meja', meja.no_meja)
        .eq('status', 'ontable');

    if (reservasiError) {
        return new NextResponse('Error fetching reservations', { status: 500 });
    }

    const responseData = {
        meja,
        reservasi: reservasi.length > 0 ? reservasi : null
    };

    console.log(responseData);

    return getResponse(responseData, 'Data fetched successfully', 200);
}

export async function PUT(req: NextRequest, { params }: any) {
    const supabase = createClient();
    const { id } = params;

    const { data: meja, error: mejaError } = await supabase
        .from('meja')
        .select()
        .eq('no_meja', id)
        .single();

    if (mejaError || !meja) {
        return new NextResponse('Table not found', { status: 404 });
    }

    const { data: reservasi, error: reservasiError } = await supabase
        .from('reservasi2')
        .update({status: "done"})
        .eq('no_meja', meja.no_meja)
        .eq('status', 'ontable').select();

    if (reservasiError) {
        return new NextResponse('Error fetching reservations', { status: 500 });
    }

    const { error:err } = await supabase.from('meja').update({
        status: "Available"
      }).eq('no_meja', meja.no_meja).select()
    
      if (err) {
        console.error('Meja update failed', err)
    
        return getResponse(err, 'error update Meja', 500)
      }

    return getResponse({ meja, reservasi }, 'Table and reservations updated successfully', 200);
}
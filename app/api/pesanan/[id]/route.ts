import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest,{params}:any) {
    const supabase = createClient();
    const {id} = params
    const {data:order, error: orderError} = await supabase.from('pesanan').select().eq('id',id)
    const {data:items, error: itemsError} = await supabase.from('item_pesanan').select().eq('id_pesanan',id)
    const menuIds = items!.map(item => item.id_menu);
    const {data:menuDetails, error: menuError} = await supabase.from('menu').select().in('id',menuIds)

  
    if (orderError) return getResponse(orderError,"Failed get order",400)
    if (itemsError) return getResponse(itemsError,"Failed get items",400)
    if (menuError) return getResponse(menuError,`Failed get menu ${menuIds}`,400)

      
    return getResponse({order, items, menuDetails}, "Success Get pesanan",200)
  }

  export async function PUT(req: NextRequest, { params }: any) {
    const supabase = createClient();
    const { id } = params;
    
    const { atasNama, banyak_orang,no_meja, status, total_harga, id_users} = await req.json();

    const { data: updatedOrder, error: updateError } = await supabase
        .from('pesanan')
        .update({ atasNama, banyak_orang,no_meja, status, total_harga, id_users, updatedAt: new Date().toISOString() })
        .eq('id', id);

    if (updateError) return getResponse(updateError, "Failed to update order", 400);

    return getResponse(updatedOrder, "Successfully updated pesanan", 200);
}
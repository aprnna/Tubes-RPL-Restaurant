import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest,{params}:any) {
    const supabase = createClient();
    const {id} = params
    const {data:orderData, error: orderError} = await supabase.from('pesanan').select('id, id_user, createdAt, reservasi2 (atas_nama, banyak_orang)').eq('id',id)
    const {data:items, error: itemsError} = await supabase.from('item_pesanan').select().eq('id_pesanan',id)
    const menuIds = items!.map(item => item.id_menu);
    const {data:menuDetails, error: menuError} = await supabase.from('menu').select().in('id',menuIds)
    

    
    
    if (orderError) return getResponse(orderError,"Failed get order",400)
      
    const order =orderData.map((item:any) => ({
        id: item.id,
        id_user: item.id_user,
        createdAt: item.createdAt,
        atas_nama: item.reservasi2.atas_nama,
        banyak_orang: item.reservasi2.banyak_orang,
    }));
      
    
    if (itemsError) return getResponse(itemsError,"Failed get items",400)
    if (menuError) return getResponse(menuError,`Failed get menu ${menuIds}`,400)

      
    return getResponse({order, items, menuDetails}, "Success Get pesanan",200)
  }

  export async function PATCH(req: NextRequest, { params }: any) {
    const supabase = createClient();
    const { id } = params;
    
    const { status} = await req.json();

    const { data: updatedOrder, error: updateError } = await supabase
        .from('pesanan')
        .update({ status, updateAt: new Date().toISOString() })
        .eq('id', id);

    console.log(updatedOrder, updateError);

    if (updateError) return getResponse(updateError, "Failed to update order", 400);

    return getResponse(updatedOrder, "Successfully updated pesanan", 200);
}
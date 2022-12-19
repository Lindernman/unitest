import { query } from "$lib/server/db"


export async function load(){
    let datosbd = await query(`
    SELECT b.*, u.name ||' '|| u.surname as fullname
    FROM blog as b 
    JOIN users as u ON u.user_id = b.user_id
    `)
    // console.log(datosbd);
    return {blog:datosbd.rows}
}
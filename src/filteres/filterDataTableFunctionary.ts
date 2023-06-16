import CryptoJS from "crypto-js"

export function filterDataTableFunctionary(data:any) {
    return data.map((item:any) => {
        const encryptedPassword = item.password; 
        const encryptionKey = process.env.NEXT_PUBLIC_ENCRIPTO_KEY; 
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, `${encryptionKey}`);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        return {
            name: item.name,
            email: item.email,
            password: decryptedPassword,
            npv: item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => { 
                return aculamador + acount.quantity_sold;
            },0) : 0,
            nap: item.addition.length > 0 ? item.addition.reduce((aculamador:any,acount:any) => { 
                return aculamador + acount.quantity_added;
            },0) : 0
        }
    })
}
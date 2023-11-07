import router from "next/router";

export async function routerData(text:any,items:any,path:any){
    localStorage.setItem("toolsDataTemp",JSON.stringify({texts:text,items:items}));
    router.push(path);
};
export async function getRouterData(){
    const holdata= localStorage.getItem("toolsDataTemp");
    localStorage.removeItem("toolsDataTemp");
    return  holdata!=null?JSON.parse(holdata || ''):null;
};
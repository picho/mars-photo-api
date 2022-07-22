export function getFlatParams(params: any): string {
    
    let flatedParams = "";

    for(let param in params) 
        flatedParams += `?${param}=${params[param]}&`;
    
    return flatedParams;
}
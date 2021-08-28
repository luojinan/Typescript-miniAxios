export function transformResponse(data:any):any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // do somthing
    }
  }
  return data;
}
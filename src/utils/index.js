
export * from './constants';

export const setItemOnlocalStorage=(key,value)=>{
  if(!key||!value){
   return console.error('Can not store any localStorage');
  }
    const valueToStore=typeof value !=='string'?JSON.stringify(value):value;
    localStorage.setItem(key,valueToStore);
}

export const getItemOnlocalStorage=(key)=>{
  if(!key){
   return  console.error('Can not get any value from localStorage');
  }
  return  localStorage.getItem(key);
}

export const removeItemOnlocalStorage=(key)=>{
  if(!key){
   return console.error('Can not remove any value from localStorage');
  }
  localStorage.removeItem(key);
}


export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };
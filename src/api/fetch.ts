


const accessToken='';

const baseFetch = async (url: RequestInfo, init?: RequestInit) => {    
    const res = await fetch(`https://ondaum.revimal.me/api/v1${url}`, {
        ...init, 
        headers: {
            Authorization: accessToken ?? `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();    
    return { response: json };
  };
  


const http = {
    get: async <T = any>(url: string) => {
      return baseFetch(url, {
        method: 'GET',
      }) as Promise<{ response: T }>;
    },
    post: async <T = any>(url: string, body?: any) => {
      return baseFetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
      }) as Promise<{ response: T }>;
    },
    put: async <T = any>(url: string, body?: any) => {
      return baseFetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
      }) as Promise<{ response: T }>;
    },
    delete: async <T = any>(url: string) => {
      return baseFetch(url, {
        method: 'DELETE',
      }) as Promise<{ response: T }>;
    },
  };
  
  export {http};
const status = (response) => {
    if (response.status >= 200 && response.status < 300) {  
        return Promise.resolve(response)  
    } else {  
        return Promise.reject(new Error(response.statusText))  
    }  
}

const json = (response) => response.json()

const code = (data) => (
    data.code ? Promise.reject(data.msg) : Promise.resolve(data.data)
)

const post = (url, data) => (
    fetch(url, {
        method: 'post', 
        headers: {"Content-type": "application/json; charset=UTF-8"}, 
        body: JSON.stringify(data)
    }).then(status).then(json).catch((e)=>alert('fetch error')).then(code)
)

export const getData = () => post('./cgi-bin/getData', {})
export const addRule = (data) => post('./cgi-bin/addRule', data)
export const updateRule = (data) => post('./cgi-bin/updateRule', data)
export const deleteRule = (data) => post('./cgi-bin/deleteRule', data)
export const addTarget = (data) => post('./cgi-bin/addTarget', data)
export const updateTarget = (data) => post('./cgi-bin/updateTarget', data)
export const deleteTarget = (data) => post('./cgi-bin/deleteTarget', data)
export const relate = (data) => post('./cgi-bin/relate', data)

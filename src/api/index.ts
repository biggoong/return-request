export const fetchRequests = async () => {
    const response = await fetch(`/returnRequests`);
    const data = await response.json();
    return data;
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export const postRequest = async (data: any) => {
    const res = await postData('/returnRequest', data)
    return res;
};

const isFunction = (fn) => ({}).toString.call(fn) === "[object Function]";
const isPlainObject = obj => ({}).toString.call(obj) === '[object Object]';
function handleErrors(response) {
    if (!response.ok) {
        if (response.status == 400) {
            return response.json().then(data => {
                console.error(data.data.errors);
                throw new Error(JSON.stringify(data.data.errors));
            });
        } else if (response.status === 401) {
            location.href = "/";
            sessionStorage.clear();
        }
        else throw new Error(JSON.stringify(response.statusText));
    }
    return response;
}

const requestor = defaults => (requestURL, options = {}) => {
    if (isPlainObject(options) === false) options = {};
    const onError = options.onError; delete options.onError;
    let contentType = "application/json;";
    // merging defaults and other passed options, and deep merging body and headers.
    options = Object.assign({}, defaults, options, { headers: { ...defaults.headers, ...options.headers } }, defaults.method == 'GET' ? null : { body: JSON.stringify({ ...defaults.body, ...options.body }) });

    return fetch(requestURL, options)
        .then(response => {
            handleErrors(response);
            if (response && response.headers && isFunction(response.headers.get))
                contentType = response.headers.get("Content-Type");
            if (contentType.includes("application/json;"))
                return response.json();
            return response.blob();
        })
        .catch(error => {
            console.error(JSON.stringify(error));
            isFunction(onError) && onError(error);
            return { error, status: "unsuccess" };
        });
}

// Defaulting the headers ...
const NREST_POST = requestor({
    method: "POST",
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
    },
    body: {}
});

const NREST_GET = requestor({
    method: "GET",
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
    },
});


export default options => {
    var baseurl = options ? (options.baseurl || "") : "",
        fetchCreate = null,
        fetchRead = null,
        fetchUpdate = null,
        fetchDelete = null,

        // eslint-disable-next-line
        fetchCreate = fetchUpdate = fetchDelete = NREST_POST;
    fetchRead = NREST_GET;
    return {
        collection(collName) {
            return {
                create(data) {
                    return fetchCreate(`${baseurl}/${collName}`, data);
                },
                read(data) {
                    return fetchRead(`${baseurl}/${collName}`, data);
                },
                readone(id) {
                    return fetchRead(`${baseurl}/${collName}/${id}`);
                },
                update(data) {
                    return fetchUpdate(`${baseurl}/${collName}`, data);
                },
                delete(data) {
                    return fetchDelete(`${baseurl}/${collName}`, data);
                }
            };
        }
    };
};
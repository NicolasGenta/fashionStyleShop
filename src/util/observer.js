export const createObserver = (callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            callback(entry)
        });
    });
    return observer;
}
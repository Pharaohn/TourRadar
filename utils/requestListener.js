export function requestListenerDecorator(page, filter, value) {
    let count = {value:0};
    page.on('request', async (request) => {
        console.log(request.url());
        if (request.url().includes(filter)) {
            await expect(request.url()).toBe(value);
            count.value++;
        }

    });
    return count;
}
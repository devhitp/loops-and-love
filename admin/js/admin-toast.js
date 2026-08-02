export function showToast(message) {

    const toast =
        document.querySelector("#toast");

    const toastMessage =
        document.querySelector("#toast-message");

    if (!toast || !toastMessage)
        return;

    toastMessage.textContent = message;

    toast.classList.add("active");

    setTimeout(() => {

        toast.classList.remove("active");

    }, 2500);

}
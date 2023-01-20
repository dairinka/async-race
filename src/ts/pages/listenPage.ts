function listenPage() {
  const allWrapper = document.querySelector("all-wrapper");
  allWrapper?.addEventListener("click", (event: Event) => {
    const target = event.target;
    console.log("target", target);
  });
}
export default listenPage;
